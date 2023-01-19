<script lang="ts">
  import { findPetsByStatus } from '$lib/api'

  let loading: any | undefined = undefined
  let names: string[] = []

  function onClick() {
    const { ready, resp } = findPetsByStatus(fetch, { status: 'available' })

    loading = ready
    resp.subscribe((r) => {
      const pets = r?.data || []
      if (r && pets) {
        names = pets?.map((p) => p.name).slice(0, 5)
      }
    })
  }
</script>

<section>
  <h3>Demo: successfull runtime request</h3>
  <div>Pets:</div>
  <button on:click={onClick}>Fetch pets</button>
  {#if $loading}
    {#await $loading}
      <div>Fetching..</div>
    {:then awaitedData}
      <ul>
        {#each names as name}
          <li>{name}</li>
        {/each}
      </ul>
    {/await}
  {/if}
</section>

<style>
  section {
    border: 1px solid black;
    padding: 2rem;
  }
</style>
