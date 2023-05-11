<script>
    import NotesStore from "./stores/NotesStore";
    import { createEventDispatcher } from "svelte";
    import Button from "./Button.svelte";
    import EmojiSelector from 'svelte-emoji-selector';

    let dispatch = createEventDispatcher();

    let title = '';
    let noteContent = '';

    let valid = false;
    let errors = { title: '', noteContent: ''};

    const autoClose = false;

    const handleSubmit = () => {
        valid = true;
        
        // validate title
        if (title.trim().length < 1){
            valid = false;
            errors.title = 'Title must be at least 1 character long';
        } else {
            errors.title = '';
        }
        // validate noteContent
        if (noteContent.trim().length < 1){
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
            id: Math.random(),
            pinned: false,
            };
            // save note to NoteStore
            NotesStore.update(currentNotes => {
                return [note, ...currentNotes];
            });
            console.log("new note ID: ", note.id)
            dispatch('addNote');
        }
    };

    function emojiOnTitle(event) {
        title += event.detail
    }

    function emojiOnNote(event) {
        noteContent += event.detail
    }

    let words = 0;
    $: if (noteContent.trim().length > 0) {
        words = noteContent.trim().split(' ').length;
    }
</script>

<h3> Add a new note </h3>
<EmojiSelector on:emoji={emojiOnTitle} {autoClose} />
<EmojiSelector on:emoji={emojiOnNote} {autoClose}/>
<form on:submit|preventDefault={handleSubmit}>
    <input type="text" placeholder="Title" bind:value={title}>
    
    <div class="errors"> { errors.title }</div>
    <textarea placeholder= "Type your note" cols="30" rows="10" bind:value={noteContent}></textarea><br>
    
    <div class="errors">{ errors.noteContent }</div>
    <br>
    <div>
        {words} words, {noteContent.length} characters
    </div>
    <div>
        <Button type="primary">Save note</Button>
    </div>
    
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