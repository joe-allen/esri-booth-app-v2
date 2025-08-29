<script lang="ts">
  let { data } = $props();
</script>

<h1>engagements</h1>
{#if data.engagements}
  {#each data.engagements.items as record}
    <div>
      <!-- demo only: probably dont want to show ID anywhere in app -->
      <p><a href={`engagements/${record.id}`}>{record.title}</a></p>
    </div>
  {/each}
{/if}
