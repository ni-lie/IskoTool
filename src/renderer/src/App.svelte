<script>
  // Import routes
  import Router, { location } from 'svelte-spa-router';
  import Dashboard from './pages/Dashboard.svelte';
  import Pomodoro from './pages/PomodoroPage.svelte';
  import Calendar from './pages/CalendarPage.svelte'
  import Planner from './pages/PlannerPage.svelte';
  import Notes from './pages/NotesPage.svelte';
  import TodoPage from './pages/TodoPage.svelte';
  import Logo from '../src/images/IskoTool-Logo.png'
  import BackToDashboard from './lib/global-components/BackToDashboard.svelte';

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
  {#if $location === "/pomodoro"}
    <a href="#/" class="abs"><BackToDashboard/></a>
  {:else if $location !== "/"}
    <a href="#/"><BackToDashboard/></a>
  {:else}
    <img src={Logo} alt="IskoTool logo">
  {/if}
  <Router {routes} />
</main>

<style>
  img {
    width: 2.5rem;
    height: 2.5rem;
    padding-top: 0.75rem;
    padding-left: 0.75rem;
  }

  a.abs {
    position: absolute;
    z-index: 1;
  }
</style>
