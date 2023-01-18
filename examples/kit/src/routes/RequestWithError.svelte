<script lang="ts">
  import { findPetsByStatusThatFails } from '$lib/api'
  import { get } from 'svelte/store'

  let loading = undefined
  let error = 'Oops'

  function onClick() {
    // Gotcha: types are detected here
    const { ready, data, status } = findPetsByStatusThatFails(fetch, {
      status: 'available',
    })

    loading = ready
    ready.subscribe((_) => {
      if (!get(status).ok) {
        error = 'Something went wrong..'
      }
    })
  }
</script>

<section>
  <h3>Demo: successfull runtime request</h3>
  <button on:click={onClick}>Fetch me</button>
  {#if $loading}
    {#await $loading}
      <div>Fetching..</div>
    {:then _}
      <div>You should not see this message. You will see the error below:</div>
    {:catch}
      <div>{error}</div>
    {/await}
  {/if}
</section>

<style>
  section {
    border: 1px solid black;
    max-width: 40rem;
    margin: 0 auto;
  }
</style>
