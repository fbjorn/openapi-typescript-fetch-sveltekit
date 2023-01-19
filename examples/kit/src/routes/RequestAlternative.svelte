<script lang="ts">
  import { findPetsByStatus } from '$lib/api'

  let isLoading = false
  let names: string[] = []

  function onClick() {
    isLoading = true
    const request = findPetsByStatus(fetch, { status: 'available' })

    request.resp.subscribe((r) => {
      const newPets = r?.data || []
      names = newPets.map((p) => p.name).slice(0, 5)
      isLoading = !r?.ok // if we write isLoading = true compiler will instantly set it (wtf?)
    })
  }
</script>

<section>
  <h3>Demo: successfull runtime request (alternative code)</h3>
  <div>Pets:</div>
  <button on:click={onClick}>Fetch pets</button>
  {#if isLoading}
    <div>Fetching..</div>
  {:else}
    <ul>
      {#each names as name}
        <li>{name}</li>
      {/each}
    </ul>
  {/if}
</section>

<style>
  section {
    border: 1px solid black;
    padding: 2rem;
  }
</style>
