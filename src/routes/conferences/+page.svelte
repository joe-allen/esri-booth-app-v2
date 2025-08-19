<script lang="ts">
  let { data } = $props();
</script>

<h1>Conferences</h1>
{#if data.conferences}
  {#each data.conferences.items as record}
    <div>
      <!-- demo only: probably dont want to show ID anywhere in app -->
      <p><a href={`conferences/${record.id}`}>{record.title}</a></p>
    </div>
  {/each}
{/if}
