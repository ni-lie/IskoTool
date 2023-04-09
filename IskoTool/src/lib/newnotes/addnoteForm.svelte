<script>
    import { createEventDispatcher } from "svelte";
    import Button from "./Button.svelte";

    let dispatch = createEventDispatcher();

    let title;
    let noteContent;

    const handleSubmit = () => {
        const note = {
            title,
            noteContent,
            id: Math.random()
        };
        dispatch('addNote', note);
    };
</script>

<h3> Add a new note </h3>
<form on:submit|preventDefault={handleSubmit}>
    <input type="text" placeholder="Title" bind:value={title}>
    <textarea placeholder= "Type your note" cols="30" rows="10" bind:value={noteContent}></textarea>
    <br>
    <Button>Save note</Button>
</form>

<style>
    input {
        background-color: white;
    }
</style>