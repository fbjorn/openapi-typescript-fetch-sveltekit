// TODO: import from `/src/svelte` or smth
import { SvelteFetcher } from 'openapi-typescript-fetch-sveltekit'

import type { paths } from '../../../../api'
// declare fetcher for paths
const fetcher = SvelteFetcher.for<paths>()

// global configuration
fetcher.configure({
  baseUrl: 'https://petstore.swagger.io/v2',
})

// create fetch operations
export const findPetsByStatus = fetcher
  .path('/pet/findByStatus')
  .method('get')
  .create()

const localFetcher = SvelteFetcher.for<paths>()
localFetcher.configure({
  baseUrl: '/api',
})

export const findPetsByStatusThatFails = localFetcher
  .path('/pet/findByStatus')
  .method('get')
  .create()
