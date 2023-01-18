import type { Readable, Writable } from 'svelte/store'
import type {
  OpArgType,
  OpErrorType,
  OpReturnType,
  RealFetch,
} from '../types'
import type { ApiError } from '../types'

export type ApiRequest<R = any> = {
  readonly data: Writable<R | undefined>
  readonly status: Writable<{ ok: boolean; errors: unknown[] }>
  readonly ready: Writable<Promise<void>>
  readonly reload: () => Promise<void>
}

export type _SvelteTypedWrappedFetch<OP> = (
  realFetch: RealFetch,
  arg: OpArgType<OP>,
  init?: RequestInit,
) => ApiRequest<OpReturnType<OP>>

export type SvelteTypedWrappedFetch<OP> = _SvelteTypedWrappedFetch<OP> & {
  _name: string
  Error: new (error: ApiError) => ApiError & {
    getActualType: () => OpErrorType<OP>
  }
}

type _SvelteCreateFetch<OP, Q = never> = [Q] extends [never]
  ? () => SvelteTypedWrappedFetch<OP>
  : (query: Q) => SvelteTypedWrappedFetch<OP>

export type SvelteCreateFetch<M, OP> = M extends 'post' | 'put' | 'patch' | 'delete'
  ? OP extends { parameters: { query: infer Q } }
    ? _SvelteCreateFetch<OP, { [K in keyof Q]: true | 1 }>
    : _SvelteCreateFetch<OP>
  : _SvelteCreateFetch<OP>
