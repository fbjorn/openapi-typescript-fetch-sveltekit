[![version(scoped)](https://img.shields.io/npm/v/openapi-typescript-fetch.svg)](https://www.npmjs.com/package/openapi-typescript-fetch)
[![codecov](https://codecov.io/gh/ajaishankar/openapi-typescript-fetch/branch/main/graph/badge.svg?token=Z8GQ6M5KAR)](https://codecov.io/gh/ajaishankar/openapi-typescript-fetch)

# 📘️ openapi-typescript-fetch-sveltekit

A typed fetch client for [openapi-typescript](https://github.com/drwpow/openapi-typescript) compatible with SvelteKit's custom `fetch`

### Install

```bash
npm install https://github.com/lietu/openapi-typescript-fetch-sveltekit.git
```

Or

```bash
pnpm add https://github.com/lietu/openapi-typescript-fetch-sveltekit.git
```

**Features**

Supports JSON request and responses

- ✅ [OpenAPI 3.0](https://swagger.io/specification)
- ✅ [Swagger 2.0](https://swagger.io/specification/v2/)

### Usage

**Generate typescript definition from schema**

```bash
npx openapi-typescript https://petstore.swagger.io/v2/swagger.json --output petstore.ts

# 🔭 Loading spec from https://petstore.swagger.io/v2/swagger.json…
# 🚀 https://petstore.swagger.io/v2/swagger.json -> petstore.ts [650ms]
```

**Typed fetch client**

```ts
import { Fetcher } from 'openapi-typescript-fetch'

import { paths } from './petstore'

// declare fetcher for paths
const fetcher = Fetcher.for<paths>()

// global configuration
fetcher.configure({
  baseUrl: 'https://petstore.swagger.io/v2',
  init: {
    headers: {
      ...
    },
  },
  use: [...] // middlewares
})

// create fetch operations
const findPetsByStatus = fetcher.path('/pet/findByStatus').method('get').create()
const addPet = fetcher.path('/pet').method('post').create()

// `fetch` may be the argument to `load()`
// https://kit.svelte.dev/docs/load#making-fetch-requests
const { status, data: pets } = await findPetsByStatus(fetch, {
  status: ['available', 'pending'],
})

console.log(pets[0])
```

### Typed Error Handling

A non-ok fetch response throws a generic `ApiError`

But an Openapi document can declare a different response type for each status code, or a default error response type

These can be accessed via a `discriminated union` on status, as in code snippet below

```ts
const findPetsByStatus = fetcher.path('/pet/findByStatus').method('get').create()
const addPet = fetcher.path('/pet').method('post').create()

try {
  await findPetsByStatus(fetch, { ... })
  await addPet(fetch, { ... })
} catch(e) {
  // check which operation threw the exception
  if (e instanceof addPet.Error) {
    // get discriminated union { status, data }
    const error = e.getActualType()
    if (error.status === 400) {
      error.data.validationErrors // only available for a 400 response
    } else if (error.status === 500) {
      error.data.errorMessage // only available for a 500 response
    } else {
      ...
    }
  }
}
```

### Utility Types

- `OpArgType` - Infer argument type of an operation
- `OpReturnType` - Infer return type of an operation
- `OpErrorType` - Infer error type of an operation
- `FetchArgType` - Argument type of a typed fetch operation
- `FetchReturnType` - Return type of a typed fetch operation
- `FetchErrorType` - Error type of a typed fetch operation
- `TypedFetch` - Fetch operation type

```ts
import { paths, operations } from './petstore'

type Arg = OpArgType<operations['findPetsByStatus']>
type Ret = OpReturnType<operations['findPetsByStatus']>
type Err = OpErrorType<operations['findPetsByStatus']>

type Arg = OpArgType<paths['/pet/findByStatus']['get']>
type Ret = OpReturnType<paths['/pet/findByStatus']['get']>
type Err = OpErrorType<paths['/pet/findByStatus']['get']>

type FindPetsByStatus = TypedFetch<operations['findPetsByStatus']>

const findPetsByStatus = fetcher
  .path('/pet/findByStatus')
  .method('get')
  .create()

type Arg = FetchArgType<typeof findPetsByStatus>
type Ret = FetchReturnType<typeof findPetsByStatus>
type Err = FetchErrorType<typeof findPetsByStatus>
```

### Utility Methods

- `arrayRequestBody` - Helper to merge params when request body is an array [see issue](https://github.com/ajaishankar/openapi-typescript-fetch/issues/3#issuecomment-952963986)

```ts
const body = arrayRequestBody([{ item: 1 }], { param: 2 })

// body type is { item: number }[] & { param: number }
```

Happy fetching! 👍
