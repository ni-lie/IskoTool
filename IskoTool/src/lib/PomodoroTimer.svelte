<script lang="ts">
  import AddCustomModeModal from './CustomTimerModal.svelte';

  import type { CustomMode } from '../types/event';

  enum State {
    Idle = 'idle',
    InProgress = 'in progress',
    Resting = 'resting',
    ShortResting = 'shortresting',
    LongResting = 'longresting',
    CustomResting = 'customresting',
  }

  const minutesToSeconds = (minutes: number) => minutes * 60;
  const secondsToMinutes = (seconds: number) => Math.floor(seconds / 60);
  const padWithZeroes = (number: number) => number.toString().padStart(2, '0');

  const POMODORO_S = minutesToSeconds(25);
  const LONG_BREAK_S = minutesToSeconds(20);
  const SHORT_BREAK_S = minutesToSeconds(5);
  let   CUSTOM_MODE_S: number;
  
  let currentState = State.Idle;
  let pomodoroTime = POMODORO_S;
  let completedPomodoros = 0;

  let interval: number;

  let showModal = false;
  let customModes: CustomMode[] = [];
  
  function formatTime(timeInSeconds: number) { 
    const minutes = secondsToMinutes(timeInSeconds);
    const remainingSeconds = timeInSeconds % 60;
    return `${padWithZeroes(minutes)}:${padWithZeroes(remainingSeconds)}`;
  }

  function startPomodoro() { 
    setState(State.InProgress);
    interval = setInterval(() => {
      if (pomodoroTime === 0) {
        completePomodoro();
      }
      pomodoroTime -= 1;
    },1000);
  }

  function startShortBreak() { 
    rest(SHORT_BREAK_S);
  }
  
  function startLongBreak(){
    rest(LONG_BREAK_S);
  }

  function startCustomMode(min: number, sec: number) {
    CUSTOM_MODE_S = minutesToSeconds(min) + sec;
    rest(CUSTOM_MODE_S);
  }

  function setState(newState){
    clearInterval(interval)
    currentState = newState;
  }

  function completePomodoro(){
    completedPomodoros++;
    if (completedPomodoros === 4) {
      rest(LONG_BREAK_S);
      completedPomodoros = 0;
    } else {
      rest(SHORT_BREAK_S);
    }
  }
  
  function rest(time: number){
    switch (time) {
      case SHORT_BREAK_S:
        setState(State.ShortResting);
        break;
      case LONG_BREAK_S:
        setState(State.LongResting);
        break;
      default:
        setState(State.CustomResting);
    }
    pomodoroTime = time;
    interval = setInterval(() => {
      if (pomodoroTime === 0) {
        idle();
      }
      pomodoroTime -= 1;
    },1000);
  }

  function cancelPomodoro() {
    // TODO: Add some logic to prompt the user to write down
    // the cause of the interruption.
    idle();
  }

  function idle(){
    switch (currentState) {
      case State.ShortResting:
        pomodoroTime = SHORT_BREAK_S;
        break;
      case State.LongResting:
        pomodoroTime = LONG_BREAK_S;
        break;
      case State.CustomResting:
        pomodoroTime = CUSTOM_MODE_S;
        break;
      default:
        pomodoroTime = POMODORO_S;
    }
    setState(State.Idle);
  }

  function addCustomMode(e) {
    const customMode = e.detail;
    console.log(e.detail)
    customModes = [...customModes, customMode];
  }

  function deleteCustomMode(id) {
    customModes = customModes.filter((customMode) => customMode.id != id);
    pomodoroTime = POMODORO_S;
  }
</script>
  
<style>
  time {
    display: block;
    font-size: 5em;
    margin-bottom: 0.2em;
  }
</style>

<section>
  <div class="prog">  
    <div class="timer">
      <time class="actual-time">
        {formatTime(pomodoroTime)}
      </time>
    </div>
  </div>
  <footer>
    <div class="button-class">
      <button class="primary time-start" on:click={startPomodoro} disabled={currentState !== State.Idle}>start</button>
      <button class="primary" on:click={startShortBreak} disabled={currentState !== State.Idle}>Short Break</button>
      <button class="primary" on:click={startLongBreak} disabled={currentState !== State.Idle}>Long Break</button>
      <button on:click={cancelPomodoro} disabled={currentState === State.InProgress && currentState === State.Resting}>cancel</button>
      {#each customModes as customMode}
        <div class="custom mode">
          <button class="primary" on:click={() => {
              startCustomMode(customMode.minutes, customMode.seconds);
            }} disabled={currentState !== State.Idle}>
            {customMode.name}
          </button>
          <button on:click={() => {
              deleteCustomMode(customMode.id);
            }} disabled={currentState !== State.Idle}>
            Delete
          </button>
        </div>
      {/each}
      <button class="primary extra-time" on:click={() => (showModal = true)} disabled={currentState !== State.Idle}>+ Custom Mode</button>
      <AddCustomModeModal bind:showModal on:addCustomMode={addCustomMode} />
    </div>
    <!--button on:click={completePomodoro}>complete</button-->
  </footer>
</section>
  