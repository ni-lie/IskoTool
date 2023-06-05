<script>
    import Home from '../../../src/images/Home.png'
</script>

<button on:click>
    <img src={Home} alt="Back to dashboard">
    <br>
    To Dashboard
</button>

<style>
    img {
        width: 2.5rem;
        height: 2.5rem;
    }

    button {
        background-color: transparent;
        border: none;
        padding-top: 0.5rem;
        padding-left: 0.5rem;

        cursor: pointer;
        user-select: none;

        font-family: inherit;
        transition: opacity 0.1s;
    }

    button:hover {
        opacity: 50%;
    }

</style>
