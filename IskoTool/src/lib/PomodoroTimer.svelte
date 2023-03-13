<script lang="ts">
  import AddCustomModeModal from './CustomTimerModal.svelte';

  import type { CustomMode } from '../types/event';

  enum State {
    Idle = 'idle',
    InProgress = 'in progress',
    Pomodoro = 'pomodoro',
    ShortResting = 'shortresting',
    LongResting = 'longresting',
    CustomMode = 'custommode'
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
    const previousState = currentState;
    setState(State.InProgress, pomodoroTime);
    interval = setInterval(() => {
      if (pomodoroTime === 0 && previousState === State.Pomodoro)
        completePomodoro();
      else if (pomodoroTime === 0)
        idle(previousState);
      else
        pomodoroTime -= 1;
    },1000);
  }

  function startShortBreak() { 
    rest(SHORT_BREAK_S);
  }
  
  function startLongBreak(){
    rest(LONG_BREAK_S);
  }

  function setCustomModeState(min: number, sec: number) {
    CUSTOM_MODE_S = minutesToSeconds(min) + sec;
    setState(State.CustomMode, CUSTOM_MODE_S);
  }

  function setState(newState, time: number){
    clearInterval(interval);
    currentState = newState;
    pomodoroTime = time;
  }

  function completePomodoro(){
    completedPomodoros++;
    if (completedPomodoros === 4) {
      setState(State.LongResting, LONG_BREAK_S);
      startPomodoro();
      completedPomodoros = 0;
    } else {
      setState(State.ShortResting, SHORT_BREAK_S);
      startPomodoro();
    }
  }
  
  function rest(time: number){
    switch (time) {
      case SHORT_BREAK_S:
        setState(State.ShortResting, SHORT_BREAK_S);
        break;
      case LONG_BREAK_S:
        setState(State.LongResting, LONG_BREAK_S);
        break;
      default:
        setState(State.CustomMode, CUSTOM_MODE_S);
    }
    interval = setInterval(() => {
      if (pomodoroTime === 0) {
        idle();
      }
      else
        pomodoroTime -= 1;
    },1000);
  }

  function cancelPomodoro() {
    idle();
  }

  function idle(prevState){
    switch (prevState) {
      case State.ShortResting:
        setState(State.Idle, SHORT_BREAK_S);
        break;
      case State.LongResting:
        setState(State.Idle, LONG_BREAK_S);
        break;
      case State.CustomMode:
        setState(State.Idle, CUSTOM_MODE_S);
        break;
      default:
        setState(State.Idle, POMODORO_S);
    }
  }

  function addCustomMode(e) {
    const customMode = e.detail;
    customModes = [...customModes, customMode];
  }

  function deleteCustomMode(id) {
    customModes = customModes.filter((customMode) => customMode.id != id);
    setState(State.Idle, POMODORO_S);
  }
</script>
  


<section>
  <div class="prog">  
    <div class="timer">
      <time class="actual-time">
        {formatTime(pomodoroTime)}
      </time>
    </div>
  </div>
    <div class="button-class">
      <button class="time-start" on:click={startPomodoro} disabled={currentState === State.InProgress}>Start</button>
      <button on:click={() => {setState(State.Pomodoro, POMODORO_S)}} disabled={currentState === State.InProgress}>Pomodoro</button>
      <button on:click={() => {setState(State.ShortResting, SHORT_BREAK_S)}} disabled={currentState === State.InProgress}>Short Break</button>
      <button on:click={() => {setState(State.LongResting, LONG_BREAK_S)}} disabled={currentState === State.InProgress}>Long Break</button>
      <button on:click={cancelPomodoro} disabled={currentState !== State.InProgress}>Cancel</button>
      {#each customModes as customMode}
        <div class="custom-mode-select">
          <button on:click={() => {
              setCustomModeState(customMode.minutes, customMode.seconds);
            }} disabled={currentState === State.InProgress}>
            {customMode.name}
          </button>
          <button class="danger-action" on:click={() => {
              deleteCustomMode(customMode.id);
            }} disabled={currentState === State.InProgress}>
            Delete
          </button>
        </div>
      {/each}
      <button class="fadedtext" on:click={() => (showModal = true)} disabled={currentState === State.InProgress}>+ Custom Mode</button>
      <AddCustomModeModal bind:showModal on:addCustomMode={addCustomMode} />
    </div>
</section>

<style>
  time {
    display: block;
    font-size: 5em;
    margin-bottom: 0.2em;
  }

  .prog {
    border-radius: 50%;
    background: conic-gradient(#ffffff 0deg, rgb(200, 200, 200, 0.4) 0deg);
    width: 300px;
    height: 300px;
    align-items: center;
    text-align: center;
    margin: 25px 0px;
  }

  .timer {
    height: 290px;
    width: 290px;
    border-radius: 50%;
    background-color: var(--evergreen-dark);
    top: 50%;
    position: relative;
    transform: translateY(-50%);
    margin: auto;
  }

  .actual-time {
    font-family: 'Space Grotesk';
    font-weight: bold;
    top: 50%;
    position: relative;
    transform: translateY(-50%);
  }

  button {
    text-align: center;
    color: white;
    font-family: 'Space Grotesk';
    font-size: 20px;
    font-weight: bold;
    width: 180px;
    padding: 7px 0px;
    margin: 20px;
    border-radius: 24px;
    border-width: 3px;
    border-style: solid;
    border-color: white;
    background-color: transparent;
  }

  button:disabled {
    border-color: var(--evergreen-faded);
    color: var(--evergreen-faded);
    background-color: transparent;
  }

  .time-start {
    background-color: var(--orange-light);
    border-color: var(--orange-light);
  
    transition: background 0.25s ease-in-out, border 0.25s ease-in-out;
  }

  .time-start:hover {
    background: var(--orange-faded);
    border-color: var(--orange-faded);
  }

  .danger-action {
    background-color: rgb(231, 67, 67);
    border-color: rgb(231, 67, 67);
  }
  
  .button-class button {
    display: block;
  }

  .custom-mode-select {
    display: inline-flex;
    margin-block-start: -20px;
  }

</style>