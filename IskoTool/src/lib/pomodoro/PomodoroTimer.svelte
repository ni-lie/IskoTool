<script lang="ts">
  import AddCustomModeModal from './CustomTimerModal.svelte';
  import type { CustomMode } from '../types/event';

  import { mode } from './PomodoroModeChoice';
  import Dropdown from './PomodoroDropdown.svelte';

  enum State {
    Idle = 'idle',
    InProgress = 'in progress',
    Pause = 'pause',
  }

  const minutesToSeconds = (minutes: number) => minutes * 60;
  const secondsToMinutes = (seconds: number) => Math.floor(seconds / 60);
  const padWithZeroes = (number: number) => number.toString().padStart(2, '0');

  const pomodoroDuration = minutesToSeconds(25);
  const shortBreakDuration = minutesToSeconds(5); 
  const longBreakDuration = minutesToSeconds(20);
  
  let currentState = State.Idle;
  let baseDuration: number;
  let currentTime: number;
  mode.subscribe(value => {
      switch(value) {
        case 0:
          baseDuration = pomodoroDuration;
          break;
        case 1:
          baseDuration = shortBreakDuration;
          break;
        case 2:
          baseDuration = longBreakDuration;
          break;
      }
    });
  $: currentTime = baseDuration;
  
  let isCustom = false;
  let isBreakMode = false; 
  let completedPomodoros = 0;
  let countdown: number;

  let showModal = false;
  let customModes: CustomMode[] = [];
  
  function formatTime(timeInSeconds: number) { 
    const minutes = secondsToMinutes(timeInSeconds);
    const remainingSeconds = timeInSeconds % 60;
    return `${padWithZeroes(minutes)}:${padWithZeroes(remainingSeconds)}`;
  }

  function setState(newState: State){
    clearInterval(countdown);
    currentState = newState;
  }

  function startPomodoro() {
    if (currentState != State.Pause)
      currentTime = baseDuration;
    setState(State.InProgress);
    
    // Distinguish between modes.
    isBreakMode = false;
    mode.subscribe(value => {
        if (value == 1 || value == 2)
            isBreakMode = true;
        }
      );
    
    countdown = setInterval(() => {
      if (currentTime == 0) {
        if (isCustom)
          idle();
        else if (isBreakMode) {
          mode.set(0);
          startPomodoro();
        }
        else
          completePomodoro();
      }
      else
        currentTime -= 1;
    },1000);
  }

  function completePomodoro(){
    completedPomodoros++;
    if (completedPomodoros === 4) {
      mode.set(2);
      completedPomodoros = 0;
    }
    else
      mode.set(1);
    startPomodoro();
  }

  function cancelPomodoro() {
    idle();
  }
  
  function idle(){
    currentTime = baseDuration;
    setState(State.Idle);
  }

  function pausePomodoro(){
    setState(State.Pause);
  }

  function addCustomMode(e) {
    const customMode = e.detail;
    customModes = [...customModes, customMode];
  }

  function deleteCustomMode(id) {
    customModes = customModes.filter((customMode) => customMode.id != id);
    mode.set(0);
    baseDuration = minutesToSeconds(25);
    idle();
  }

  function setCustomModeState(min: number, sec: number) {
    baseDuration = minutesToSeconds(min) + sec; 
    isCustom = true;
  }
</script>

<section>
  <div class="prog">  
    <div class="timer">
      <time class="actual-time">
        {formatTime(currentTime)}
      </time>
    </div>
  </div>
    <div class="button-class">
      <button class="time-start" 
        on:click={startPomodoro} disabled={currentState === State.InProgress}>
        Start
      </button>
      <button on:click={pausePomodoro} disabled={currentState !== State.InProgress}>Pause</button>
      <!-- <button on:click={() => {setState(State.Pomodoro, pomodoroDuration)}} disabled={currentState === State.InProgress || currentState === State.Rest || currentState === State.Pause}>Pomodoro</button>
      <button on:click={() => {setState(State.ShortResting, shortBreakDuration)}} disabled={currentState === State.InProgress || currentState === State.Rest || currentState === State.Pause}>Short Break</button>
      <button on:click={() => {setState(State.LongResting, longBreakDuration)}} disabled={currentState === State.InProgress || currentState === State.Rest || currentState === State.Pause}>Long Break</button> -->
      <!-- USING THE DROPDOWN -->
      <Dropdown />
      <output>{$mode}</output>
      <!--  -->
      <button on:click={cancelPomodoro} disabled={currentState !== State.InProgress}>Cancel</button>
      {#each customModes as customMode}
        <div class="custom-mode-select">
          <button 
            on:click={() => setCustomModeState(customMode.minutes, customMode.seconds)} 
            disabled={currentState === State.InProgress || currentState === State.Pause} 
          >
            {customMode.name}
          </button>
          <button class="danger-action" 
            on:click={() => deleteCustomMode(customMode.id)} 
            disabled={currentState === State.InProgress || currentState === State.Pause}
          >
            Delete
          </button>
        </div>
      {/each}
      <button class="fadedtext" on:click={() => (showModal = true)} disabled={currentState === State.InProgress || currentState === State.Pause}>+ Custom Mode</button>
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