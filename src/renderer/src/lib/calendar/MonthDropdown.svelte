<script lang="ts">
    import dropdownArrow from '../../images/green_arrow.png';
    export let month: number;

	let select: HTMLSelectElement;
    function onChange() {
        month = select.selectedIndex;
    }
    const options = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    let active = false;
    function toggleChoiceList() {
        active = !active;
    }
    function setInactive() {
        active = false;
    }

</script>

<span class="select-holder">
    <select bind:this={select} on:change={onChange} on:click={toggleChoiceList} on:blur={setInactive}>
        {#each options as option}
            <option>{option}</option>
        {/each}
    </select>
    <img class="arrow" class:expanded={active} src={dropdownArrow} alt='Dropdown arrow'>
</span>
