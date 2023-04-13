<script lang="ts">
    import { eventStore } from './CalendarStore';
    import type { Event } from '../../types/event';
    import EventModal from './EventModal.svelte';

    let showModal = false;

    function addEvent(e) {
        eventStore.addEvent(e.detail);
    }
</script>

<section>
    <button class="fadedtext" on:click={() => (showModal = true)}>+ New Event</button>
    <EventModal bind:showModal on:addNewEvent={addEvent}/>
</section>