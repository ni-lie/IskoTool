<script>
    import { push } from 'svelte-spa-router';
    import DateTimeDisplay from '../lib/dashboard/DashboardDateTimeDisplay.svelte';
    import DailyEventsDisplay from '../lib/dashboard/DailyEventsDisplay.svelte';
    import MonthlyEventsDisplay from '../lib/dashboard/MonthlyEventsDisplay.svelte';
    import Button from '../lib/global-components/Button.svelte';

    import Tomato from '../../src/images/Tomato.png';
    import Notes from '../../src/images/Notesheet.png';
</script>
  
<main>
    <section>
        <DateTimeDisplay />
        <div class="display-box">
            <DailyEventsDisplay />
            <div class="vertical-line"></div>
            <div style="width: 50%;">
                <MonthlyEventsDisplay />
                <div class="button-group">
                    <Button type="primary" on:click={() => push("#/pomodoro")}>
                        <span>
                            <img class="icon" src={Tomato} alt="Pomodoro icon"/>
                            <t class="longbutton">Start a Pomodoro session</t>
                        </span>
                    </Button>
                    <Button type="primary" on:click={() => push("#/notes")}>
                        <span>
                            <img class="icon" src={Notes} alt="Note icon"/>
                            <t class="longbutton">View your notes</t>
                        </span>
                    </Button>
                    <Button type="primary" on:click={() => push("#/todo")}>
                        <span>
                            <t class="longbutton">To do list</t>
                        </span>
                    </Button>
                </div>
            </div>
        </div>
    </section>
</main>
  
<style>
    .display-box {
        display: flex;
        margin: 0px;
        justify-content: space-evenly;
        /* max-height: 30rem; */
    }

    .vertical-line {
        border-left: 2px solid #d7d7d7;
    }

    .button-group {
        margin: 2em;
        height: 7em;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
    }

    .longbutton {
        padding: 0.5rem 1rem;
        font-size: 17px;
        width: 13em;
        text-align: left;
    }

    span {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    img {
        height: 28px;
        widows: 28px;
    }

</style>