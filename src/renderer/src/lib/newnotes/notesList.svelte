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

    function pinnedFirst(a,b) {
        if (a.pinned && !b.pinned) {
            return -1;
        }
        if (!a.pinned && b.title) {
            return 1;
        }
        return 0;
    }

    $: filteredNotes = $NotesStore.filter(note => note.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
            note.noteContent.toLowerCase().includes(searchTerm.toLowerCase())).sort(pinnedFirst);

</script>

<div class="notes-list">
    {#each filteredNotes as note (note.id)}    <!-- {#each $NotesStore as note (note.id)} -->
    <div class = "card-container">
        <NotesDetails note={note} showModal={showModal} toggleEdit={toggleEdit} showAddNoteForm={showAddNoteForm} on:cardClick={noteSelection}/> 
    </div>
    {:else}
        <p>There are no notes to show...</p>
    {/each}
</div>

<style>
    .notes-list{
        width: 100%;
        padding-top: 2em;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(16em, 1fr));
        /*grid-template-rows: repeat(auto-fit, 15em);*/
        grid-auto-rows: 20em;
        column-gap: 0;
        row-gap: 0;
    }
    .card-container {
        max-width: 100%;
        min-width: 20%;
        display: flex;
        justify-content: center;
    }
</style>