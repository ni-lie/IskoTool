<script lang="ts">
    import { choice } from './PomodoroModeChoice';

    let select: HTMLSelectElement;
    function onChange() {
        choice.set(select.selectedIndex);
    }

</script>

<select bind:this={select} on:change={onChange}>
    <option>Pomodoro</option>
    <option>Short Break</option>
    <option>Long Break</option>
    <!-- custom mode choice -->
</select>