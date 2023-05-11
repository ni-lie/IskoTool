import { writable, get } from "svelte/store";

// Load the initial notes from local storage, or use a default value
const initialNotes = JSON.parse(localStorage.getItem("notes")) || [
    { title: 'first note', noteContent: 'this is the first note', id: 1, pinned: false },
];

// Create a writable store with the initial notes
const NotesStore = writable(initialNotes);

// Subscribe to changes in the store and save them to local storage
NotesStore.subscribe(notes => {
    localStorage.setItem("notes", JSON.stringify(notes));
});

export default NotesStore;