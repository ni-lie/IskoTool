import type { Event } from '../../types/event';

export function timeAscending(a: Event, b: Event){
    const dateA = new Date(a.startTime);
    const dateB = new Date(b.startTime);
    
    if (dateA < dateB) {
        return -1;
    }
    if (dateA > dateB) {
        return 1;
    }
    return 0;
}