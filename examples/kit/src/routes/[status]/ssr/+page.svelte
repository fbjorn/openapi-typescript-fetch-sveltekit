<script lang="ts">
  import type { PageData } from './$types'

  export let data: PageData
  const { pets, status } = data
</script>

<section>
  <div>{status} pets:</div>
  {#each pets as pet}
    <div>{pet.id}: {pet.name} / {pet.category}</div>
  {/each}
</section>

<style>
  section {
    border: 1px solid black;
    padding: 2rem;
  }
</style>
