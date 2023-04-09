<script>
    export let type = 'primary';
</script>

<button class={type}>
    <slot></slot>
</button>

<style>
    button{
        border: 0;
        cursor: pointer;
        border-radius: 6px;
        padding: 8px 12px;
        font-weight: bold;
        box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.2);
    }
    .primary{
        background: #1c8d76;
        color: white;
    }
    
    .secondary{
        background: red;
        color: white;
    }
</style>