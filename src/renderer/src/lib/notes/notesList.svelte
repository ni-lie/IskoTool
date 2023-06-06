<script lang="ts">
    import NotesDetails from "./notesDetails.svelte";
    import NotesStore from "./stores/NotesStore";
    import type { Note } from "../../types/note";
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();
    export let showModal, toggleEdit, showAddNoteForm, searchTerm;

    let selectedNote: Note | null = null;

    const noteSelection = (e) => {
        selectedNote = e.detail;
        dispatch('selectedNote', selectedNote);
    };
    
    function deleteAction() {
        dispatch('delete');
    }

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
    {#each filteredNotes as note (note.id)}
    <div class = "card-container">
        <NotesDetails note={note} toggleEdit={toggleEdit} on:cardClick={noteSelection} on:propagateDelete={deleteAction}/> 
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
