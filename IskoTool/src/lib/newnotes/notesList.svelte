<script>
    import NotesDetails from "./notesDetails.svelte";
    import NotesStore from "./stores/NotesStore";
    import { onMount } from 'svelte';
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();
    export let showModal, toggleEdit, showAddNoteForm;

    let selectedNoteId = null
    const noteSelection = (e) => {
        selectedNoteId = e.detail;
        dispatch('selectedNote', selectedNoteId);
    };

</script>

<div class="notes-list">
    {#each $NotesStore as note (note.id)}
    <div>
        <NotesDetails note={note} showModal={showModal} toggleEdit={toggleEdit} showAddNoteForm={showAddNoteForm} on:cardClick={noteSelection}/> 
    </div>
    {:else}
        <p>There are no notes to show...</p>
    {/each}
</div>

<style>
    .notes-list{
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 20px;
    }

</style>