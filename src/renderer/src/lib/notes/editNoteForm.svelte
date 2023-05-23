<script lang="ts">
    import NotesStore from "./stores/NotesStore";
    import type { Note } from "../../types/note";
    import { createEventDispatcher } from "svelte";
    import Button from "../global-components/Button.svelte";
    import EmojiPicker from "./EmojiPicker.svelte";

    export let selectedNote: Note;

    let dispatch = createEventDispatcher();

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

    function onEmojiChange_title(event) {
        selectedNote.title = (selectedNote.title).concat(event.detail.emoji);
    }

    function onEmojiChange_text(event) {
        selectedNote.noteContent = (selectedNote.noteContent).concat(event.detail.emoji);
    }

    let words = 0;
    $: if (selectedNote.noteContent.trim().length > 0) {
        words = selectedNote.noteContent.trim().split(' ').length;
    }

    
</script>

<h3> Edit Note </h3>


<form on:submit|preventDefault={handleEdit}>
    <input type="text" placeholder="Title" bind:value={selectedNote.title}>
    <EmojiPicker on:change={onEmojiChange_title}/>

    <button type="button" class:pinBtnActive={selectedNote.pinned}
        on:click={() => {
            selectedNote.pinned = !selectedNote.pinned;
            }
        }>📌</button>
    
    <textarea placeholder= "Type your note" cols="30" rows="10" bind:value={selectedNote.noteContent}></textarea>
    <br>
    <EmojiPicker on:change={onEmojiChange_text}/>
    
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
    textarea {
		resize: none;
	}

    .pinBtnActive {
        background-color: var(--orange-faded);
        border-radius: 2.5px;
        border-color: rgb(90, 90, 90);
    }
</style>