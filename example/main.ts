import { Fetcher } from '../src'
import fetch from 'cross-fetch'
import { paths } from '../api'

// declare fetcher for paths
const fetcher = Fetcher.for<paths>()

// global configuration
fetcher.configure({
  baseUrl: 'https://petstore.swagger.io/v2',
})

type Kek = {
  foo: string
  email: number
}

function foo(a: string, b: number): Kek {
  return { foo: 'test', email: 2 }
}

// create fetch operations
const findPetsByStatus = fetcher
  .path('/pet/findByStatus')
  .method('get')
  .create()
const addPet = fetcher.path('/pet').method('post').create()

// `fetch` may be the argument to `load()`
// https://kit.svelte.dev/docs/load#making-fetch-requests
// const { status, data: pets } = await findPetsByStatus(fetch, {
//   status: ['available', 'pending'],
// })

async function main(): Promise<void> {
  // @ts-ignore
  const resp = await findPetsByStatus(fetch, { status: 'pending' })
  console.log(resp.status)
}

main().then(() => {
})