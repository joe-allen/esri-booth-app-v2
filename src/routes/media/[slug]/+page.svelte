<script lang="ts">
	import { PUBLIC_BUILD_TARGET } from '$env/static/public';
	import { goto } from '$app/navigation';

	// ui
	import { SidebarDemos, Content, SidebarDetails } from '$lib';

	// api
	import { PUBLIC_POCKETBASE_URL } from '$env/static/public';

	// svelte
	import { fade } from 'svelte/transition';

	let { data } = $props();
	let card = $state(null);

	let videoPlayer = $state('');
	let videoPlayerIsPaused = $state(false);
	let videoPlayerIsLooping = $state(false);
	let videoPlayerShowActions = $state(true);

	let sidebarDemosIsVisible = $state(false);
	let sidePanelDetailsIsVisible = $state(false);

	let currentDemo = $state(0);
	let media = $state({});
	let filterableValues = $state([]);

	let activeTags = $state([]);
	let activeLinks = $state([]);
	let activeVideos = $state([]);
	let activeDocuments = $state([]);

	if (data) {
		// discard archived media, documents, links, tags
		// activeLinks = data.engagement.expand.links.filter((link) => link.url && !link.archived);
		// activeVideos = data.engagement.expand.data.media.filter((video) => video.video && !video.archived);
		// activeTags = activeVideos
		// 	.filter((video) => video.expand?.tags)
		// 	.flatMap((video) => video.expand.tags);
		// activeDocuments = data.engagement.expand.documents.filter(
		// 	(demo) => demo.document && !demo.archived
		// );
		// set default selected demo to first video
		// media = activeVideos[currentDemo];
		// find all unique tags (Set), sort them
		// filterableValues = Array.from(new Set(activeTags.map((tag) => tag.title))).sort();
	}

	function handleAutoPlay() {
		// if (currentDemo === activeVideos.length - 1) {
		// 	currentDemo = 0;
		// } else {
		// 	if (!videoPlayerIsLooping) {
		// 		currentDemo = currentDemo + 1;
		// 	}
		// }
		// media = activeVideos[currentDemo];
	}

	function handlePause() {
		videoPlayer.pause();
		videoPlayerIsPaused = true;
	}

	function handlePlay() {
		videoPlayer.play();
		videoPlayerIsPaused = false;
	}

	function handlesidebarDemosToggle() {
		sidebarDemosIsVisible = !sidebarDemosIsVisible;

		if (sidebarDemosIsVisible) {
			sidePanelDetailsIsVisible = false;
		}
	}
</script>

<SidebarDemos {sidebarDemosIsVisible}><p></p></SidebarDemos>

<Content bind:videoPlayerShowActions cn={`pt-0 relative e-video`}>
	<div class="aspect-video h-full w-full bg-[var(--calcite-color-text-1)]">
		<video
			muted
			playsinline
			loop
			src={`${PUBLIC_POCKETBASE_URL}api/files/media/${data.media.id}/${data.media.video}`}
			autoplay
			class="mx-auto h-full w-auto"
			bind:this={videoPlayer}
		>
			<track kind="captions" src="" srclang="en" label="English captions" />
		</video>
		{#if videoPlayerShowActions}
			<section
				transition:fade
				class="e-video__actions absolute top-0 left-0 m-4 flex flex-row gap-2"
			>
				<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
				<button
					class={`${
						sidebarDemosIsVisible
							? 'bg-[var(--calcite-color-brand-press)]'
							: 'bg-[var(--calcite-color-brand)]'
					} flex aspect-square w-[32px] items-center justify-center rounded-full`}
					onclick={() => window.history.back()}
				>
					<span class="sr-only">Toggle Demos Panel</span>
					<!-- svelte-ignore element_invalid_self_closing_tag -->
					<calcite-icon style="--calcite-icon-color: #fff" class="scale-80" icon="arrow-left" />
				</button>
			</section>
			<section
				transition:fade
				class="e-video__actions absolute bottom-0 left-0 m-4 flex flex-row gap-2"
			>
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
			</section>
		{/if}
	</div>
</Content>

<SidebarDetails {sidePanelDetailsIsVisible}><p></p></SidebarDetails>

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
