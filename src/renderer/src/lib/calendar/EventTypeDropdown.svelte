<script lang="ts">
    export let select: string;
    import dropdownArrow from '../../images/green_arrow.png';

    let active = false;
	
	function toggleChoiceList() {
		active = !active;
	}
	
	function setInactive() {
		// This function gets called when select element loses focus
		active = false;
	}
</script>

<span class="select-holder">
    <select bind:value={select} on:click={toggleChoiceList} on:blur={setInactive}>
        <option value="General">General</option>
        <option value="Birthday">Birthday</option>
        <option value="Holiday">Holiday</option>
        <option value="Appointment">Appointment</option>
    </select>
    <img class="arrow" class:expanded={active} src={dropdownArrow} alt='Dropdown arrow'>
</span>