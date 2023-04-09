<script>
    import NotesDetails from "./notesDetails.svelte";

    export let notes = [];
    // const handleDelete = (id) => {
    //     notes = notes.filter((note) => note.id != id);
    // }
        

</script>

<div class="notes-list">
    {#each notes as note (note.id)}
    <div>
        <NotesDetails {note} /> 
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