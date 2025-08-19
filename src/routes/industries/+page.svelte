<script lang="ts">
  let { data } = $props();
</script>

<h1>Industries</h1>
{#if data.industries}
  {#each data.industries.items as record}
    <div>
      <!-- demo only: probably dont want to show ID anywhere in app -->
      <p><a href={`industries/${record.id}`}>{record.title}</a></p>
    </div>
  {/each}
{/if}
