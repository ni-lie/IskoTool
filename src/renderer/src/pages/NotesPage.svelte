<script lang="ts">
    import type { Note } from '../types/note';
    import Modal from '../lib/notes/modal.svelte';
    import AddnoteForm from '../lib/notes/addnoteForm.svelte';
    import NotesList from '../lib/notes/notesList.svelte';
    import EditNoteForm from '../lib/notes/editNoteForm.svelte';

    import addButtonFilePath from '../images/white_plus_resized.png';

    let selectedNote: Note | null = null;

    let searchTerm = '';

    let showModal = false;
    let showAddNoteForm = true;

    const noteSelection = (e) => {
        selectedNote = e.detail;
    }
    
    const toggleNote = () => {
        showModal = !showModal;
        showAddNoteForm = true;
    };
    const toggleEdit = () => {
        showModal = !showModal;
        showAddNoteForm = false;
    };

    const addNote = () => {
        showModal = false;
    };

    const editNote = () => {
        showModal = false;
        selectedNote = null;
    };

</script>

<Modal {showModal} on:click={toggleNote}>
    {#if showAddNoteForm}
        <AddnoteForm on:addNote={addNote} /> 
    {:else}
        {#if selectedNote !== null}
            <EditNoteForm selectedNote={selectedNote} on:editNote={editNote}/>
        {:else}
            <p>Note not found</p>
        {/if}
    {/if}
</Modal>

<main>
    <input type="text" placeholder="Search..." bind:value={searchTerm}>
    <br>
    <button class="add-note" on:click={toggleNote}><img class="white-plus" src={addButtonFilePath} alt="Add note"/></button>
    <NotesList showModal={showModal} toggleEdit={toggleEdit} showAddNoteForm={showAddNoteForm} on:selectedNote={noteSelection} on:delete={() => showModal = false} searchTerm={searchTerm}/> 
</main>

<style>
    input {
        background-color: white;
    }
    main {
        text-align: center;
        padding: 1em;
        margin: 0 auto;
    }
    .add-note {
        color: white;
        margin: auto;
        height: 4rem;
        width: 4rem;
        padding: 0.1em;
        border-radius: 50%;
        border: none;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background-color: var(--orange-light);

        position: fixed;
        bottom: 2em;
        right: 2em;
        z-index: 5;

        transition: background 0.25s ease-in-out, border 0.25s ease-in-out;
    }

    .add-note:hover {
        background: var(--orange-faded);
        border-color: var(--orange-faded);
    }
    .white-plus {
        height: 50%;
    }
</style>
