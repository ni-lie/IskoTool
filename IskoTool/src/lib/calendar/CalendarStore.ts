import { writable } from 'svelte/store';
import type { Event } from '../../types/event';

/** Notes are now stored in an array instead of a dictionary (more efficient lookup).*/  
const { set, update, subscribe } = writable([] as Event[]);

export const eventStore  = {
	subscribe,
	set,
	addEvent(name: string, eventType: string, startTime: string, endTime: string, id: string) {
		update(events => {
			events.push({name, eventType, startTime, endTime, id});
			return events;
		});
    },

    saveEvent(event: Event) {
        update(events => {
            events[event.id].name = event.name;
            events[event.id].eventType = event.eventType;
            events[event.id].startTime = event.startTime;
            events[event.id].endTime = event.endTime;
            return events;
        });
    },

    deleteEvent(id: string) {
        update(events => {
            let deleteIdx = events.findIndex(event => event.id == id);
            delete events[deleteIdx];
            events = events.filter(Boolean);
            return events;
        });
    }
};