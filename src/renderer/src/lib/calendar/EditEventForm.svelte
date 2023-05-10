<script lang="ts">
	import { createEventDispatcher } from "svelte";
    import EventTypeDropdown from "./EventTypeDropdown.svelte";
	import type { Event } from "../../types/event";

	let dispatch = createEventDispatcher();
    export let event: Event = {
		name: '',
		eventType: '',
		startTime: '',
        endTime: '',
        id: '',
	};
	
	function handleSubmit() {
		if (["Birthday", "Holiday"].includes(event.eventType)) {
			event.endTime = undefined;
		}
		// Forward the form data to all event listeners
        dispatch('editExistingEvent', event satisfies Event);
    }
</script>

<form on:submit|preventDefault={handleSubmit}>
	<h3 class="pop-up">Event Name</h3>
	<input type="text" class="transparent-bg" bind:value={event.name}><br>
    <h3 class="pop-up">Event Type</h3>
    <EventTypeDropdown bind:select={event.eventType} />
	<h3 class="pop-up">Start Time</h3>
	{#if ["General", "Appointment"].includes(event.eventType)}
		<input type="datetime-local" bind:value={event.startTime}><br>
    	<h3 class="pop-up">End Time</h3>
		<input type="datetime-local" bind:value={event.endTime}><br>
	{:else}
		<input type="date" bind:value={event.startTime}><br>
	{/if}
	<input type="submit" value="Confirm" />
</form>

<style>
	.transparent-bg {
		background-color: transparent;
	}
</style>
