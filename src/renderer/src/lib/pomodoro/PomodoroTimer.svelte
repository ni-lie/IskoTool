<script lang="ts">
  import { onMount } from 'svelte';

  import {loadCustomModes, setCustomModes} from '../helper-functions/LocalStorageAccess';
  import DialogBox from '../global-components/DialogBox.svelte';
  import CustomModeForm from './CustomModeForm.svelte';
  import ConfirmDelete from '../global-components/ConfirmDelete.svelte';
  import type { CustomMode } from '../../types/customtimer';

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

  let customModeDialog: HTMLDialogElement;
  
  let currentState = State.Idle;
  let baseDuration: number;
  let currentTime: number;

  $: switch ($mode) {
      case 0:
        baseDuration = pomodoroDuration;
        break;
      case 1:
        baseDuration = shortBreakDuration;
        break;
      case 2:
        baseDuration = longBreakDuration;
        break;
      default:
        throw new Error('unexpected state');
    }

  $: currentTime = baseDuration;
  
  let isCustom = false;
  let isBreakMode = false; 
  let completedPomodoros = 0;
  let countdown: number;

  let showModal = false;
  let customModes: CustomMode[] = [];
  let soundOptions = [
    {url: "https://freesound.org/data/previews/536/536420_4921277-lq.mp3", name: "Alarm clock"},
    {url: "https://www.myinstants.com/media/sounds/ding-sound-effect.mp3", name: "Bell ding"},
  ]
  let selectedaudio;
  let audio;

  $: console.log(audio);//

  onMount(() => {
    if ("pomodoroCustomModes" in localStorage)
      customModes = loadCustomModes();
  });

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
    if (currentState == State.Idle) {
      progbar.style.background = "conic-gradient(#ffffff 0deg, rgb(200, 200, 200, 0.4) 0deg)";
    }
    setState(State.InProgress);
    
    // Distinguish between modes.
    isBreakMode = false;
    mode.subscribe(value => {
        if (value == 1 || value == 2)
            isBreakMode = true;
        }
      );
    
    countdown = setInterval(() => {
      if (currentTime !== 0) {
        --currentTime;
        rot();
        return;
      }
      else if(currentTime === 0 ){
        progbar.style.background = "conic-gradient(#ffffff 0deg, rgb(200, 200, 200, 0.4) 0deg)";
        audio.play();
      }
      if (isCustom) idle();
      else if (isBreakMode) {
        mode.set(0);
        startPomodoro();
      }
      else completePomodoro();
    },1000);
  }

  function completePomodoro(){
    if (++completedPomodoros === 4) {
      mode.set(2);
      completedPomodoros = 0;
    }
    else
      mode.set(1);
    startPomodoro();
  }

  function cancelPomodoro() {
    idle();
    progbar.style.background = "conic-gradient(#ffffff 0deg, rgb(200, 200, 200, 0.4) 0deg)";
  }
  
  function idle(){
    currentTime = baseDuration;
    setState(State.Idle);
  }

  function pausePomodoro(){
    setState(State.Pause);
  }

  function addCustomMode(e) {
    customModeDialog.close();
    customModes.push(e.detail);
    customModes = customModes;
    setCustomModes(customModes);
  }

  function deleteCustomMode(id) {
    customModes = customModes.filter((customMode) => customMode.id != id);
    mode.set(0);
    baseDuration = pomodoroDuration;
    idle();
    setCustomModes(customModes);
  }

  function setCustomModeState(min: number, sec: number) {
    progbar.style.background = "conic-gradient(#ffffff 0deg, rgb(200, 200, 200, 0.4) 0deg)";
    baseDuration = minutesToSeconds(min) + sec; 
    isCustom = true;
  }

  function rot(){
    var currot = (baseDuration-currentTime)/baseDuration;
    progbar.style.background = "conic-gradient(#ffffff calc(" + currot + " *360deg), rgb(200, 200, 200, 0.4) 0deg)";
  }
</script>

