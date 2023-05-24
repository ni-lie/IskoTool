<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import type { CustomMode } from '../../types/customtimer';

	let dispatch = createEventDispatcher();
    let name = "Custom Mode";
    let minutes = 0;
    let seconds = 0;

	function handleSubmit() {
		// Forward the form data to all event listeners
        dispatch('addCustomMode', {
			name,
			minutes,
			seconds,
			id: crypto.randomUUID(),
		} satisfies CustomMode);
    }
</script>

<form on:submit|preventDefault={handleSubmit}>
	<h3 class="pop-up">Mode Name</h3>
	<input type="text" class="transparent-bg" bind:value={name}>
	<br>
	<h3 class="pop-up">Timer Duration</h3>
	<input type="number" min=0 max=59 bind:value={minutes}> : <input type="number" min=0 max=59 bind:value={seconds}>
	<br>
	<input type="submit" value="Confirm" />
</form>

<style>
	.transparent-bg {
		background-color: transparent;
	}
</style>
