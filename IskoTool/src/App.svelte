<script>
  // Import routes
  import Router, {location, link} from 'svelte-spa-router';
  import Dashboard from './pages/Dashboard.svelte';
  import Pomodoro from './pages/PomodoroPage.svelte';
  import Notes from '.pages/Notes.svelte'; 

  const routes = {
    '/': Dashboard,
    '/pomodoro': Pomodoro,
  }
</script>

<main>
  <!-- Routes -->
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/#/pomodoro">Pomodoro</a></li>
    <!-- <li></li> -->
    <!-- <li></li> -->
    <!-- <li></li> -->
  </ul>

  <Router {routes} />
</main>

<!-- import Layout from './Layout.svelte'; -->

<!-- 
<nav>
  <button on:click={() => component = PomodoroTimer}>Pomodoro Timer</button>
  <button on:click={() => component = Notes}>Notes</button>
</nav> -->

<!-- <Layout>
  <svelte:component this={component} />
</Layout> -->

<style>
</style>