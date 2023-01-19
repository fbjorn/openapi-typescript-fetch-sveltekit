import type { Readable, Writable } from 'svelte/store'
import type {
  OpArgType,
  OpErrorType,
  // OpReturnType,
  OpResponseTypes,
  RealFetch,
} from '../types'
import type { ApiError } from '../types'

export type SuccessfulResp<R> = {
  ok: true
  data: R
  status: number
}

type BaseErrResp<E> = {
  ok: false
  data: E
}

export type FailedResp = {
  ok: false
  data: undefined
  status: number
}

export type Codes = {
  422: any
  403: any
}

export type ApiResponse<R, E extends Codes> =
  | SuccessfulResp<R>
  | (BaseErrResp<E[422]> & { status: 422 })
  | (BaseErrResp<E[403]> & { status: 403 })
  | FailedResp

export type ApiRequest<R, E extends Codes> = {
  readonly resp: Writable<ApiResponse<R, E> | undefined>
  readonly isLoaded: Promise<ApiResponse<R, E>>
  readonly ready: Writable<undefined | Promise<ApiResponse<R, E>>>
  readonly reload: () => Promise<ApiResponse<R, E>>
}

type _SvOpReturnType<T> = 200 extends keyof T
  ? T[200]
  : 201 extends keyof T
  ? T[201]
  : 'default' extends keyof T
  ? T['default']
  : unknown

type E403<T> = 403 extends keyof T ? T[403] : unknown
type E422<T> = 422 extends keyof T ? T[422] : unknown

// RS =  responses
type RS<OP> = OpResponseTypes<OP>

export type SvOpReturnType<OP> = _SvOpReturnType<OpResponseTypes<OP>>

export type _SvelteTypedWrappedFetch<OP> = (
  realFetch: RealFetch,
  arg: OpArgType<OP>,
  init?: RequestInit,
) => ApiRequest<
  SvOpReturnType<OP>,
  {
    422: E422<RS<OP>>
    403: E403<RS<OP>>
  }
>

export type SvelteTypedWrappedFetch<OP> = _SvelteTypedWrappedFetch<OP> & {
  _name: string
  Error: new (error: ApiError) => ApiError & {
    getActualType: () => OpErrorType<OP>
  }
}

type _SvelteCreateFetch<OP, Q = never> = [Q] extends [never]
  ? () => SvelteTypedWrappedFetch<OP>
  : (query: Q) => SvelteTypedWrappedFetch<OP>

export type SvelteCreateFetch<M, OP> = M extends
  | 'post'
  | 'put'
  | 'patch'
  | 'delete'
  ? OP extends { parameters: { query: infer Q } }
    ? _SvelteCreateFetch<OP, { [K in keyof Q]: true | 1 }>
    : _SvelteCreateFetch<OP>
  : _SvelteCreateFetch<OP>
