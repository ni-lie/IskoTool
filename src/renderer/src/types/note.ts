export interface Note {
    /** Unique ID assigned to this note. */
    title: string;
    noteContent: string;
    id: string;
    pinned: boolean;
}