import { writable } from "svelte/store";
import type { Note } from '../../../types/note'
import { loadNotes, setNotes } from '../../helper-functions/LocalStorageAccess';

let sampleNote: Note = {
    title: 'first note',
    noteContent: 'this is the first note',
    id: '0',
    pinned: false
}

// Load the initial notes from local storage, or use a default value
const initialNotes: Note[] = loadNotes() ||
[sampleNote];

// Create a writable store with the initial notes
const NotesStore = writable(initialNotes);

// Subscribe to changes in the store and save them to local storage
NotesStore.subscribe(notes => {
    setNotes(notes);
});

export default NotesStore;