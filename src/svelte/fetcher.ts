import { derived, writable } from 'svelte/store'

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
import type { ApiRequest, SvelteCreateFetch } from './types'
import { ApiError } from '../types'

function fetchUrl<R>(request: Request) {
  const { url, init } = getFetchParams(request)

  const initValue = undefined
  const data = writable<R | undefined>(initValue)
  const status = writable({ ok: false, errors: [] })
  const ready = writable(new Promise<void>(() => {}))

  async function reload() {
    ready.set(new Promise<void>(() => {}))
    const resp = await fetch(url, init)
    if (resp.ok) {
      const j = await resp.json()
      data.set(j as R)
      status.set({ ok: true, errors: [] })
      ready.set(Promise.resolve())
    } else {
      status.set({ ok: false, errors: [] })
      ready.set(Promise.reject())
    }
  }
  reload()

  return {
    data,
    status,
    ready,
    reload,
  } as ApiRequest<R>
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
