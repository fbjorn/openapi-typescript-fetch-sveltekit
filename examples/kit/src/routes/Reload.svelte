<script lang="ts">
  import { findPetsByStatus } from '$lib/api'
  import { derived } from 'svelte/store'

  let request = findPetsByStatus(fetch, { status: 'available' })
  let ready = request.ready

  // since the array can be huge, let's keep only 5 pets
  $: pets = derived(request.data, (v) => (v || []).slice(0, 5))

  function onClick() {
    request.reload()
  }
</script>

<section>
  <h3>Demo: reload a request</h3>
  <div>Pets:</div>
  {#await $ready}
    <div>Fetching..</div>
  {:then _}
    <ul>
      {#each $pets as pet}
        <li>{pet.name}</li>
      {/each}
    </ul>
  {/await}
  <button on:click={onClick}>Fetch them again</button>
</section>

<style>
  section {
    border: 1px solid black;
    padding: 2rem;
  }
</style>
