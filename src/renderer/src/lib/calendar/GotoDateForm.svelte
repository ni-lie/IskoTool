<script lang="ts">
	import { createEventDispatcher } from "svelte";
    import MonthDropdown from "./MonthDropdown.svelte";

    export let gotoMonth: number;
    export let gotoYear: number;

	let dispatch = createEventDispatcher();
	
	function handleSubmit() {
		// Forward the form data to all event listeners
        dispatch('gotoDate');
    }
</script>

<h2 class="pop-up">Go to</h2>
<form on:submit|preventDefault={handleSubmit}>
	<h3 class="pop-up">Month</h3>
	<MonthDropdown bind:month={gotoMonth} />
	<h3 class="pop-up">Year</h3>
	<input type="number" min=0 max=9999 bind:value={gotoYear}><br>
	<input type="submit" value="Go">
</form>
