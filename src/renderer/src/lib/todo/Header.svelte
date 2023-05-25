<script>
    import { items } from "./stores";

    $: itemCount = $items.length;
</script>

<div class = "header">
    <span> To-Do List</span>
    <span>0/0</span>
</div>

<style>
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px 20 px;
        color: white;
        font-weight: bold;
        font-size: 1.5em;
        background: rgba(0, 0, 0, 0.1);
    }
</style>