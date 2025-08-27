<script lang="ts">
  import { PUBLIC_BUILD_TARGET } from "$env/static/public";
  import { goto } from "$app/navigation";

  let { data } = $props();

  function navigateToConference(id: string) {
    if (PUBLIC_BUILD_TARGET === "tauri") {
      window.location.href = `../conferences/${id}.html`;
    } else {
      goto(`../conferences/${id}`);
    }
  }
</script>

<h1>{data.industry.title}</h1>
{#if data.conferencesByIndustry.length}
  <h2>Conferences</h2>
  {#each data.conferencesByIndustry as item}
    <div>
      {#if PUBLIC_BUILD_TARGET === "tauri"}
        <button
          style="color: orange; background: none; border: none; text-decoration: underline; cursor: pointer; padding: 0; font: inherit;"
          onclick={() => navigateToConference(item.id)}
        >
          {item.title}
        </button>
      {:else if PUBLIC_BUILD_TARGET === "static"}
        <p>
          <a
            style="color: green; text-decoration: underline; cursor: pointer;"
            href="../conferences/{item.id}.html"
          >
            {item.title}
          </a>
        </p>
      {:else}
        <a style="color: #c00;" href={`../conferences/${item.id}`}
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
