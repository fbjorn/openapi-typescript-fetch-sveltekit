import { SvelteFetcher } from 'openapi-typescript-fetch-sveltekit/src/svelte'
import { Fetcher } from 'openapi-typescript-fetch-sveltekit'

import type { paths } from '../../../api'

// declare fetcher for paths
const fetcher = SvelteFetcher.for<paths>()

const baseFetcher = SvelteFetcher.for<paths>()

// global configuration
fetcher.configure({
  baseUrl: 'https://petstore.swagger.io/v2',
})

// create fetch operations
export const findPetsByStatus = fetcher
  .path('/pet/findByStatus')
  .method('get')
  .create()

export const findPetsByStatusOriginal = baseFetcher
  .path('/pet/findByStatus')
  .method('get')
  .create()

const r = findPetsByStatus(fetch, { status: 'pending' })

export const addPet = fetcher.path('/pet').method('post').create()
