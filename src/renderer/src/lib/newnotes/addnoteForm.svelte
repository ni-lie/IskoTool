<script>
    import NotesStore from "./stores/NotesStore";
    import { createEventDispatcher } from "svelte";
    import Button from "./Button.svelte";
    import EmojiSelector from 'svelte-emoji-selector';

    let dispatch = createEventDispatcher();

    let title = '';
    let noteContent = '';

    let valid = false;
    let errors = { inTitle: '', inNoteContent: ''};

    const autoClose = false;

    const handleSubmit = () => {
        valid = true;
        
        // validate title
        if (title.trim().length < 1){
            valid = false;
            errors.inTitle = "Title must be at least 1 character long";
        } else {
            errors.inTitle = '';
        }
        // validate noteContent
        if (noteContent.trim().length < 1){
            valid = false;
            errors.inNoteContent = "Note cannot be empty";
        } else {
            errors.inNoteContent = '';
        }

        // add new note, if valid

        if (valid) {
            const note = {
            title,
            noteContent,
            id: crypto.randomUUID(),
            pinned: false,
            };
            // save note to NoteStore
            NotesStore.update(currentNotes => {
                return [note, ...currentNotes];
            });
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
    
    <div class="errors"> { errors.inTitle }</div>
    <textarea placeholder= "Type your note" cols="30" rows="10" bind:value={noteContent}></textarea><br>
    
    <div class="errors">{ errors.inNoteContent }</div>
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