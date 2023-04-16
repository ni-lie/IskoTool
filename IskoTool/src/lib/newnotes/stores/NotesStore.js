import { writable } from "svelte/store";

const NotesStore = writable([
    { title: 'first note', noteContent: 'this is the first note', id: 1 },
    { title: 'second note', noteContent: 'this is the second note', id: 2 },
    { title: 'third note', noteContent: 'this is the third note', id: 3 }
]);

export default NotesStore;