<script lang="ts">
  import initPocketBase from "$lib/pocketbase";
  let pb = initPocketBase("https://aecdemo.pockethost.io/");
  let { data } = $props();
</script>

<h1>Conference: {data.conference.title}</h1>
{#if data.conferenceContent.length}
  {#each data.conferenceContent as item}
    <div
      style="display: flex; flex-direction: column; align-items: start; gap: .5rem;"
    >
      <p><strong>Content:</strong> {item.title}</p>
      <div style="display: flex; align-items: center; gap: .5rem;">
        <strong>Intro:</strong>
        {@html item.intro}
      </div>
      {#if item.file}
        <div style="display: flex; align-items: start; gap: .5rem;">
          <span><strong>Video:</strong> </span>
          <video width="300" muted playsinline autoplay loop>
            <source
              src={`${pb.baseURL}api/files/content/${item.id}/${item.file}`}
              type="video/mp4"
            />
          </video>
        </div>
      {/if}
    </div>
    <hr />
  {/each}
{:else}
  <p>No content... Coming soon.</p>
{/if}

{#if data.conferenceImg}
  <div
    style="display: flex; flex-direction: column; align-items: start; gap: .5rem;"
  >
    <strong>Conference image:</strong>
    <img src={data.conferenceImg} width="200" height="112" />
  </div>
{/if}
