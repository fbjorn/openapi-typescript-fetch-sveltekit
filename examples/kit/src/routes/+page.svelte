<script lang="ts">
  import Reload from './Reload.svelte'
  import Request from './Request.svelte'
  import RequestAlternative from './RequestAlternative.svelte'
  import RequestWithError from './RequestWithError.svelte'
</script>

<main>
  <Request />
  <RequestAlternative />
  <RequestWithError />
  <Reload />
  <p>
    Get all <a href="/sold" target="_blank">sold</a> or
    <a href="/pending" target="_blank">pending</a> pets using `load` function
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
