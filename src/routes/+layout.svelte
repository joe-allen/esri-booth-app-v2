<script lang="ts">
	// svelte
	import { onMount } from 'svelte';

	// styles / assets
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';

	// ui
	import { Header, Background } from '$lib';

	let { children } = $props();
	// let conferences = $state(data?.industries?.conferences);
	// let conferencesFiltered = $state([]);
	// let conferences = $derived(
	// 	data?.industries?.conferences
	// 		? data?.industries?.conferences
	// 		: [
	// 				{
	// 					id: 1,
	// 					title: 'Autodesk University 2025',
	// 					year: '2025',
	// 					description: 'The Autodesk University 2025',
	// 					image: '../src/assets/uc2025.jpg'
	// 				},
	// 				{
	// 					id: 2,
	// 					title: 'Esri UC 2022',
	// 					year: '2022',
	// 					description: 'The Esri User Conference 2022',
	// 					image: '../src/assets/uc2025.jpg'
	// 				},
	// 				{
	// 					id: 3,
	// 					title: 'Esri UC 2023',
	// 					year: '2023',
	// 					description: 'The Esri User Conference 2023',
	// 					image: '../src/assets/uc2025.jpg'
	// 				},
	// 				{
	// 					id: 4,
	// 					title: 'Esri UC 2024',
	// 					year: '2024',
	// 					description: 'The Esri User Conference 2024',
	// 					image: '../src/assets/uc2025.jpg'
	// 				},
	// 				{
	// 					id: 5,
	// 					title: 'Esri UC 2025',
	// 					year: '2025',
	// 					description: 'The Esri User Conference 2025',
	// 					image: '../src/assets/uc2025.jpg'
	// 				},
	// 				{
	// 					id: 6,
	// 					title: 'Esri UC 2026',
	// 					year: '2026',
	// 					description: 'The Esri User Conference 2026',
	// 					image: '../src/assets/uc2025.jpg'
	// 				},
	// 				{
	// 					id: 7,
	// 					title: 'Esri UC 2027',
	// 					year: '2027',
	// 					description: 'The Esri User Conference 2027',
	// 					image: '../src/assets/uc2025.jpg'
	// 				},
	// 				{
	// 					id: 8,
	// 					title: 'Esri UC 2028',
	// 					year: '2028',
	// 					description: 'The Esri User Conference 2028',
	// 					image: '../src/assets/uc2025.jpg'
	// 				}
	// 			]
	// );

	onMount(() => {
		// conferencesFiltered = conferences;
	});

	function handleSearchInput(event) {
		const searchTerm = event.target.value.toLowerCase();
		// conferencesFiltered = conferences.filter((c) => c.title.toLowerCase().includes(searchTerm));
	}
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Background />
<Header {handleSearchInput} />
<main>
	{@render children?.()}
</main>

<style>
	main {
		display: grid;
		position: relative;
		grid-area: main;
		grid-template-columns: clamp(250px, 15vw, 500px) 1fr;
		grid-template-rows: calc(var(--app-main-height) - 2rem);
		/* overflow-y: auto; */
		gap: calc(4rem - 8px);
		place-content: flex-start;
		padding-inline: calc(4rem - 8px);
		margin-block-start: var(--app-header-height);
		height: calc(var(--app-main-height) - 2rem);
		transition: grid-template-columns 0.2s ease-out;
		z-index: 1;

		@media screen and (width <= 1024px) {
			grid-template-columns: 0 1fr;
			gap: 0;
		}
	}

	:global(main:has(.e-video)) {
		grid-template-columns: 1fr;
		gap: 0;
	}

	:global(main:has(.e-sidepanel--demos + .e-video)) {
		grid-template-columns: clamp(250px, 15vw, 500px) 1fr;
		gap: calc(4rem - 8px);
	}

	:global(main:has(.e-video + .e-sidepanel--details)) {
		grid-template-columns: 1fr clamp(250px, 15vw, 500px);
		gap: calc(4rem - 8px);
	}

	/* used bc both can be visible during the in/ out transitions */
	:global(main:has(.e-sidepanel--demos + .e-video + .e-sidepanel--details)) {
		grid-template-columns: clamp(250px, 15vw, 500px) 1fr clamp(250px, 15vw, 500px);
		gap: calc(4rem - 8px);
	}
</style>
