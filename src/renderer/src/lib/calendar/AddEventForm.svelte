<script lang="ts">
	import { createEventDispatcher } from "svelte";
    import EventTypeDropdown from "./EventTypeDropdown.svelte";
	import type { Event } from "../../types/event";

	let dispatch = createEventDispatcher();
    let name = "New Event";
    let eventType: string;
    let startTime: string;
    let endTime: string;

	$: {console.log(endTime)};//
	
	function handleSubmit() {
		// Forward the form data to all event listeners
		if (['Birthday', 'Holiday'].includes(eventType)) {
			dispatch('addNewEvent', {
			name,
            eventType,
			startTime,
			endTime: null,
			id: crypto.randomUUID(),
			} satisfies Event);
		}
		else {
			dispatch('addNewEvent', {
			name,
            eventType,
			startTime,
			endTime,
			id: crypto.randomUUID(),
			} satisfies Event);
		}
    }
</script>

<form on:submit|preventDefault={handleSubmit}>
	<h3 class="pop-up">Event Name</h3>
	<input type="text" class="transparent-bg" bind:value={name}><br>
    <h3 class="pop-up">Event Type</h3>
    <EventTypeDropdown bind:select={eventType} />
	<h3 class="pop-up">Start Time</h3>
	{#if ["General", "Appointment"].includes(eventType)}
		<input type="datetime-local" bind:value={startTime}><br>
    	<h3 class="pop-up">End Time</h3>
		<input type="datetime-local" bind:value={endTime}><br>
	{:else}
		<input type="date" bind:value={startTime}><br>
	{/if}
	<input type="submit" value="Confirm" />
</form>

<style>
	.transparent-bg {
		background-color: transparent;
	}
</style>