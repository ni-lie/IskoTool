<script>
    import NotesStore from "./stores/NotesStore";
    import { createEventDispatcher } from "svelte";
    import Button from "./Button.svelte";
    export let note;

    let dispatch = createEventDispatcher();

    const handleEdit = (id) => {
        NotesStore.update(currentNotes => {
            let copiedNotes = [... currentNotes];
            let noteToBeEdited = copiedNotes.find(note => note.id == id);

            noteToBeEdited.title = note.title;
            noteToBeEdited.noteContent = note.noteContent;
        });
        dispatch('editNote', note);
    };
</script>


<h3> Edit Note </h3>
<form on:submit|preventDefault={handleEdit}>
    <input type="text" placeholder="Title" bind:value={note.title}>
    <!-- <div class="errors"> { errors.title }</div> -->
    <textarea placeholder= "Type your note" cols="30" rows="10" bind:value={note.noteContent}></textarea>
    <!-- <div class="errors">{ errors.noteContent }</div> -->
    <br>
    <Button type="primary">Save note</Button>
</form>

<style>

</style>