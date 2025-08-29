<script lang="ts">
  import { PUBLIC_BUILD_TARGET } from "$env/static/public";
  import { goto } from "$app/navigation";

  let { data } = $props();

  function navigateToEngagement(id: string) {
    if (PUBLIC_BUILD_TARGET === "tauri") {
      window.location.href = `../engagements/${id}.html`;
    } else {
      goto(`../engagements/${id}`);
    }
  }
</script>

<h1>{data.industry.title}</h1>
{#if data.engagementsByIndustry.length}
  <h2>engagements</h2>
  {#each data.engagementsByIndustry as item}
    <div>
      {#if PUBLIC_BUILD_TARGET === "tauri"}
        <button
          style="color: orange; background: none; border: none; text-decoration: underline; cursor: pointer; padding: 0; font: inherit;"
          onclick={() => navigateToEngagement(item.id)}
        >
          {item.title}
        </button>
      {:else if PUBLIC_BUILD_TARGET === "static"}
        <p>
          <a
            style="color: green; text-decoration: underline; cursor: pointer;"
            href="../engagements/{item.id}.html"
          >
            {item.title}
          </a>
        </p>
      {:else}
        <a style="color: #c00;" href={`../engagements/${item.id}`}
          >{item.title}</a
        >
      {/if}
    </div>
    <hr />
  {/each}
{:else}
  <p>No content... Coming soon.</p>
{/if}

{#if data.industryImg}
  <img src={data.industryImg} width="200" height="112" />
{/if}
