<script>
    import NotesStore from "./stores/NotesStore";
    import { createEventDispatcher } from "svelte";
    import Button from "./Button.svelte";
    import EmojiSelector from 'svelte-emoji-selector';
    export let selectedNoteId;

    let dispatch = createEventDispatcher();

    const autoClose = false;
    const handleEdit = () => {
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

    function emojiOnTitle(event) {
        selectedNoteId.title += event.detail
    }

    function emojiOnNote(event) {
        selectedNoteId.noteContent += event.detail
    }

    let words = 0;
    $: if (selectedNoteId.noteContent.trim().length > 0) {
        words = selectedNoteId.noteContent.trim().split(' ').length;
    }

    
</script>


<h3> Edit Note </h3>
<form on:submit|preventDefault={handleEdit}>
    <input type="text" placeholder="Title" bind:value={selectedNoteId.title}>
    <EmojiSelector on:emoji={emojiOnTitle} {autoClose} />
    <textarea placeholder= "Type your note" cols="30" rows="10" bind:value={selectedNoteId.noteContent}></textarea><br>
    <EmojiSelector on:emoji={emojiOnNote} {autoClose}/>
    <br>
    <div>
        {words} words, {selectedNoteId.noteContent.length} characters
    </div>
    <Button type="primary">Save note</Button>
</form>

<style>
    input {
        background-color: white;
    }
    /* .errors{
        font-weight: bold;
        font-size: 12px;
        color: #d91b42;
    } */
    textarea {
		resize: none;
	}
</style>