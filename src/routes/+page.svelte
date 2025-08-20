<script lang="ts">
  import { PUBLIC_BUILD_TARGET } from "$env/static/public";
</script>

<h3>Build Target: {PUBLIC_BUILD_TARGET}</h3>

Welcome, select an
<!-- THIS WONT WORK ON TAURI DEV: -->
{#if PUBLIC_BUILD_TARGET === "static"}
  <a href="industries.html">industry.html</a>.
{:else}
  <a href="industries">industry</a>.
{/if}
