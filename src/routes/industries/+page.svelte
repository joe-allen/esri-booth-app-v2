<script lang="ts">
  import { PUBLIC_BUILD_TARGET } from "$env/static/public";
  import { goto } from "$app/navigation";

  let { data } = $props();

  function navigateToIndustry(id: string) {
    if (PUBLIC_BUILD_TARGET === "static") {
      window.location.href = `industries/${id}.html`;
    } else {
      goto(`industries/${id}`);
    }
  }
</script>

<h1>Industries</h1>
<h3>Build Target: {PUBLIC_BUILD_TARGET}</h3>
{#if data.industries}
  {#each data.industries.items as record}
    <div>
      <!-- demo only: probably dont want to show ID anywhere in app -->
      {#if PUBLIC_BUILD_TARGET === "static"}
        <p>
          <button
            style="color: teal; background: none; border: none; text-decoration: underline; cursor: pointer; padding: 0; font: inherit;"
            onclick={() => navigateToIndustry(record.id)}
          >
            {record.title} - {record.id}
          </button>
        </p>
      {:else}
        <p>
          <a style="color: hotpink;" href={`industries/${record.id}`}
            >{record.title} - {record.id}</a
          >
        </p>
      {/if}
    </div>
  {/each}
{/if}
