<script>
    import { createEventDispatcher } from "svelte";
    
    function handleKeyUp({key}){
        if (key !== 'Enter' || value.length === 0) return;
    }
    let value = "";
</script>

<input type = "text" on:keyup = {handleKeyUp} bind:value placeholder = "+ Add Item">
