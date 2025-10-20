<script lang="ts">
	import { PUBLIC_BUILD_TARGET } from '$env/static/public';
	import { goto } from '$app/navigation';

	// ui
	import { SidepanelDemos, Content } from '$lib';

	// api
	import { PUBLIC_POCKETBASE_URL } from '$env/static/public';

	// svelte
	import { flip } from 'svelte/animate';
	import { cubicOut } from 'svelte/easing';
	import { tick } from 'svelte';

	let videoPlayer = '';
	let videoPlayerIsPaused = $state(false);
	let videoPlayerIsLooping = $state(false);
	let sidePanelIsVisible = $state(false);
	let card = $state(null);
	let filterableValues = $state([]);
	let currentDemo = $state(0);
	let { data } = $props();
	let selectedDemo = $state({});
	let activeTags = $state([]);
	let activeLinks = $state([]);
	let activeVideos = $state([]);
	let activeDocuments = $state([]);

	if (data) {
		// discard archived media, documents, links, tags
		activeLinks = data.engagement.expand.links.filter((link) => link.link && !link.archived);
		activeVideos = data.engagement.expand.media.filter((video) => video.video && !video.archived);

		activeTags = activeVideos
			.filter((video) => video.expand?.tags)
			.flatMap((video) => video.expand.tags);

		activeDocuments = data.engagement.expand.media.filter(
			(demo) => demo.document && !demo.archived
		);

		// set default selected demo to first video
		selectedDemo = activeVideos[currentDemo];

		// find all unique tags (Set), sort them
		filterableValues = Array.from(new Set(activeTags.map((tag) => tag.title))).sort();
	}

	function handleAutoPlay() {
		if (currentDemo === activeVideos.length - 1) {
			currentDemo = 0;
		} else {
			if (!videoPlayerIsLooping) {
				currentDemo = currentDemo + 1;
			}
		}

		selectedDemo = activeVideos[currentDemo];
	}

	function handleButtonPlay(i) {
		selectedDemo = activeVideos[i];
		currentDemo = i;
		videoPlayer.play();
	}

	function handlePause() {
		videoPlayer.pause();
		videoPlayerIsPaused = true;
	}

	function handlePlay() {
		videoPlayer.play();
		videoPlayerIsPaused = false;
	}

	function handleLoop() {
		videoPlayerIsLooping = !videoPlayerIsLooping;
		if (videoPlayerIsLooping) {
			videoPlayer.setAttribute('loop', true);
		} else {
			videoPlayer.removeAttribute('loop');
		}
	}

	function handleComboboxFilter(event) {
		let selectedVideosByTag = [];

		if (event.target.value === '') {
			activeVideos = data.engagement.expand.media.filter((video) => video.video && !video.archived);
			return;
		}

		activeVideos.forEach((video) => {
			video.expand?.tags.map((tag) => {
				if (tag.title === event.target.value) {
					selectedVideosByTag.push(video);
				}
			});
		});

		activeVideos = selectedVideosByTag;
		// filterValue = event.target.value;
	}

	function handleSidePanelToggle() {
		sidePanelIsVisible = !sidePanelIsVisible;
	}
</script>

