<script>
    import NotesStore from "./stores/NotesStore";
    import { createEventDispatcher } from "svelte";
    import Button from "./Button.svelte";
    import EmojiSelector from 'svelte-emoji-selector';
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

    function emojiOnTitle(event) {
        title += event.detail
    }

    function emojiOnNote(event) {
        noteContent += event.detail
    }

    $: words = selectedNoteId.noteContent.split(' ').length;
</script>


<h3> Edit Note </h3>
<form on:submit|preventDefault={handleEdit}>
    <input type="text" placeholder="Title" bind:value={selectedNoteId.title}>
    <EmojiSelector on:emoji={emojiOnTitle} />
    <textarea placeholder= "Type your note" cols="30" rows="10" bind:value={selectedNoteId.noteContent}></textarea><br>
    <EmojiSelector on:emoji={emojiOnNote} />
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