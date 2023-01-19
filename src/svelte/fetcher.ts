import { writable } from 'svelte/store'
import type { Unsubscriber } from 'svelte/store'

import { getFetchParams, mergeRequestInit } from '../fetcher'
import type {
  Request,
  TypedWrappedFetch,
  _TypedWrappedFetch,
  RealFetch,
  OpArgType,
  FetchConfig,
  OpErrorType,
  OpenapiPaths,
  Method,
} from '../types'
import type { ApiRequest, ApiResponse, Codes, SvelteCreateFetch } from './types'
import { ApiError } from '../types'

function fetchUrl<R, E extends Codes>(request: Request) {
  const { url, init } = getFetchParams(request)

  const resp = writable<ApiResponse<R, E> | undefined>()
  const ready = writable<Promise<ApiResponse<R, E>>>(new Promise(() => {
  }))
  let unsubscribe: Unsubscriber | undefined = undefined

  const apiCall: () => Promise<ApiResponse<R, E>> = () => {
    const promise = new Promise<ApiResponse<R, E>>(async (resolve) => {
      const fetchRes = await request.realFetch(url, init)
      const j = await fetchRes.json()

      unsubscribe = resp.subscribe((r) => {
        if (typeof r === 'undefined' || typeof r.data === 'undefined') {
          return
        }
        resolve(r)
      })

      switch (fetchRes.status) {
        case 200:
          resp.set({
            status: 200,
            data: j as R,
            ok: true,
          })
          break
        case 422:
          resp.set({
            status: 422,
            data: j as E[422],
            ok: false,
          })
          break
        default:
          resp.set({
            status: fetchRes.status,
            data: undefined,
            ok: false,
          })
      }
    })
    ready.set(promise)
    return promise
  }

  const isLoaded = apiCall()

  async function reload() {
    if (unsubscribe) {
      unsubscribe()
    }
    return apiCall()
  }

  return {
    resp,
    ready,
    reload,
    isLoaded,
  } as ApiRequest<R, E>
}

function createFetch<OP>(fetch: _TypedWrappedFetch<OP>): TypedWrappedFetch<OP> {
  const fun = (
    realFetch: RealFetch,
    payload: OpArgType<OP>,
    init?: RequestInit,
  ) => {
    try {
      return fetch(realFetch, payload, init)
    } catch (err) {
      if (err instanceof ApiError) {
        throw new fun.Error(err)
      }
      throw err
    }
  }

  fun.Error = class extends ApiError {
    constructor(error: ApiError) {
      super(error)
      Object.setPrototypeOf(this, new.target.prototype)
    }

    getActualType() {
      return {
        status: this.status,
        data: this.data,
      } as OpErrorType<OP>
    }
  }

  fun._name = ''

  return fun
}

function fetcher<Paths>() {
  let baseUrl = ''
  let defaultInit: RequestInit = {}

  return {
    configure: (config: FetchConfig) => {
      baseUrl = config.baseUrl || ''
      defaultInit = config.init || {}
    },
    path: <P extends keyof Paths>(path: P) => ({
      method: <M extends keyof Paths[P]>(method: M) => ({
        create: function(queryParams?: Record<string, true | 1>) {
          const fn = createFetch((realFetch, payload, init) =>
            // @ts-ignore
            fetchUrl({
              baseUrl: baseUrl || '',
              path: path as string,
              method: method as Method,
              queryParams: Object.keys(queryParams || {}),
              payload,
              init: mergeRequestInit(defaultInit, init),
              realFetch: realFetch,
            }),
          )

          fn._name = `${String(method).toUpperCase()} ${String(path)}`

          return fn
        } as unknown as SvelteCreateFetch<M, Paths[P][M]>,
      }),
    }),
  }
}

export const SvelteFetcher = {
  for: <Paths extends OpenapiPaths<Paths>>() => fetcher<Paths>(),
}
