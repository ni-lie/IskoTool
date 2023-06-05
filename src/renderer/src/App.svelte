<script>
  // Import routes
  import Router, { location } from 'svelte-spa-router';
  import Dashboard from './pages/Dashboard.svelte';
  import Pomodoro from './pages/PomodoroPage.svelte';
  import Calendar from './pages/CalendarPage.svelte'
  import Planner from './pages/PlannerPage.svelte';
  import Notes from './pages/NotesPage.svelte';
  import TodoPage from './pages/TodoPage.svelte';

  const routes = {
    '/': Dashboard,
    '/calendar': Calendar,
    '/planner': Planner,
    '/pomodoro': Pomodoro,
    '/notes':Notes,
    '/todo':TodoPage,
  }
  
</script>

<main>
  {#if $location != "/"}
    <a href="#/">Back to Dashboard</a>
  {/if}
  <Router {routes} />
</main>
