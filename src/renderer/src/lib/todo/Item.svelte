<script>
    export let id, text, completed;
</script>

<div class="item">
    <input class="text-input" type="text" bind:value={text} readonly={completed} /> 
    <input class="completed-checkbox" type="checkbox" bind:checked={completed} />
</div>

<style>

</style>