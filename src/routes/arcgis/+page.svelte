<script lang="ts">
	// config
	import config from '$lib/config';

	// sk
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { env } from '$env/dynamic/public';

	// variables
	let mapWrap: HTMLDivElement | null = $state(null);

	onMount(() => {
		console.log('env', env);
		console.log('config', config);
		console.log('mapWrap', mapWrap);
	});

	if (browser) {
		import('@arcgis/map-components/dist/loader').then(({ defineCustomElements }) => {
			defineCustomElements(window, {
				resourcesUrl: 'https://js.arcgis.com/map-components/4.33.24/assets'
			});
		});
	}
</script>

<svelte:head>
	<title>🗺️ SV + ArcGIS Demo</title>
</svelte:head>

<main class="e-demo">
	{#if config.SECURITY_CLASSIFICATION}
		<div class="e-demo-security-bar e-demo-security-bar--{config.SECURITY_CLASSIFICATION}">
			Security Classification: {config.SECURITY_CLASSIFICATION.toUpperCase()}
		</div>
	{/if}
	<div class="e-demo-container">
		<div class="e-demo-header">
			<h1>🗺️ SV + ArcGIS Demo</h1>
		</div>
		<div class="e-demo-map-wrap" bind:this={mapWrap}>
			<arcgis-map item-id="05e015c5f0314db9a487a9b46cb37eca">
				<arcgis-zoom position="top-left"></arcgis-zoom>
			</arcgis-map>
			{#if config.CALCITE}
				<calcite-button href="/" appearance="solid" scale="m"> Go Home </calcite-button>
			{/if}
		</div>
	</div>
	{#if config.SECURITY_CLASSIFICATION}
		<div class="e-demo-security-bar e-demo-security-bar--{config.SECURITY_CLASSIFICATION}">
			Security Classification: {config.SECURITY_CLASSIFICATION.toUpperCase()}
		</div>
	{/if}
</main>

<style>
	@import 'https://js.arcgis.com/4.33/@arcgis/core/assets/esri/themes/dark/main.css';
	@import '@esri/calcite-components/dist/calcite/calcite.css';

	:global(body:has(.e-demo)) {
		margin: 0;
		padding: 0;
		height: 100%;
		width: 100%;
		background: #212121;
	}

	.e-demo {
		display: grid;
		grid-template-rows: 24px 1fr 24px;
		height: 100vh;
	}

	.e-demo-container {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.e-demo-header {
		padding: 1rem;
		color: #f1f1f1;

		translate: 0 0;
		transition: translate 1s ease-out;

		@starting-style {
			translate: 0 -4px;
		}
	}

	.e-demo-map-wrap {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		width: 50vmax;
		height: 100vh;
		margin-inline: auto;
		margin: 0;
		padding: 0;
		padding-block-end: 2rem;

		& arcgis-map {
			width: 100%;
			height: 50vh;

			opacity: 1;
			transition: opacity 2s ease-out;

			@starting-style {
				opacity: 0;
			}
		}

		& calcite-button {
			align-self: center;
		}
	}

	.e-demo-security-bar {
		position: sticky;
		display: flex;
		align-items: center;
		justify-content: center;
		inset-block-start: 0;
		height: 22px;
		background-color: #000;
		color: #fff;
		margin: 0;
		font-size: 14px;
		z-index: 1;

		&:not(:first-of-type) {
			inset-block-end: 0;
		}

		&.e-demo-security-bar--classified {
			color: #fff;
			background-color: #723d9a;
		}
		&.e-demo-security-bar--confidential {
			color: #fff;
			background-color: #0033a0;
		}
		&.e-demo-security-bar--controlled_unclassified_information {
			color: #fff;
			background-color: #3d1e5a;
		}
		&.e-demo-security-bar--secret {
			color: #fff;
			background-color: #c8102e;
		}
		&.e-demo-security-bar--top_secret {
			color: #000;
			background-color: #ff671f;
		}
		&.e-demo-security-bar--top_secret_sensitive_compartment_information {
			color: #000;
			background-color: #f7ea48;
		}
		&.e-demo-security-bar--unclassified {
			color: #fff;
			background-color: #007a33;
		}
	}
</style>
