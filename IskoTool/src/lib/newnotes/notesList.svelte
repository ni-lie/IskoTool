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
        <h3>{note.title}</h3>
        <p>{note.noteContent}</p>
        <!-- <Button type="secondary" on:click={() => {handleDelete(note.id)}}> Delete </Button> -->
        <!-- <DeletenoteForm on:deleteNote={note.id}/> -->
        <!-- <DeletenoteForm noteID={note.id} notes={notes}/> -->
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
    h3 {
        color: #1c8d76;
    }
</style>