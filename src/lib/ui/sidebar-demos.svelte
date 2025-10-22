<script lang="ts">
	// svelte
	import { fade } from 'svelte/transition';

	let { children, sidebarDemosIsVisible } = $props();
</script>

{#if sidebarDemosIsVisible}
	<section transition:fade class={`e-sidepanel--demos ${sidebarDemosIsVisible ? '' : 'hide'}`}>
		{@render children?.()}
	</section>
{/if}

<style>
	section {
		padding: 0 8px 0 0;
		transition: all 0.5s;
		scrollbar-gutter: stable both-edges;
		overflow: hidden;
		margin-inline-start: -4px; /* account for the scrollbar area */
		mask-image: linear-gradient(to bottom, white 95%, transparent 100%);
		mask-repeat: no-repeat;
		mask-size: 100% 100%;
		container: sidebar / inline-size;
		clip-path: inset(0);
		opacity: 1;
		transition:
			clip-path 0.1s ease-out,
			display 0.2s allow-discrete,
			opacity 0.2s ease-out;

		&:hover {
			overflow: auto;
		}

		@media screen and (width <= 1024px) {
			opacity: 0;
			clip-path: inset(0 100% 0 0);
		}

		&.e-sidepanel--demos.hide {
			opacity: 0;
			clip-path: inset(0 100% 0 0);
			transition:
				clip-path 0.1s ease-out,
				display 0.2s allow-discrete,
				opacity 0.2s ease-out;
		}
	}
</style>
