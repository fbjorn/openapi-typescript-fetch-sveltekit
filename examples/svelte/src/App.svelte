<script lang="ts">
    import {addPet, findPetsByStatus} from './api'

    const {ready, data: pets} = findPetsByStatus(fetch, {status: 'pending'})
    const r = findPetsByStatus(fetch, {status: '123'})

    let soldReady = undefined
    let soldPets = []

    function listSoldPets() {
        const req2 = findPetsByStatus(fetch, {status: 'sold'})
        soldReady = req2.ready
        req2.data.subscribe(v => soldPets = v)
    }
</script>

<main>
    {#await $ready}
        <div>Awaiting</div>
    {:then _}
        <div>Pets:</div>
        {#each $pets as pet}
            <div>pet: {pet.name}</div>
        {/each}
    {/await}

    <button on:click={listSoldPets}>List</button>
    <div>dynamic list:</div>
    {#if soldReady !== undefined}
        {#await $soldReady}
            <div>Awaiting</div>
        {:then _}
            <div>Pets:</div>
            {#each soldPets as pet}
                <div>pet: {pet.name}</div>
            {/each}
        {/await}
    {/if}
</main>
