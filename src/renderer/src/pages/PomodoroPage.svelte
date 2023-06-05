<script>
  import PomodoroTimer from '../lib/pomodoro/PomodoroTimer.svelte';
</script>

<main>
  <PomodoroTimer />
</main>

<style>
  main {
    height: 100vh;
  }

  .navbar { /*temp just so I can remove the scrollbar*/
    position: fixed;
    text-decoration: none;
    color: white;
  }
</style>
