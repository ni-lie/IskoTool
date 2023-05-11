<script lang="ts">
    export let select: string;
    import test from '../../images/placeholder.png';

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
    <img class="arrow" class:expanded={active} src={test} alt='ff'>
</div>

<style>

.select-holder {
    min-width: 0;
    min-height: 0;
    /*remove above later it's just currently affected by some css elsewhere that I can't be bothered to find rn*/
    width: 286px;
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
    }
select {
    appearance: none;
    text-align: left;
    color: black;
    font-family: 'Space Grotesk';
    font-size: 15px;
    padding: 7px 10px;
    width: 100%;
    /*margin: 20px 20px 20px 2rem;*/
    border: solid var(--evergreen-dark) 1px;
    border-radius: 3px;
    background-color: white;
    transition: 0.2s;
  }

.expanded {
		transform: rotate(90deg);
    }

.arrow {
    position: absolute;
    z-index: 5;
    right: 10px;
    height: 60%;
    width: 12%;
    vertical-align: middle;
    pointer-events: none;
    transition: 0.2s;
}

.expanded {
    transform: rotate(90deg);
}
</style>