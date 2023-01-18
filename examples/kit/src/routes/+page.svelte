<script lang="ts">
  import Reload from './Reload.svelte'
  import Request from './Request.svelte'
  import RequestWithError from './RequestWithError.svelte'
</script>

<main>
  <Request />
  <RequestWithError />
  <Reload />
  <p>
    Get all <a href="/sold">sold</a> or <a href="/pending">pending</a> pets using
    `load` function
  </p>
</main>

<style>
  main {
    max-width: 40rem;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
</style>
