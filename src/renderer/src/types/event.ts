export interface Event {
    /** Name of the event. */
    name: string;
    eventType: string;
    /** Start date and time of the event. */
    startTime: string;
    /** End date and time of the event. */
    endTime: string;
    /** Unique ID assigned to this event. */
    id: string;
}