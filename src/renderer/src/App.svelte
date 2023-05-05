<script>
  // Import routes
  import Router, {location, link} from 'svelte-spa-router';
  import Dashboard from './pages/Dashboard.svelte';
  import Pomodoro from './pages/PomodoroPage.svelte';
  // import Notes from './pages/Notes.svelte'; // to remove.
  import Calendar from './pages/CalendarPage.svelte'
  import Planner from './pages/PlannerPage.svelte';
  import newNotes from './pages/newNotes.svelte';

  const routes = {
    '/': Dashboard,
    '/calendar': Calendar,
    '/planner': Planner,
    '/pomodoro': Pomodoro,
    // '/notes': Notes, // to remove.
    '/newNotes':newNotes
  }
  
</script>

<main>
  <nav>
    <button><a href="#/">Home</a></button>
    <button><a href="#/calendar">Calendar</a></button>
    <button><a href="#/planner">Week Planner</a></button>
    <button><a href="#/pomodoro">Pomodoro</a></button>
    <button><a href="#/newNotes">Notes</a></button>
    <!-- <button><a href="#/notes">Notes</a></button> --> <!-- to remove. --> 
  </nav>

  <Router {routes} />
</main>

<style>
  a {
    text-decoration: none;
  }

</style>