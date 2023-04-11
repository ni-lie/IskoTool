<script lang="ts">
    import { mode } from './PomodoroModeChoice';

    let select: HTMLSelectElement;
    function onChange() {
        mode.set(select.selectedIndex);
    }
</script>

<select bind:this={select} on:change={onChange}>
    <option>Pomodoro</option>
    <option>Short Break</option>
    <option>Long Break</option>
    <!-- custom mode choice -->
</select>

<style>
select {
    appearance: none;
    text-align: center;
    color: var(--evergreen-dark);
    font-family: 'Space Grotesk';
    font-size: 20px;
    font-weight: bold;
    width: 180px;
    padding: 7px 0px;
    margin: 20px 20px 20px 2rem;
    border-radius: 24px;
    border-width: 3px;
    border-style: solid;
    border-color: white;
    background-color: white;
  }

</style>