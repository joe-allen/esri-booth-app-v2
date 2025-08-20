<script lang="ts">
  import { PUBLIC_BUILD_TARGET } from "$env/static/public";
  import { goto } from "$app/navigation";

  let { data } = $props();

  function navigateToIndustry(id: string) {
    console.log("outside");
    if (PUBLIC_BUILD_TARGET === "static") {
      console.log("inside");
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
            style="color: green; background: none; border: none; text-decoration: underline; cursor: pointer; padding: 0; font: inherit;"
            onclick={() => navigateToIndustry(record.id)}
          >
            {record.title}
          </button>
        </p>
      {:else if PUBLIC_BUILD_TARGET === "file"}
        <p>
          <a
            style="color: green; text-decoration: underline; cursor: pointer;"
            href="industries/{record.id}.html"
          >
            {record.title}
          </a>
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
