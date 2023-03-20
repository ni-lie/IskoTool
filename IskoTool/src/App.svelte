<script>
  let title = "POMODORO";
  import PomodoroTimer from './lib/PomodoroTimer.svelte';

  import Layout from './Layout.svelte';
	import Notes from './Notes.svelte';

  let component = PomodoroTimer;

</script>

<nav>
  <button on:click={() => component = PomodoroTimer}>Pomodoro Timer</button>
  <button on:click={() => component = Notes}>Notes</button>
</nav>

<Layout>
  <svelte:component this={component} />
</Layout>

<style>

</style>