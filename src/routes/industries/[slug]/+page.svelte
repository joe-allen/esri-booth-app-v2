<script lang="ts">
  let { data } = $props();
</script>

<h1>{data.industry.title}</h1>
{#if data.conferencesByIndustry.length}
  <h2>Conferences</h2>
  {#each data.conferencesByIndustry as item}
    <div>
      <a href={`../conferences/${item.id}.html`}>{item.title}</a>
    </div>
    <hr />
  {/each}
{:else}
  <p>No content... Coming soon.</p>
{/if}

{#if data.industryImg}
  <img src={data.industryImg} width="200" height="112" />
{/if}
