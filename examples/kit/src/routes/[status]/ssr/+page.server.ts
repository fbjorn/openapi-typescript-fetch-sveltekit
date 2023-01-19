import { findPetsByStatus } from '$lib/api'
import { get } from 'svelte/store'
import type { PageLoad } from './$types'

export const load = (async ({ params, fetch }) => {
  if (params.status !== 'pending' && params.status !== 'sold') {
    return {
      pets: [],
      status: params.status,
    }
  }
  console.log("I'm running on server", fetch)
  const request = findPetsByStatus(fetch, { status: params.status })
  const resp = await request.isLoaded
  if (resp.ok && resp.data !== undefined) {
    return { pets: resp.data, status: params.status }
  }

  return {
    pets: [],
    status: params.status,
  }
}) satisfies PageLoad
