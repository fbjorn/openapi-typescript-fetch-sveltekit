<script lang="ts">
  import { findPetsByStatusThatFails } from '$lib/api'

  let error = 'Oops'
  let loading: any = undefined

  function onClick() {
    // Gotcha: types are detected here
    const { ready, resp } = findPetsByStatusThatFails(fetch, {
      status: 'available',
    })
    loading = ready

    resp.subscribe((r) => {
      if (!r?.ok) {
        error = 'Something went wrong..'
      }
    })
  }
</script>

<section>
  <h3>Demo: successfull runtime request</h3>
  <button on:click={onClick}>Fetch me</button>
  {#if loading}
    {#await loading}
      <div>Fetching..</div>
    {:then _}
      {#if error}
        <div>{error}</div>
      {/if}
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
