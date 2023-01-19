<script lang="ts">
  import { findPetsByStatus } from '$lib/api'
  import { derived } from 'svelte/store'

  let request = findPetsByStatus(fetch, { status: 'available' })
  let loading = request.ready

  // since the array can be huge, let's keep only 5 pets
  $: pets = derived(request.resp, (v) => (v ? v.data : []).slice(0, 5))

  function onClick() {
    request.reload()
  }
</script>

<section>
  <h3>Demo: reload a request</h3>
  <div>Pets:</div>
  {#await $loading}
    <div>Fetching..</div>
  {:then resp}
    <div>
      this pet is taken from `:then resp` = {(resp?.data || [])[0].name}
    </div>
    <ul>
      {#each $pets as pet}
        <li>{pet.name}</li>
      {/each}
    </ul>
  {:catch}
    <div>error</div>
  {/await}
  <button on:click={onClick}>Fetch them again</button>
</section>

<style>
  section {
    border: 1px solid black;
    padding: 2rem;
  }
</style>
