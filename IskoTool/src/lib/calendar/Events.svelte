<script lang="ts">
	import { onMount } from 'svelte';
    import { eventStore } from './CalendarStore';
    import type { Event } from '../../types/event';
    import { setEvents } from '../../types/LocalStorageAccess'
    import AddEventModal from './AddEventModal.svelte';
    import EditEventModal from './EditEventModal.svelte';
    import Svelecte from 'svelecte';

    let showAddEventModal = false;
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
	
    onMount(() => {
		const preloaded: string = localStorage.getItem('events');
		if (preloaded) {
			$eventStore = JSON.parse(preloaded);
		}
	});


    function addEvent(e) {
        eventStore.addEvent(e.detail);
        setEvents($eventStore);
    }

    function editEvent(e) {
        eventStore.saveEvent(e.detail);
        setEvents($eventStore);
    }

    function deleteEvent() {
        if (confirm('Are you sure you want to delete this event?')) {
			eventStore.deleteEvent(selectedID);
            setEvents($eventStore);
			selectedID = null;
		}
    }
</script>

<section>
    <Svelecte options={$eventStore} bind:value={selectedID} valueField="id" labelField="name" placeholder="Select an event..."></Svelecte>
    <button class="fadedtext" on:click={() => (showAddEventModal = true)}>+ New Event</button>
    <AddEventModal bind:showAddEventModal on:addNewEvent={addEvent}/>
    <button class="fadedtext" disabled={selectedID === null} on:click={() => (showEditEventModal = true)}>Edit Event</button>
    <EditEventModal bind:showEditEventModal on:editExistingEvent={editEvent} bind:event/>
    <button disabled={selectedID === null} on:click={deleteEvent}>Delete</button>
</section>