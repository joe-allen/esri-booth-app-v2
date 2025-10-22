<script lang="ts">
	// svelte
	import { fade } from 'svelte/transition';

	let { children, sidePanelDetailsIsVisible } = $props();
</script>

{#if sidePanelDetailsIsVisible}
	<section transition:fade class={`e-sidepanel--details ${sidePanelDetailsIsVisible ? '' : ''}`}>
		{@render children?.()}
	</section>
{/if}

<style>
	section {
		padding: 0 8px 0 0;
		transition: all 0.5s;
		scrollbar-gutter: stable both-edges;
		overflow: hidden;
		background: var(--calcite-color-text-1);
		margin-inline-start: -4px; /* account for the scrollbar area */
		container: sidebar / inline-size;
		clip-path: inset(0);
		opacity: 1;
		transition:
			clip-path 0.1s ease-out,
			opacity 0.2s ease-out;

		&:hover {
			overflow: auto;
		}

		@media screen and (width <= 1024px) {
			opacity: 0;
			clip-path: inset(0 100% 0 0);
		}

		&.e-sidepanel--details {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
		}

		&.e-sidepanel--details.hide {
			opacity: 0;
			clip-path: inset(0 0 0 100%);
		}
	}
</style>
