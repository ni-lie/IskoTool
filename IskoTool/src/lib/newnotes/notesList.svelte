<script>
    export let notes = [];

    const handleDelete = (id) => {
        notes = notes.filter((note) => note.id != id);
    }
</script>

<div class="notes-list">
    {#each notes as note (note.id)}
    <div>
        <h3>{note.title}</h3>
        <p>{note.noteContent}</p>
        <button on:click={() => {handleDelete(note.id)}}>Delete</button>
    </div>
    {:else}
        <p>There are no notes to show...</p>
    {/each}
</div>

<style>

</style>