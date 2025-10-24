<script>
	// svelte
	import { page } from '$app/state';
	import { fade } from 'svelte/transition';

	// state
	import { showDemoDetails } from '$lib/state.svelte';

	let { handleSearchInput } = $props();
	let showSearchInput = $state(false);
</script>

<header>
	<a href="/" class="flex items-center gap-3">
		<img src="/assets/esri-logo.png" alt="Esri Logo" class="w-32 cursor-pointer" />
		<h1 class="mt-[8px] text-3xl font-light text-white">DEMOS</h1>
	</a>

	<!-- <calcite-input oncalciteInputInput={handleSearchInput} placeholder="Search conferences"
	></calcite-input> -->

	<section class="w-full">
		<div class="relative flex w-full items-center gap-4">
			<div class="e-header__transition-container">
				{#if showSearchInput}
					<div
						in:fade={{ duration: 200 }}
						class={`e-header__search-wrapper h-12 w-full border border-b-1 border-transparent border-b-white ${showSearchInput ? 'active' : ''}`}
					></div>
				{:else if !showDemoDetails.hide && page.data.engagement && !showSearchInput}
					<div
						in:fade={{ duration: 200 }}
						class={`pointer-events-none flex items-center gap-2 ${page.data.engagement.id === page.params.slug ? '' : 'hidden'}`}
					>
						<div class="e-header__details-divider"></div>
						<div class=" flex flex-wrap items-center gap-4">
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
			</div>
			<div class="ml-auto">
				<!-- svelte-ignore a11y_no_static_element_interactions, a11y_click_events_have_key_events -->
				<calcite-button
					onclick={() => {
						showSearchInput = !showSearchInput;
					}}
					icon-start={`${showSearchInput ? 'x' : 'search'}`}
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

	.e-header__details-divider {
		position: absolute;
		left: calc((calc(4rem - 8px) / 2) * -1);
		top: 50%;
		transform: translate(0, -50%);
		width: 1px;
		height: 32px;
		background: white;
	}

	.e-header__transition-container {
		display: grid;
		grid-template-rows: 1fr;
		grid-template-columns: 1fr;
		width: 100%;
	}

	.e-header__transition-container > * {
		grid-row: 1;
		grid-column: 1;
	}

	.e-header__search-wrapper {
		scale: 0 1;
		transform-origin: right center;
		transition: scale 0.1s ease-out;

		&.active {
			scale: 1 1;
		}
	}
</style>
