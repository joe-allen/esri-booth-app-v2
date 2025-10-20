<script lang="ts">
	// api
	import { PUBLIC_BUILD_TARGET } from '$env/static/public';

	// svelte
	import { page } from '$app/state';

	let { data } = $props();
</script>

{#if data.industries}
	<section>
		<ul>
			{#each data.industries.items as record}
				<!-- demo only: probably dont want to show ID anywhere in app -->
				{#if PUBLIC_BUILD_TARGET === 'tauri'}
					<li>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="#fff"
							stroke-width="0.75"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="lucide lucide-cuboid-icon lucide-cuboid"
							><path
								d="m21.12 6.4-6.05-4.06a2 2 0 0 0-2.17-.05L2.95 8.41a2 2 0 0 0-.95 1.7v5.82a2 2 0 0 0 .88 1.66l6.05 4.07a2 2 0 0 0 2.17.05l9.95-6.12a2 2 0 0 0 .95-1.7V8.06a2 2 0 0 0-.88-1.66Z"
							/><path d="M10 22v-8L2.25 9.15" /><path d="m10 14 11.77-6.87" /></svg
						>
						<button
							style="color: green; background: none; border: none; text-decoration: underline; cursor: pointer; padding: 0; font: inherit;"
							onclick={() => navigateToIndustry(record.id)}
						>
							{record.title}
						</button>
					</li>
				{:else if PUBLIC_BUILD_TARGET === 'static'}
					<li>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="#fff"
							stroke-width="0.75"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="lucide lucide-cuboid-icon lucide-cuboid"
							><path
								d="m21.12 6.4-6.05-4.06a2 2 0 0 0-2.17-.05L2.95 8.41a2 2 0 0 0-.95 1.7v5.82a2 2 0 0 0 .88 1.66l6.05 4.07a2 2 0 0 0 2.17.05l9.95-6.12a2 2 0 0 0 .95-1.7V8.06a2 2 0 0 0-.88-1.66Z"
							/><path d="M10 22v-8L2.25 9.15" /><path d="m10 14 11.77-6.87" /></svg
						>
						<a
							style="color: green; text-decoration: underline; cursor: pointer;"
							href="/industries/{record.id}.html"
						>
							{record.title}
						</a>
					</li>
				{:else}
					<li>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="#fff"
							stroke-width="0.75"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="lucide lucide-cuboid-icon lucide-cuboid"
							><path
								d="m21.12 6.4-6.05-4.06a2 2 0 0 0-2.17-.05L2.95 8.41a2 2 0 0 0-.95 1.7v5.82a2 2 0 0 0 .88 1.66l6.05 4.07a2 2 0 0 0 2.17.05l9.95-6.12a2 2 0 0 0 .95-1.7V8.06a2 2 0 0 0-.88-1.66Z"
							/><path d="M10 22v-8L2.25 9.15" /><path d="m10 14 11.77-6.87" /></svg
						>
						<a
							href={`/industries/${record.id}`}
							class={page.params.slug === record.id ? 'active' : ''}>{record.title}</a
						>
					</li>
				{/if}
			{/each}
		</ul>
	</section>
{/if}

<style>
	section {
		padding-block: 1.5rem 0;
		transition: all 0.5s;
		scrollbar-gutter: stable both-edges;
		overflow: hidden;
		margin-inline-start: -4px; /* account for the scrollbar area */
		mask-image: linear-gradient(
			to bottom,
			transparent 0%,
			white 5%,
			white 95%,
			white 95%,
			transparent 100%
		);
		mask-repeat: no-repeat;
		mask-size: 100% 100%;
		container: sidebar / inline-size;

		&:hover {
			overflow: auto;
		}
	}

	ul {
		padding-inline-end: 2rem;
		padding-block-end: 1rem;
		opacity: 0.6;
		transition: opacity 0.4s ease-out;

		&:hover {
			opacity: 1;
		}
	}

	li {
		line-height: 1.15;
		margin-block-end: 1rem;
		display: flex;
		align-items: center;
		gap: 1rem;

		opacity: 0.8;
		transition: opacity 0.2s ease-out;

		&:hover {
			opacity: 1;
		}
	}

	ul:has(a.active) {
		opacity: 1;
	}

	li:not(:has(a.active)) {
		opacity: 0.8;

		&:hover {
			opacity: 1;
		}
	}

	li:has(a.active) {
		opacity: 1;
	}

	a {
		position: relative;
		color: #fff;
		text-decoration: none;

		&::after {
			content: '';
			position: absolute;
			width: min-content;
			height: 100%;
			background: #fff;

			inset: 0;
			scale: 0 1;
			transition: scale 0.2s ease-out;
			transform-origin: left center;
		}

		&:hover {
			text-decoration: none;
		}

		&:hover::after {
			scale: 1;
		}
	}

	a.active {
		font-weight: 700;
	}

	svg {
		flex-shrink: 0;
	}

	@container sidebar (max-width: 238px) {
		svg {
			display: none;
		}
	}
</style>
