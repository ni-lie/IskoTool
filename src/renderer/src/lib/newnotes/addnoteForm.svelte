<script>
    import NotesStore from "./stores/NotesStore";
    import { createEventDispatcher } from "svelte";
    import Button from "./Button.svelte";
    import EmojiSelector from 'svelte-emoji-selector';

    let dispatch = createEventDispatcher();

    let title = '';
    let noteContent = '';

    let valid = false;
    // let fields = { title: '', noteContent: ''};
    let errors = { title: '', noteContent: ''};


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
            id: Math.random()
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
</script>

<h3> Add a new note </h3>
<form on:submit|preventDefault={handleSubmit}>
    <input type="text" placeholder="Title" bind:value={title}>
    <EmojiSelector on:emoji={emojiOnTitle} />
    <div class="errors"> { errors.title }</div>
    <textarea placeholder= "Type your note" cols="30" rows="10" bind:value={noteContent}></textarea><br>
    <EmojiSelector on:emoji={emojiOnNote} />
    <div class="errors">{ errors.noteContent }</div>
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