<script>
  import PomodoroTimer from '../lib/pomodoro/PomodoroTimer.svelte';
</script>

<main>
  <a class="navbar" href="#/">Back to Dashboard</a>
  <PomodoroTimer />
</main>

<style>
  main {
    height: 100%;
  }

  .navbar { /*temp just so I can remove the scrollbar*/
    position: fixed;
    text-decoration: none;
    color: white;
  }
</style>
