<script>
    import { createEventDispatcher } from "svelte";
    import Button from "./Button.svelte";

    let dispatch = createEventDispatcher();

    let title;
    let noteContent;

    let valid = false;
    let errors = { title: '', noteContent: ''};


    const handleSubmit = () => {
        valid = true;
        
        // validate title
        if (errors.title.trim().length < 1){
            valid = false;
            errors.title = 'Title must be at least 1 character long';
        } else {
            errors.title = '';
        }
        // validate noteContent
        if (errors.noteContent.trim().length < 1){
            valid = false;
            errors.noteContent = 'Note cannot be empty';
        } else {
            errors.noteContent = '';
        }

        // add new note, if valid

        if (valid) {
            const note = {
            title,
            noteContent,
            id: Math.random()
            };
            dispatch('addNote', note);
        }
    };
</script>

<h3> Add a new note </h3>
<form on:submit|preventDefault={handleSubmit}>
    <input type="text" placeholder="Title" bind:value={title}>
    <div class="errors"> { errors.title}</div>
    <textarea placeholder= "Type your note" cols="30" rows="10" bind:value={noteContent}></textarea>
    <div class="errors">{ errors.noteContent }</div>
    <br>
    <Button type="primary">Save note</Button>
</form>

<style>
    input {
        background-color: white;
    }
</style>