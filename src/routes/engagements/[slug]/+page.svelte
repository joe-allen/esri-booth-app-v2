<script lang="ts">
	import { PUBLIC_BUILD_TARGET } from '$env/static/public';
	import { goto } from '$app/navigation';

	// ui
	import { SidebarDemos, Content, SidebarDetails } from '$lib';

	// api
	import { PUBLIC_POCKETBASE_URL } from '$env/static/public';

	// svelte
	import { showDemoDetails } from '$lib/state.svelte.js';
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';

	let { data } = $props();
	let card = $state(null);

	let videoPlayer = $state('');
	let videoPlayerIsPaused = $state(false);
	let videoPlayerIsLooping = $state(false);
	let videoPlayerShowActions = $state(true);

	let sidebarDemosIsVisible = $state(false);
	let sidePanelDetailsIsVisible = $state(true);

	let currentDemo = $state(0);
	let selectedDemo = $state({});
	let filterableValues = $state([]);

	let activeTags = $state([]);
	let activeLinks = $state([]);
	let activeVideos = $state([]);
	let activeDocuments = $state([]);

	onMount(() => {
		// check to show showDemoDetails or not
		if (window.localStorage.getItem('showDemoDetails') === 'true') {
			showDemoDetails.hide = false;
		}
	});

	if (data) {
		// discard archived media, documents, links, tags
		activeLinks = data.engagement.expand.links.filter((link) => link.url && !link.archived);
		activeVideos = data.engagement.expand.media.filter((video) => video.video && !video.archived);

		activeTags = activeVideos
			.filter((video) => video.expand?.tags)
			.flatMap((video) => video.expand.tags);

		activeDocuments = data.engagement.expand.documents.filter(
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
		updateShowDemoDetails(selectedDemo);
	}

	function handleButtonPlay(i) {
		selectedDemo = activeVideos[i];
		currentDemo = i;
		videoPlayer.play();

		updateShowDemoDetails(selectedDemo);
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

	function handlesidebarDemosToggle() {
		sidebarDemosIsVisible = !sidebarDemosIsVisible;

		if (sidebarDemosIsVisible) {
			sidePanelDetailsIsVisible = false;
		}
	}

	function handleSidePanelDetailsToggle() {
		sidePanelDetailsIsVisible = !sidePanelDetailsIsVisible;

		if (sidePanelDetailsIsVisible) {
			sidebarDemosIsVisible = false;
		}
	}

	function handleDemoDetailsToggle() {
		showDemoDetails.hide = !showDemoDetails.hide;
		window.localStorage.setItem('showDemoDetails', JSON.stringify(!showDemoDetails.hide));

		updateShowDemoDetails(selectedDemo);
	}

	function updateShowDemoDetails(selectedDemo) {
		showDemoDetails.title = selectedDemo.title;
		showDemoDetails.tags = selectedDemo.expand.tags;
	}

	function handleRoute(slug: string) {
		if (PUBLIC_BUILD_TARGET === 'tauri') {
			window.location.href = `/tags/${slug}.html`;
		} else {
			goto(`/tags/${slug}`);
		}
	}
</script>

<SidebarDemos {sidebarDemosIsVisible}>
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
						class="cursor-pointer border-none bg-transparent text-left"
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
							class="cursor-pointer border-none bg-transparent text-left hover:bg-transparent"
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
									{#each item.expand.tags as item}
										<button onclick={() => handleRoute(item.slug)} class="cursor-pointer">
											<calcite-chip
												class="flex cursor-pointer items-center text-xs"
												kind="brand"
												value="calcite chip"
												scale="s">{item.title}</calcite-chip
											>
										</button>
									{/each}
								</div>
							{/if}
						{/if}
					</div>
				</calcite-card>
			</li>
		</ul>
	{/each}
</SidebarDemos>

<Content bind:videoPlayerShowActions cn={`pt-0 relative e-video`}>
	<div class="aspect-video h-full w-full bg-[var(--calcite-color-text-1)]">
		<video
			muted
			playsinline
			src={`${PUBLIC_POCKETBASE_URL}api/files/${selectedDemo.collectionName}/${selectedDemo.id}/${selectedDemo.video}`}
			autoplay
			class="mx-auto h-full w-auto"
			bind:this={videoPlayer}
			onended={handleAutoPlay}
		>
			<track kind="captions" src="" srclang="en" label="English captions" />
		</video>
		{#if videoPlayerShowActions}
			<section
				transition:fade
				class="e-video__actions absolute bottom-0 left-0 m-4 flex flex-row gap-2"
			>
				<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
				<button
					class={`${
						sidebarDemosIsVisible
							? 'bg-[var(--calcite-color-brand-press)]'
							: 'bg-[var(--calcite-color-brand)]'
					} flex aspect-square w-[32px] items-center justify-center rounded-full`}
					onclick={handlesidebarDemosToggle}
				>
					<span class="sr-only">Toggle Demos Panel</span>
					<!-- svelte-ignore element_invalid_self_closing_tag -->
					<calcite-icon style="--calcite-icon-color: #fff" class="scale-80" icon="dock-left" />
				</button>
				{#if videoPlayerIsPaused}
					<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
					<calcite-fab onclick={handlePlay} icon="play"></calcite-fab>
				{:else}
					<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
					<calcite-fab
						style="--calcite-color-brand-hover: var(--calcite-color-brand)"
						onclick={handlePause}
						icon="pause"
					></calcite-fab>
				{/if}
				<button
					onclick={handleLoop}
					class={`rounded-full ${videoPlayerIsLooping ? 'bg-[var(--calcite-color-brand-press)]' : 'bg-[var(--calcite-color-brand)]'} flex aspect-square w-[32px] items-center justify-center`}
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
			<section
				transition:fade
				class="e-video__actions absolute right-0 bottom-0 m-4 flex flex-row gap-2"
			>
				<button
					class={`${
						sidePanelDetailsIsVisible
							? 'bg-[var(--calcite-color-brand-press)]'
							: 'bg-[var(--calcite-color-brand)]'
					} flex aspect-square w-[32px] items-center justify-center rounded-full`}
					onclick={handleSidePanelDetailsToggle}
				>
					<span class="sr-only">Toggle Details Panel</span>
					<!-- svelte-ignore element_invalid_self_closing_tag -->
					<calcite-icon
						style="--calcite-icon-color: #fff"
						class="scale-80"
						icon="information-letter"
					/>
				</button>

				<!-- <calcite-fab icon="full-screen"></calcite-fab> -->
			</section>
		{/if}
	</div>
</Content>

<SidebarDetails {sidePanelDetailsIsVisible}>
	<div class="p-4 text-white">
		<h2 class="text-lg font-semibold">{data.engagement.title}</h2>
		<h2 class="text-xs">{data.engagement.year}</h2>

		<div class="e-sidepanel__details-tags mt-2 -ml-[2px] flex flex-wrap gap-1">
			{#each data.engagement.expand.tags as item}
				<button onclick={() => handleRoute(item.slug)} class="cursor-pointer">
					<calcite-chip
						class="flex cursor-pointer items-center"
						kind="brand"
						value={item.title}
						scale="s">{item.title}</calcite-chip
					>
				</button>
			{/each}
		</div>

		{#if activeLinks.length}
			<h3 class="mt-4 text-base">Links</h3>
			<ul class="mt-2">
				{#each activeLinks as link}
					<li class="mb-2 leading-4">
						<a
							href={link.url}
							target="_blank"
							rel="noopener noreferrer"
							class="cursor-pointer text-xs leading-4 font-semibold text-[var(--calcite-color-link)] hover:underline"
							>{link.title}</a
						>
					</li>
				{/each}
			</ul>
		{/if}

		{#if activeDocuments.length}
			<h3 class="mt-4 text-base">Documents</h3>
			<ul class="mt-2">
				{#each activeDocuments as document}
					<li class="mb-2 leading-4">
						<a
							href={`${PUBLIC_POCKETBASE_URL}api/files/${document.collectionName}/${document.id}/${document.document}`}
							target="_blank"
							rel="noopener noreferrer"
							class="cursor-pointer text-xs leading-4 font-semibold text-[var(--calcite-color-link)] hover:underline"
							>{document.title}</a
						>
					</li>
				{/each}
			</ul>
		{/if}
	</div>
	<div class="sticky bottom-0 bg-[var(--calcite-color-text-1)] p-2 px-2 pl-4">
		<calcite-label layout="inline-space-between">
			<span class="text-white">Show demo details</span>
			<calcite-switch
				checked={!showDemoDetails.hide}
				oncalciteSwitchChange={handleDemoDetailsToggle}
			></calcite-switch>
		</calcite-label>
	</div>
</SidebarDetails>

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
