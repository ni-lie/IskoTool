<script lang="ts">
    import { eventStore } from "../calendar/CalendarStore";
    import type { Event } from "../../types/event";
    import { timeAscending } from "../calendar/timeAscending";

    let dailyEvents: Event[] = [];
    let today = new Date();
    let today_day = today.getDate();
    let today_month = today.getMonth();
    let today_year = today.getFullYear();
    let eventTime;

    for (const event of $eventStore) {
        const start = new Date(event.startTime);
        const start_day = start.getDate();
        const start_month = start.getMonth();
        const start_year = start.getFullYear();

        if (today_day === start_day && today_month === start_month && today_year === start_year) {
            dailyEvents.push(event);
        }
    }

    $: dailyEvents.sort(timeAscending);

    function getEventTime(event: Event) {
        if (["Birthday", "Holiday"].includes(event.eventType)) {
            return null;
        }

        const eventStart = new Date(event.startTime);
        const eventEnd = new Date(event.endTime);
        let eventStartTime = new Intl.DateTimeFormat('en-US', {hour: 'numeric', minute: 'numeric'}).format(eventStart);
        let eventEndTime;

        // Show end time if the event ends on the same day
        if (today_day === eventEnd.getDate() && today_month === eventEnd.getMonth() && today_year === eventEnd.getFullYear()) {
            eventEndTime = new Intl.DateTimeFormat('en-US', {hour: 'numeric', minute: 'numeric'}).format(eventEnd);
        } else {
            eventEndTime = null;
        }

        return [eventStartTime, eventEndTime];
    }
</script>

<div style="width:35%;">
    <span class="button-space">
        <h2 style="color: var(--orange-dark);">Tasks for today</h2>
        <a class="btn" href="#/planner">Go to Planner</a>
    </span>
    <div class="events">
        {#if dailyEvents.length === 0}
            <h2>No events for today</h2>
        {:else}
            {#each dailyEvents as event}
                <div class="event">
                    <h3 style="font-size: 1.5em; display: inline;">{event.name}</h3>
                
                    {#if (eventTime = getEventTime(event)) != null}
                        <span class="time">
                            {eventTime[0]}
                        
                            {#if eventTime[1] != null}
                                - {eventTime[1]}
                            {/if}
                        </span>
                    {/if}
                    
                    <p class="event-type">{event.eventType}</p>
                </div>
            {/each}
        {/if}
    </div>
</div>


<style>
    .events {
        display: flexbox;
        max-height: 27.5rem;
        overflow-y: auto;
    }

    .event {
        background-color: white;
        border-radius: 2px;
        margin: 0px 4px 15px;
        padding: 1.2em 1em 1em;
        box-shadow: 0px 2px 4px #8f8f8f;
    }

    .event-type {
        margin: 5px 0px;
        font-family: 'Space Grotesk';
        font-size: 1em;
        font-weight: 400;
        color: gray;
    }

    .time {
        color: var(--orange-light);
        float: right;
    }

    .button-space {
        display: inline-flex;
        align-items: center;
    }

    .btn {
    text-align: center;
    background-color: var(--orange-dark);
    color: white;
    font-family: 'Rubik';
    font-weight: bold;
    max-height: 1.5em;
    padding: 10px;
    margin-inline-start: 30px;
    border-radius: 4px;
    }
</style>