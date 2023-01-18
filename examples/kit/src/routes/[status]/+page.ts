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
  const request = findPetsByStatus(fetch, { status: params.status })
  await request.ready
  console.log('ok', get(request.status).ok)
  if (get(request.status).ok) {
    const resp = get(request.data)
    console.log('resp', resp)
    if (resp) {
      return { pets: resp, status: params.status }
    }
  }
  return {
    pets: [],
    status: params.status,
  }
}) satisfies PageLoad
