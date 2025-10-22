<script lang="ts">
	// svelte
	import { onMount } from 'svelte';

	// 3rd party
	import { useDebounce } from 'runed';

	let {
		children,
		cn,
		videoPlayerShowActions = $bindable()
	}: {
		children: any;
		cn?: string;
		videoPlayerShowActions?: boolean;
	} = $props();

	let toggleActionsDelay: number = 5000;
	let debounceDuration: number = $state(100);
	let timeoutId: ReturnType<typeof setTimeout>;

	onMount(() => {
		toggleVideoActionsAfterDelay(toggleActionsDelay);
		watchInteraction();
	});

	function toggleVideoActionsAfterDelay(toggleActionsDelay: number) {
		if (timeoutId) {
			clearTimeout(timeoutId);
		}
		timeoutId = setTimeout(() => {
			videoPlayerShowActions = false;
		}, toggleActionsDelay);
	}

	function watchInteraction() {
		// for mouse interaction
		document.addEventListener(
			'mousemove',
			useDebounce(
				() => {
					console.log('registered: mousemove');
					videoPlayerShowActions = true;
					toggleVideoActionsAfterDelay(toggleActionsDelay);
				},
				() => debounceDuration
			)
		);

		// for touchscreens
		document.addEventListener(
			'touchmove',
			useDebounce(
				() => {
					console.log('registered: touchmove');
					videoPlayerShowActions = true;
					toggleVideoActionsAfterDelay(toggleActionsDelay);
				},
				() => debounceDuration
			)
		);
	}

	function toggleVideoActions(event: MouseEvent) {
		if (event.target && (event.target as Element).nodeName === 'VIDEO') {
			videoPlayerShowActions = !videoPlayerShowActions;
		}
	}
</script>

<!-- svelte-ignore  a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
<section
	class={cn}
	onclick={() => {
		toggleVideoActions(event);
	}}
>
	{@render children?.()}
</section>

<style>
	section {
		width: 100%;
		min-width: calc(100% - clamp(250px, 15vw, 500px));
		overflow-y: auto;
	}
</style>
