<script>
    import { onMount } from "svelte";
    import { items } from "./stores";
    import TodoApi from "./TodoApi";
    import Item from "./Item.svelte";
    import NewItem from "./NewItem.svelte";

    function handleNewItem(e) {
        
    }

    function handleUpdate(e) {
        const index = $items.findIndex(item => item.id === e.detail.id);
        $items[index] = e.detail;
        TodoApi.save($items);
    }

    function handleDelete(e) {
        $items = $items.filter(item => item.id !== e.detail)
        TodoApi.save($items);
    }

    onMount(async () => {
        $items = await TodoApi.getAll();
    });
</script>


<div class="list">
    <NewItem on:newitem={handleNewItem}/>
    {#each $items as item (item)}
        <Item {...item} onupdate={handleUpdate} on:delete={handleDelete} />
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

