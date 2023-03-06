<script>
  import AddCustomModeModal from './CustomTimerModal.svelte';

  const minutesToSeconds = (minutes) => minutes * 60;
  const secondsToMinutes = (seconds) => Math.floor(seconds / 60);
  const padWithZeroes = (number) => number.toString().padStart(2, '0');
  const State = {idle: 'idle', inProgress: 'in progress', shortResting: 'shortresting', longResting: 'longresting', customResting: 'customresting'};
  
  const POMODORO_S = minutesToSeconds(25);
  const LONG_BREAK_S = minutesToSeconds(20);
  const SHORT_BREAK_S = minutesToSeconds(5);
  let   CUSTOM_MODE_S;
  
  let currentState = State.idle;
  let pomodoroTime = POMODORO_S;
  // let longBreakTime = LONG_BREAK_S;
  // let shortBreakTime = SHORT_BREAK_S;
  let completedPomodoros = 0;
  let interval;
  let showModal = false;
  let customModes = [];
  
  function formatTime(timeInSeconds) { 
    const minutes = secondsToMinutes(timeInSeconds);
    const remainingSeconds = timeInSeconds % 60;
    return `${padWithZeroes(minutes)}:${padWithZeroes(remainingSeconds)}`;
  }

  function startPomodoro() { 
    setState(State.inProgress);
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

  function startCustomMode(min, sec) {
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
  
  function rest(time){
    if(time === SHORT_BREAK_S) {
      setState(State.shortResting);
    }
    else if(time === LONG_BREAK_S) {
      setState(State.longResting);
    }
    else {
      setState(State.customResting);
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
    // 
    if (currentState === State.shortResting){
      pomodoroTime = SHORT_BREAK_S;
    }
    else if (currentState === State.longResting){
      pomodoroTime = LONG_BREAK_S;
    }
    else if (currentState === State.customResting){
      pomodoroTime = CUSTOM_MODE_S;
    }
    else {
      pomodoroTime = POMODORO_S;
    }
    setState(State.idle);
    //pomodoroTime = pomodoroTime;
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
  <time>
    {formatTime(pomodoroTime)}
  </time>
  <footer>
    <button class="primary" on:click={startPomodoro} disabled={currentState !== State.idle}>start</button>
    <button class="primary" on:click={startShortBreak} disabled={currentState !== State.idle}>Short Break</button>
    <button class="primary" on:click={startLongBreak} disabled={currentState !== State.idle}>Long Break</button>
    <button on:click={cancelPomodoro} disabled={currentState === State.inProgress && currentState === State.resting}>cancel</button>
    {#each customModes as customMode}
      <div class="custom mode">
        <button class="primary" on:click={() => {
            startCustomMode(customMode.minutes, customMode.seconds);
          }} disabled={currentState !== State.idle}>
          {customMode.name}
        </button>
        <button on:click={() => {
            deleteCustomMode(customMode.id);
          }} disabled={currentState !== State.idle}>
          Delete
        </button>
      </div>
    {/each}
    <button class="primary" on:click={() => (showModal = true)} disabled={currentState !== State.idle}>+ Custom Mode</button>
    <AddCustomModeModal bind:showModal on:addCustomMode={addCustomMode} />
    <!--button on:click={completePomodoro}>complete</button-->
  </footer>
</section>
  