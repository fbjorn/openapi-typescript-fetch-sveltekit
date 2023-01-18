<script lang="ts">
  import { findPetsByStatus } from '$lib/api'

  let loading = undefined
  let names: string[] = []

  function onClick() {
    // Gotcha: types are detected here
    const { ready, data } = findPetsByStatus(fetch, { status: 'available' })

    loading = ready
    data.subscribe((pets) => {
      if (pets) {
        // Gotcha: types are detected here. check `p`
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
    {:then _}
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
