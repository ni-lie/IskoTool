<script>
    let title;
    let noteMessage;
</script>

<h3> Add a new note </h3>
    <form>
        <input type="text" placeholder="Title" bind:value={title}>
        <textarea placeholder= "Type your note" cols="30" rows="10" bind:value={noteMessage}></textarea>
        <br>
        <button>Save note</button>
        <button>Delete</button>
    </form>
<style>
    input {
        background-color: white;
    }
</style>