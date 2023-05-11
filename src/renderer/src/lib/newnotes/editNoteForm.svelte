<script lang="ts">
    import NotesStore from "./stores/NotesStore";
    import type { Note } from "../../types/note";
    import { createEventDispatcher } from "svelte";
    import Button from "./Button.svelte";
    import EmojiSelector from 'svelte-emoji-selector';

    export let selectedNote: Note;

    let dispatch = createEventDispatcher();

    const autoClose = false;
    const handleEdit = () => {
        NotesStore.update(currentNotes => {
            let copiedNotes: Note[] = [...currentNotes];
            let noteToBeEdited = copiedNotes.find(note => note.id == selectedNote.id);

            noteToBeEdited.title = selectedNote.title;
            noteToBeEdited.noteContent = selectedNote.noteContent;
            noteToBeEdited.pinned = selectedNote.pinned;
            return copiedNotes;
        });
        dispatch('editNote');
    };

    function togglePin(noteToPin) {
        noteToPin.pinned = !noteToPin.pinned;
    }
    function emojiOnTitle(event) {
        selectedNote.title += event.detail
    }

    function emojiOnNote(event) {
        selectedNote.noteContent += event.detail
    }

    let words = 0;
    $: if (selectedNote.noteContent.trim().length > 0) {
        words = selectedNote.noteContent.trim().split(' ').length;
    }

    
</script>

<h3> Edit Note </h3>
<EmojiSelector on:emoji={emojiOnTitle} {autoClose} />
<EmojiSelector on:emoji={emojiOnNote} {autoClose}/>
<button type="button" on:click={() => togglePin(selectedNote)}>Toggle pin</button>

<form on:submit|preventDefault={handleEdit}>
    <input type="text" placeholder="Title" bind:value={selectedNote.title}>
    
    <textarea placeholder= "Type your note" cols="30" rows="10" bind:value={selectedNote.noteContent}></textarea><br>
    
    <br>
    <div>
        {words} words, {Array.from(selectedNote.noteContent).length} characters
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