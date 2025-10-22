<script lang="ts">
	// svelte
	import { goto } from '$app/navigation';

	// ui
	import { SidebarList, Content } from '$lib';

	let { data } = $props();

	function navigateToIndustry(id: string) {
		if (PUBLIC_BUILD_TARGET === 'tauri') {
			window.location.href = `industries/${id}.html`;
		} else {
			goto(`industries/${id}`);
		}
	}
</script>

<!-- THIS WONT WORK ON TAURI DEV: -->
<!-- Welcome, select an
{#if PUBLIC_BUILD_TARGET === 'tauri' || PUBLIC_BUILD_TARGET === 'static'}
	<a href="industries.html">industry.html</a>.
{:else}
	<a href="industries">industry</a>.
{/if} -->

<SidebarList results={data.industries.items} />
<Content cn="pt-6">
	<h1 class="text-white">HOME - Ideas for this state (when no industry is selected).</h1>
</Content>
