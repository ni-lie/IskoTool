<main>
  <header>
  </header>
	<section>
    <slot></slot>
	</section>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
    	height: 100vh;
	}
	
	section {
    	flex-grow: 1;
	}
</style>