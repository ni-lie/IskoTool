<script>
    import NotesStore from "./stores/NotesStore";
    import { createEventDispatcher } from "svelte";
    import Button from "./Button.svelte";
    
    export let selectedNoteId;

    let dispatch = createEventDispatcher();

    console.log(selectedNoteId)
    const handleEdit = (event) => {
        NotesStore.update(currentNotes => {
            let copiedNotes = [...currentNotes];
            let noteToBeEdited = copiedNotes.find(note => note.id == selectedNoteId.id);

            console.log(noteToBeEdited.id)

            noteToBeEdited.title = selectedNoteId.title;
            noteToBeEdited.noteContent = selectedNoteId.noteContent;
            return copiedNotes;
        });
        dispatch('editNote');
        // console.log(selectedNoteId)
    };
</script>


<h3> Edit Note </h3>
<form on:submit|preventDefault={handleEdit}>
    <input type="text" placeholder="Title" bind:value={selectedNoteId.title}>
    <textarea placeholder= "Type your note" cols="30" rows="10" bind:value={selectedNoteId.noteContent}></textarea>
    <br>
    <Button type="primary">Save note</Button>
</form>

<style>
    input {
        background-color: white;
    }
    .errors{
        font-weight: bold;
        font-size: 12px;
        color: #d91b42;
    }
</style>