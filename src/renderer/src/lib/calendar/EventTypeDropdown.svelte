<script lang="ts">
    export let select: string;
</script>

<select bind:value={select}>
    <option value="General">General</option>
    <option value="Birthday">Birthday</option>
    <option value="Appointment">Appointment</option>
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