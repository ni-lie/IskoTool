<script lang="ts">
    export let month: number;

	let select: HTMLSelectElement;
    function onChange() {
        month = select.selectedIndex;
    }
</script>

<select  bind:this={select} on:change={onChange}>
    <option>January</option>
    <option>February</option>
    <option>March</option>
	<option>April</option>
	<option>May</option>
	<option>June</option>
	<option>July</option>
	<option>August</option>
	<option>September</option>
	<option>October</option>
	<option>November</option>
	<option>December</option>
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