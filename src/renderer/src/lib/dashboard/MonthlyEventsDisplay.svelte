<script lang="ts">
    import { eventStore } from "../calendar/CalendarStore";
    import type { Event } from "../../types/event";
    import { timeAscending } from "../calendar/timeAscending";

    let monthlyEvents: Event[] = [];
    let today = new Date();
    let today_day = today.getDate();
    let today_month = today.getMonth();
    let today_year = today.getFullYear();

    for (const event of $eventStore) {
        const start = new Date(event.startTime);
        const start_day = start.getDate();
        const start_month = start.getMonth();
        const start_year = start.getFullYear();

        if (start_day > today_day && today_month === start_month && today_year === start_year) {
            monthlyEvents.push(event);
        }
    }

    $: monthlyEvents.sort(timeAscending);

    function getEventDate(event: Event) {
        const eventStart = new Date(event.startTime);
        const eventDate = new Intl.DateTimeFormat('en-US', {month: 'short', day: '2-digit'}).format(eventStart);
        return eventDate;
    }
</script>

<div style="width:50%">
    <span class="button-space">
        <h2 style="color: var(--evergreen-dark);">Upcoming events</h2>
        <a class="btn" href="#/calendar">Go to Calendar</a>
    </span>
    {#if monthlyEvents.length === 0}
        <h2 class="no-events">No more events this month</h2>
    {:else}
        <div class="events">
            {#each monthlyEvents as event}
                <div class="event">
                    <h2 class="event-header">{getEventDate(event)}</h2>
                    <p>{event.name}</p>
                </div>
            {/each}
        </div>
    {/if}
    
</div>

<style>
    .no-events{
        padding: 1em;
        background-color: white;
    }

    .events {
        background-color: white;
        height: 25em;
        display: grid;
        grid-template-columns: repeat(auto-fill, 8em);
        grid-template-rows: repeat(auto-fill, 8em);
        grid-row-gap: .5em;
        overflow-y: auto;
    }

    .event {
        background-color: white;
        border: 3px solid var(--evergreen-dark);
        border-radius: 10px;
        margin: 1em 1em;
        height: 7em;
        width: 7em;
        text-align: center;
    }

    .event-header {
        margin: 0;
        background-color: var(--evergreen-dark);
        color: white;
        padding: 5px;
    }

    .button-space {
        display: inline-flex;
        align-items: center;
    }

    .btn {
    text-align: center;
    background-color: var(--evergreen-dark);
    color: white;
    font-family: 'Rubik';
    font-weight: bold;
    max-height: 1.5em;
    padding: 10px;
    margin-inline-start: 30px;
    border-radius: 4px;
    }
</style>