<script>
    import { createEventDispatcher } from "svelte";
    import Button from "./Button.svelte";
    
    export let noteID;
    export let notes = [];
    let dispatch = createEventDispatcher();

    const handleDelete = (noteID) => {
        notes = notes.filter((note) => note.id != noteID);
        dispatch('deleteNote', notes);
    }
</script>

<form on:submit|preventDefault={handleDelete}>
    <Button type="secondary"> Delete </Button>
</form>

<style>

</style>