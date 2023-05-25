<script>
    import { onMount } from "svelte";
    import { items } from "./stores";
    import TodoApi from "./TodoApi";

    function handleNewItem(e) {

    }

    function handleUpdate(e) {
        
    }

    function handleDelete(e) {
        
    }

    onMount(async () => {
        $items = await TodoApi.getAll();
    });
</script>


<div class="list">
    {#each $items as item (item)}
        {JSON.stringify(item)} 
    {:else}
        <p class="list-status"> No items Exist</p>
    {/each}
</div>

<style>
    .list {
        padding: 15px;
    }

    .list-status {
        margin: 0;
        text-align: center;
        color: white;
        font-weight: bold;
        font-size: 1.1em;
    }
</style>