<section>
  <div class = "whole">
    <div class = "timer-class">
      <div class="prog" id="prog">  
        <div class="timer">
          <time class="actual-time">
            {formatTime(currentTime)}
          </time>
        </div>
      </div>
      <button class="time-start" 
        on:click={startPomodoro} disabled={currentState === State.InProgress}>
        Start
      </button>
      <span class="start-div">
        <button on:click={pausePomodoro} disabled={currentState !== State.InProgress}>Pause</button>
        <button on:click={cancelPomodoro} disabled={currentState !== State.InProgress}>Cancel</button>
      </span>
    </div>
    <div class="button-class">
      <p class = "choice-prompt">Choose a mode:</p>
      <!-- USING THE DROPDOWN -->
      <Dropdown isUnselectable={currentState === State.InProgress}/>
      <!--  -->
      {#each customModes as customMode}
        <div class="custom-mode-select">
          <button 
            on:click={() => setCustomModeState(customMode.minutes, customMode.seconds)} 
            disabled={currentState === State.InProgress || currentState === State.Pause} 
          >
            {customMode.name}
          </button>
          <ConfirmDelete let:confirm="{confirmDeleteMode}">
              <button class="danger-action" 
                on:click={() => confirmDeleteMode(deleteCustomMode, customMode.id)} 
                disabled={currentState === State.InProgress || currentState === State.Pause}
              >
              Delete
            </button>
          </ConfirmDelete>
        </div>
      {/each}
      <button class="fadedtext" on:click={() => (showModal = true)} disabled={currentState === State.InProgress || currentState === State.Pause}>+ Custom Mode</button>
      <DialogBox bind:showModal bind:dialog={customModeDialog}>
        <h2 slot="header" class="pop-up">Create Custom Timer</h2>
        <CustomModeForm slot="contents" on:addCustomMode={addCustomMode} />
      </DialogBox>

      <select bind:value={selectedaudio}>
        <option style="color:grey" value="">Choose an alarm sound...</option>
        {#each soundOptions as sound}
          <option value={sound}>
            {sound.name}
          </option>
        {/each}
      </select>

    </div>
  </div>
  <script type="text/javascript" defer>
    var progbar = document.getElementById("prog");
  </script>
</section>

<!-- <audio src={audio ? audio.url : ''} bind:this={audio}></audio> -->
<audio src="{selectedaudio ? selectedaudio.url : ''}" bind:this={audio}></audio>


<style>
  section {
    background-color: var(--evergreen-dark);
    padding: 1rem;
    display: flex;
    justify-content: center;
    min-height: 100%;
  }

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
    margin: 0rem;
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
    color: white;
    top: 50%;
    position: relative;
    transform: translateY(-50%);
  }

  button {
    text-align: center;
    color: white;
    font-family: 'Space Grotesk';
    font-size: 28px;
    font-weight: bold;
    width: 250px;
    padding: 12px 0px;
    margin: 20px;
    border-radius: 30px;
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

  .whole {
    display: inline-flex;
    flex-direction: row;
    flex-wrap: wrap-reverse;
    margin: auto;
    width: clamp(600px, 100%, 1200px);
    align-items: flex-end;
    justify-content: center;
  }

  .whole > *{
    width: 50%;
    min-width: 600px;
  }

  .timer-class {
    order: 2;
    
  }

  .timer-class > *:not(.prog) {
    display: block;
  }


  .button-class {
    width: 100%;
    max-width: 600px;
    margin-top: 4%;
  }
  
  .button-class button {
    display: block;
  }

  .choice-prompt {
    color: var(--evergreen-faded);
    margin: 0px 20px;
    font-family: 'Space Grotesk';
    font-size: 21px;
  }

  .start-div > * {
    margin-top: 0px;;
  }

  .start-div > *:first-child {
    margin-right: 0px;
  }

  .custom-mode-select {
    display: inline-flex;
    margin-block-start: -20px;
  }

  .custom-mode-select > *:first-child {
    margin-right: 0px;
  }

</style>
