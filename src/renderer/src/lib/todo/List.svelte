<script>
    import { onMount } from "svelte";
    import { v4 as uuidv4 } from "uuid";
    import { items } from "./stores";
    import { loadToDo, setToDo } from "../helper-functions/LocalStorageAccess";
    import Item from "./Item.svelte";
    import NewItem from "./NewItem.svelte";


    function handleNewItem(e) {
        $items = [
            {
                id: uuidv4(),
                text: e.detail,
                completed: false
            },
            ...$items
        ];
        setToDo($items);
    }

    function handleUpdate(e) {
        const index = $items.findIndex((item) => item.id === e.detail.id);
        $items[index] = e.detail;
        setToDo($items);
    }

    function handleDelete(e) {
        $items = $items.filter((item) => item.id !== e.detail)
        setToDo($items);
    }

    let itemsSorted = [];

    $: {
        itemsSorted = [...$items];
        itemsSorted.sort((a, b) => {
            if (a.completed && b.completed) return 0;
            if (a.completed) return 1;
            if (b.completed) return -1;

            return 0;
        });
    }

    onMount(async () => {
        $items = await loadToDo();
    });
</script>


<div class="list">
    <NewItem on:newitem={handleNewItem}/>
    {#each itemsSorted as item (item)}
        <Item {...item} on:update={handleUpdate} on:delete={handleDelete} />
    {:else}
        <p class="list-status"> No items exist</p>
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