<SidepanelDemos {sidePanelIsVisible}>
	<div class="sticky top-0 z-10">
		<calcite-combobox
			placeholder="Select filter tags"
			selection-mode="single"
			oncalciteComboboxFilterChange={() => handleComboboxFilter(event)}
		>
			{#each filterableValues as value}
				<calcite-combobox-item {value} heading={value}></calcite-combobox-item>
			{/each}
		</calcite-combobox>
	</div>
	<!-- {#each demos as demo, i} -->
	{#each activeVideos as item, i}
		<ul>
			<li>
				<calcite-card
					selected={i === currentDemo ?? true}
					bind:this={card}
					class={`${i === currentDemo ? 'bg-gray-900' : 'bg-transparent'}`}
				>
					<button
						onclick={() => handleButtonPlay(i)}
						aria-label={`Play demo video: ${item[currentDemo]}`}
						class="bg-transparent border-none text-left cursor-pointer"
						slot="thumbnail"
					>
						{#if item.image}
							<img
								alt={item.title}
								src={`${PUBLIC_POCKETBASE_URL}api/files/${item.collectionName}/${item.id}/${item.image}`}
								class={`${i === currentDemo ? 'opacity-100' : 'opacity-70'}`}
							/>
						{:else}
							<img
								class=""
								src="https://place-hold.it/300x169/"
								alt="placeholder 300x168"
								width="400"
								height="200"
							/>
						{/if}
					</button>

					<span slot="heading">
						<button
							onclick={() => handleButtonPlay(i)}
							class="bg-transparent border-none text-left cursor-pointer hover:bg-transparent"
						>
							<h3 class="py-2">{item.title}</h3>
						</button>
					</span>
					<div slot="footer-end" class="w-full">
						{#if item.expand.tags.length}
							{#if item.expand.tags.length > 2}
								<calcite-chip class="flex items-center" kind="brand" value="calcite chip" scale="s"
									>2+</calcite-chip
								>
							{:else}
								<div class="flex flex-wrap gap-1">
									{#each item.expand.tags as tag}
										<calcite-chip
											class="flex items-center text-xs"
											kind="brand"
											value="calcite chip"
											scale="s">{tag.title}</calcite-chip
										>
									{/each}
								</div>
							{/if}
						{/if}
					</div>
				</calcite-card>
			</li>
		</ul>
	{/each}

	<!-- {/each} -->
</SidepanelDemos>
<Content {sidePanelIsVisible} cn="pt-0 relative">
	<div class="h-full w-full bg-black aspect-video">
		<video
			muted
			playsinline
			src={`${PUBLIC_POCKETBASE_URL}api/files/${selectedDemo.collectionName}/${selectedDemo.id}/${selectedDemo.video}`}
			autoplay
			class="w-auto h-full mx-auto"
			bind:this={videoPlayer}
			onended={handleAutoPlay}
		>
			<track kind="captions" src="" srclang="en" label="English captions" />
		</video>
		<section class="e-video__actions absolute flex-row left-0 bottom-0 m-4 flex flex-col gap-2">
			<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->

			<button
				class={`${
					sidePanelIsVisible
						? 'bg-[var(--calcite-color-brand)]'
						: 'bg-[var(--calcite-color-brand-press)]'
				} w-[32px] aspect-square flex items-center justify-center rounded-full`}
				onclick={handleSidePanelToggle}
			>
				<span class="sr-only">Toggle Side Panel</span>
				<calcite-icon style="--calcite-icon-color: #fff" class="scale-80" icon="dock-left" />
			</button>
			{#if videoPlayerIsPaused}
				<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
				<calcite-fab onclick={handlePlay} icon="play"></calcite-fab>
			{:else}
				<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
				<calcite-fab onclick={handlePause} icon="pause"></calcite-fab>
			{/if}
			<button
				onclick={handleLoop}
				class={`rounded-full ${videoPlayerIsLooping ? 'bg-[var(--calcite-color-brand-press)]' : 'bg-[var(--calcite-color-brand)]'} w-[32px] aspect-square flex items-center justify-center`}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="1"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="lucide lucide-repeat2-icon lucide-repeat-2 scale-90 text-white"
					><path d="m2 9 3-3 3 3" /><path d="M13 18H7a2 2 0 0 1-2-2V6" /><path
						d="m22 15-3 3-3-3"
					/><path d="M11 6h6a2 2 0 0 1 2 2v10" /></svg
				>
				<span class="sr-only">Loop</span>
			</button>
		</section>
		<section class="e-video__actions absolute flex-row right-0 bottom-0 m-4 flex flex-col gap-2">
			<calcite-fab icon="information-letter"></calcite-fab>
			<calcite-fab icon="full-screen"></calcite-fab>
		</section>
	</div>
</Content>

<style>
	button img {
		transition: opacity 0.5s ease-out;
	}

	button:hover img {
		opacity: 1;
	}

	calcite-card {
		margin-block-start: 0.5rem;
	}

	calcite-combobox {
		overflow: hidden;
		border-radius: 0;
		box-shadow: 2px 4px 24px rgba(0, 0, 0, 0.25);
	}

	:global(body:has(calcite-combobox-item[selected]) calcite-combobox),
	:global(calcite-combobox[open]),
	calcite-combobox:focus {
		overflow: visible;
		border-radius: 0;
		border-top-left-radius: 24px;
		border-top-right-radius: 24px;
	}
</style>
