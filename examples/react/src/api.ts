import { Fetcher } from 'openapi-typescript-fetch-sveltekit'
import { paths } from '../../../api'

// declare fetcher for paths
const fetcher = Fetcher.for<paths>()

// global configuration
fetcher.configure({
  baseUrl: 'https://petstore.swagger.io/v2',
})

// create fetch operations
export const findPetsByStatus = fetcher
  .path('/pet/findByStatus')
  .method('get')
  .create()
export const addPet = fetcher.path('/pet').method('post').create()
