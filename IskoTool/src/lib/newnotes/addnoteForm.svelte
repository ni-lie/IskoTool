<script>
    import { createEventDispatcher } from "svelte";

    let dispatch = createEventDispatcher();

    let title;
    let noteMessage;

    const handleSubmit = () => {
        const note = {
            title,
            noteMessage,
            id: Math.random()
        };
    };
</script>

<h3> Add a new note </h3>
<form on:submit|preventDefault={handleSubmit}>
    <input type="text" placeholder="Title" bind:value={title}>
    <textarea placeholder= "Type your note" cols="30" rows="10" bind:value={noteMessage}></textarea>
    <br>
    <button>Save note</button>
</form>

<style>
    input {
        background-color: white;
    }
</style>