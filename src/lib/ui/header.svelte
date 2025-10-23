<script>
	import { page } from '$app/state';
	import { showDemoDetails } from '$lib/state.svelte';
	let { handleSearchInput } = $props();
</script>

<header>
	<a href="/" class="flex items-center gap-3">
		<img src="/esri-logo.png" alt="Esri Logo" class="w-32 cursor-pointer" />
		<h1 class="mt-[8px] text-3xl font-light text-white">DEMOS</h1>
	</a>

	<!-- <calcite-input oncalciteInputInput={handleSearchInput} placeholder="Search conferences"
	></calcite-input> -->

	<section class="w-full">
		<div class="flex w-full items-center gap-4">
			{#if !showDemoDetails.hide && page.data.engagement}
				<div
					class={`pointer-events-none flex gap-2 ${page.data.engagement.id === page.params.slug ? '' : 'hidden'}`}
				>
					<div class="mt-4 flex flex-wrap items-center gap-4">
						<div class="text-xl font-bold text-white">{showDemoDetails.title}</div>
						<div class="flex flex-wrap gap-1">
							{#each showDemoDetails.tags as tag}
								<a class="pointer-events-auto cursor-pointer" href={`/tags/${tag.slug}`}>
									<calcite-chip
										class="flex cursor-pointer items-center text-xs"
										kind="neutral"
										appearance="outline"
										value="calcite chip"
										scale="s"><span class="text-white">{tag.title}</span></calcite-chip
									>
								</a>
							{/each}
						</div>
					</div>
				</div>
			{/if}
			<div class="ml-auto">
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
			</div>
		</div>
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
