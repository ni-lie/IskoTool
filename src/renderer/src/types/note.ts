export interface Note {
    /** Unique ID assigned to this note. */
    title: string;
    noteContent: string;
    id: number;
    pinned: boolean;
}