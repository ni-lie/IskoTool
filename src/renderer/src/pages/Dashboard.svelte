<script>
    import DateTimeDisplay from '../lib/dashboard/DashboardDateTimeDisplay.svelte'
    import DailyEventsDisplay from '../lib/dashboard/DailyEventsDisplay.svelte';
    import MonthlyEventsDisplay from '../lib/dashboard/MonthlyEventsDisplay.svelte';
</script>
  
<main>
    <section>
        <DateTimeDisplay />
        <div class="display-box">
            <DailyEventsDisplay />
            <MonthlyEventsDisplay />
        </div>
        <div class="button-group">
            <a href="#/pomodoro">Start a Pomodoro session</a>
            <a href="#/notes">View your notes</a>
        </div>
    </section>
</main>
  
<style>
    .display-box {
        display: flex;
        margin: 0px;
        justify-content: space-evenly;
        max-height: 30rem;
    }

    .button-group {
        margin: 2em 5em 0 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        float: right;
    }

    a {
    text-align: center;
    background-color: var(--evergreen-dark);
    color: white;
    font-family: 'Rubik';
    font-weight: bold;
    width: 250px;
    padding: 12px 0px;
    margin: 4px;
    border-radius: 12px;
    }

</style>