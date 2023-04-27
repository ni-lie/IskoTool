<script>
    import NotesDetails from "./notesDetails.svelte";
    import NotesStore from "./stores/NotesStore";
    import { createEventDispatcher } from 'svelte';


    const dispatch = createEventDispatcher();
    export let showModal, toggleEdit, showAddNoteForm, searchTerm;
    let selectedNoteId = null;

    const noteSelection = (e) => {
        selectedNoteId = e.detail;
        dispatch('selectedNote', selectedNoteId);
    };

    $: filteredNotes = $NotesStore.filter(note => note.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
            note.noteContent.toLowerCase().includes(searchTerm.toLowerCase()));

</script>

<div class="notes-list">
    {#each filteredNotes as note (note.id)}    <!-- {#each $NotesStore as note (note.id)} -->
    <div>
        <NotesDetails note={note} showModal={showModal} toggleEdit={toggleEdit} showAddNoteForm={showAddNoteForm} on:cardClick={noteSelection}/> 
    </div>
    {:else}
        <p>There are no notes to show...</p>
    {/each}
</div>

<style>
    .notes-list{
        padding-top: 2em;
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 20px;
    }

</style>