<script>
  // Import routes
  import Router from 'svelte-spa-router';
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

<main class="mainapp">
  <Router {routes} />
</main>

<style>
  * {
    box-sizing: border-box;
  }
  .mainapp {
    height: 100%;
  }
</style>