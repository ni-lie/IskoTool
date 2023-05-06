<script lang="ts">
    import { eventStore } from './CalendarStore';
    import type { Event } from '../../types/event';
    import EditEventModal from './EditEventModal.svelte';
    import Svelecte from 'svelecte';

    export let right = false;

    let showEditEventModal = false;
    let selectedID: string | null = null;
    let event: Event = {
		name: '',
		eventType: '',
		startTime: '',
        endTime: '',
        id: '',
	};

    $: {
		const found = $eventStore.find(event => event.id === selectedID);
		if (found) event = found;
	}

    function editEvent(e) {
        eventStore.saveEvent(e.detail);
    }

    function deleteEvent() {
        if (confirm('Are you sure you want to delete this event?')) {
			eventStore.deleteEvent(selectedID);
			selectedID = null;
		}
    }
</script>

<section class:right>
    <Svelecte options={$eventStore} bind:value={selectedID} valueField="id" labelField="name" placeholder="Select (or search for) an event..."></Svelecte>
    <button class="fadedtext" disabled={selectedID === null} on:click={() => (showEditEventModal = true)}>Edit Event</button>
    <EditEventModal bind:showEditEventModal bind:event on:editExistingEvent={editEvent} />
    <button disabled={selectedID === null} on:click={deleteEvent}>Delete</button>
</section>

<style>
    section.right {
        position: fixed; 
        right: 2em;
    }
</style>