<script lang="ts">
	import { PUBLIC_BUILD_TARGET } from '$env/static/public';
</script>

Welcome, select an
<!-- THIS WONT WORK ON TAURI DEV: -->
{#if PUBLIC_BUILD_TARGET === 'tauri' || PUBLIC_BUILD_TARGET === 'static'}
	<a href="industries.html">industry.html</a>.
{:else}
	<a href="industries">industry</a>.
{/if}

<p>Visit the <a href="arcgis">arcgis demo page</a> and view console.log output</p>