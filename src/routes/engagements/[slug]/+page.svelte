<script lang="ts">
	// import type { CollectionResponses } from "$lib/pocketbase/pocketbase-types";


	let { data }= $props();
	console.log('data', data);
</script>

<h1>Engagement: {data.engagement.title}</h1>
<h2>Links:</h2>
<ul>
	{#each data.engagement.expand.links as link}
		<li><a href={link.url} rel="nofollow noopener" target="_blank">{link.title}</a></li>
	{/each}
</ul>
<h2>Media:</h2>
<ul>
	{#each data.engagement.expand.media as items}
		<li>
			<span>{items.title}</span>
			<ul>
				{#if items.documents}
					{#each items.documents as item}
						<li>
							<p><strong>Document:</strong></p>
							<a href={item.url}>{item.title}</a>
						</li>
					{/each}
				{/if}
				{#if items.videos}
					{#each items.videos as item}
						<li><p><strong>Video:</strong> {item}</p></li>
					{/each}
				{/if}
				{#if items.images}
					{#each items.images as item}
						<li><p><strong>Image:</strong> {item}</p></li>
					{/each}
				{/if}
			</ul>
		</li>
	{/each}
</ul>
<h2>Tags:</h2>
<ul>
	{#each data.engagement.expand.tags as tag}
		<li><a href={tag.url}>{tag.title}</a></li>
	{/each}
</ul>
<h2>Colors:</h2>
<p>
	<span
		style={`background-color: ${data.engagement.color_primary}; width: 20px; height: 20px; display: inline-block;`}
		>&nbsp;</span
	>
	{data.engagement.color_primary}
</p>
<p>
	<span
		style={`background-color: ${data.engagement.color_secondary}; width: 20px; height: 20px; display: inline-block;`}
		>&nbsp;</span
	>
	{data.engagement.color_secondary}
</p>
<p>
	<span
		style={`background-color: ${data.engagement.color_accent}; width: 20px; height: 20px; display: inline-block;`}
		>&nbsp;</span
	>
	{data.engagement.color_accent}
</p>
<!-- {#if data.engagementContent.length}
  {#each data.engagementContent as item}
    <div
      style="display: flex; flex-direction: column; align-items: start; gap: .5rem;"
    >
      <p><strong>Content:</strong> {item.title}</p>
      <div style="display: flex; align-items: center; gap: .5rem;">
        <strong>Description:</strong>
        {@html item.description}
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
{/if} -->

{#if data.engagementBgImg}
	<div style="display: flex; flex-direction: column; align-items: start; gap: .5rem;">
		<strong>Engagement image:</strong>
		<img src={data.engagementBgImg} width="200" height="112" />
	</div>
{/if}
