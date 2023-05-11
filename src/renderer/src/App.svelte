<script>
  // Import routes
  import Router, {location, link} from 'svelte-spa-router';
  import Dashboard from './pages/Dashboard.svelte';
  import Pomodoro from './pages/PomodoroPage.svelte';
  import Calendar from './pages/CalendarPage.svelte'
  import Planner from './pages/PlannerPage.svelte';
  import Notes from './pages/NotesPage.svelte';

  const routes = {
    '/': Dashboard,
    '/calendar': Calendar,
    '/planner': Planner,
    '/pomodoro': Pomodoro,
    '/notes':Notes,
  }
  
</script>

<main>
  <nav>
    <button><a href="#/">Home</a></button>
    <button><a href="#/calendar">Calendar</a></button>
    <button><a href="#/planner">Week Planner</a></button>
    <button><a href="#/pomodoro">Pomodoro</a></button>
    <button><a href="#/notes">Notes</a></button>
  </nav>

  <Router {routes} />
</main>

<style>
  a {
    text-decoration: none;
  }

</style>