<script>
  // Import routes
  import Router, {location, link} from 'svelte-spa-router';
  import Dashboard from './pages/Dashboard.svelte';
  import Pomodoro from './pages/PomodoroPage.svelte';
  import Notes from './pages/Notes.svelte'; 

  const routes = {
    '/': Dashboard,
    '/pomodoro': Pomodoro,
    '/notes': Notes
  }
  
</script>

<main>
  <nav>
    <button><a href="/">Home</a></button>
    <button><a href="#/pomodoro">Pomodoro</a></button>
    <button><a href="#/notes">Notes</a></button>
  </nav>

  <Router {routes} />
</main>

<style>
  a {
    text-decoration: none;
    color: black;
  }
</style>