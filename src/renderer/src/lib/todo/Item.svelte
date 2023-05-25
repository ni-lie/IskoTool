<script>
    import { createEventDispatcher } from "svelte";

    export let id, text, completed;

    const dispatch = createEventDispatcher();

    function triggerUpdate(){
        dispatch("update", {id, text, completed});
    }
</script>

<div class="item" class:completed>
    <input class="text-input" type="text" bind:value={text} readonly={completed} 
    on:keyup={({key, target}) => key === 'Enter' && target.blur()}
    on:blur={() => triggerUpdate()} /> 
    <input class="completed-checkbox" type="checkbox" bind:checked={completed}
    on:change={() => triggerUpdate()} />
</div>

<style>
    .item {
        display: flex;
        align-items: center;
        padding: 15px;
        background: white;
    }

    .item.completed {
        background: #dddddd;
    }

    .item.completed .text-input {
        color: #555555;
        text-decoration: line-through;
    }
    .item:focus-within {
        background: rgba(255, 255, 255, 0.8)
    }

    .text-input {
        flex-grow: 1;
        background: none;
        border: none;
        outline: none;
        font-weight: 500;
        font-size: 1em;
    }

    .completed-checkbox {
        margin-left: 15px;
    }
</style>