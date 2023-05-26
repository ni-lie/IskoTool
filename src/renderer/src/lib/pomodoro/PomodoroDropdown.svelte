<script lang="ts">
    import { mode } from './PomodoroModeChoice';

    export let isUnselectable = false;

    let select: HTMLSelectElement;
    function onChange() {
        mode.set(select.selectedIndex);
    }
</script>

<select bind:this={select} on:change={onChange} disabled={isUnselectable}>
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
    font-size: 28px;
    font-weight: bold;
    width: 250px;
    padding: 12px 0px;
    margin: 20px 20px 20px 20px;
    border-radius: 30px;
    border-width: 3px;
    border-style: solid;
    border-color: white;
    background-color: white;
  }

</style>