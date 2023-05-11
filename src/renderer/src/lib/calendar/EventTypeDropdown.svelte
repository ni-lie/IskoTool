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

<div class="select-holder">
    <select bind:value={select} on:click={toggleChoiceList} on:blur={setInactive}>
        <option value="General">General</option>
        <option value="Birthday">Birthday</option>
        <option value="Holiday">Holiday</option>
        <option value="Appointment">Appointment</option>
    </select>
    <img class="arrow" class:expanded={active} src={dropdownArrow} alt='ff'>
</div>

<style>

div.select-holder {
    min-width: 286px;
    min-height: 0;
    margin-bottom: 10px;
    display: flex;
    position: relative;
    align-items: center;
}

select {
    appearance: none;
    text-align: left;
    color: black;
    font-family: 'Space Grotesk';
    font-size: 15px;
    padding: 7px 10px;
    width: 60%;
    border: solid var(--evergreen-dark) 1px;
    border-radius: 3px;
    background-color: white;
  }

.expanded {
		transform: rotate(90deg);
    }

.arrow {
    position: absolute;
    left: 55%;
    top: 35%;
    width: 4%;
    vertical-align: middle;
    pointer-events: none;
    transition: 0.2s;
}
</style>