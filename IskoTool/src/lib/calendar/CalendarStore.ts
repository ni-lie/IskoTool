import { writable } from 'svelte/store';
import type { Event } from '../../types/event';

/** Notes are now stored in an array instead of a dictionary (more efficient lookup).*/  
const { set, update, subscribe } = writable([] as Event[]);

export const eventStore  = {
	subscribe,
	set,
	addEvent(event: Event) {
		update(events => {
			events.push({...event});
            console.log(events);
			return events;
		});
    },

    saveEvent(eventEd: Event) {
        update(events => {
            let editIdx = events.findIndex(event => event.id == eventEd.id);
            events[editIdx].name = eventEd.name;
            events[editIdx].eventType = eventEd.eventType;
            events[editIdx].startTime = eventEd.startTime;
            events[editIdx].endTime = eventEd.endTime;
            console.log(events);
            return events;
        });
    },

    deleteEvent(id: string) {
        update(events => {
            let deleteIdx = events.findIndex(event => event.id == id);
            delete events[deleteIdx];
            events = events.filter(Boolean);
            console.log(events);
            return events;
        });
    }
};