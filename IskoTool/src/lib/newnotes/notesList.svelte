<script>
    import NotesDetails from "./notesDetails.svelte";
    import NotesStore from "./stores/NotesStore";

    export let showModal;
    export let toggleNote;
    export let notes = [];

    

</script>

<div class="notes-list">
    {#each $NotesStore as note (note.id)}
    <div>
        <NotesDetails note={note} showModal={showModal} toggleNote={toggleNote} /> 
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