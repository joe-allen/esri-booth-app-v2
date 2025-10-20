<script>
	let { handleSearchInput } = $props();
</script>

<header>
	<a href="/" class="flex items-center gap-3">
		<img src="/esri-logo.png" alt="Esri Logo" class="w-32 cursor-pointer" />
		<h1 class="text-3xl font-light mt-[8px] text-white">DEMOS</h1>
	</a>
	<!-- <calcite-input oncalciteInputInput={handleSearchInput} placeholder="Search conferences"
	></calcite-input> -->

	<section class="ml-auto">
		<calcite-button
			icon-start="search"
			width="auto"
			appearance="transparent"
			round
			kind="inverse"
			label="Search"
			aria-label="Search"
		></calcite-button>
		<!-- <calcite-button
			icon-start="dock-right"
			width="auto"
			appearance="transparent"
			round
			kind="inverse"
			label="Dock right"
			aria-label="Dock right"
		></calcite-button> -->
	</section>
</header>

<style>
	header {
		position: fixed;
		inset: 0;
		display: grid;
		grid-area: header;
		align-items: center;
		grid-template-columns: clamp(250px, 15vw, 500px) 1fr;
		grid-template-rows: var(--app-header-height);
		gap: calc(4rem - 8px);
		padding-inline: calc(4rem - 8px);
	}
</style>
