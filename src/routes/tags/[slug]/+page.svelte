<script lang="ts">
	import { PUBLIC_BUILD_TARGET } from '$env/static/public';
	import { goto } from '$app/navigation';

	// ui
	import { SidebarList, Content } from '$lib';

	// api
	import { PUBLIC_POCKETBASE_URL } from '$env/static/public';

	let { data } = $props();

	function handleMediaRoute(id: string) {
		if (PUBLIC_BUILD_TARGET === 'tauri') {
			window.location.href = `../media/${id}.html`;
		} else {
			goto(`../media/${id}`);
		}
	}
</script>

<SidebarList results={data.tags} {data} />

<Content cn="pt-6">
	{#if data.mediaByTag.length}
		<div class="grid grid-cols-3 gap-4">
			{#each data.mediaByTag as item}
				{#if PUBLIC_BUILD_TARGET === 'tauri'}
					<button
						style="color: orange; background: none; border: none; text-decoration: underline; cursor: pointer; padding: 0; font: inherit;"
						onclick={() => handleMediaRoute(item.id)}
					>
						{item.title}
					</button>
				{:else if PUBLIC_BUILD_TARGET === 'static'}
					<calcite-card label={item.title}>
						<button
							onclick={() => handleMediaRoute(item.id)}
							class="cursor-pointer border-none bg-transparent text-left"
							slot="thumbnail"
						>
							<img
								alt={item.title}
								class="aspect-video object-cover"
								src={`${PUBLIC_POCKETBASE_URL}api/files/media/${item.id}/${item.image}`}
							/>
						</button>

						<span slot="heading">
							<button
								onclick={() => handleMediaRoute(item.id)}
								class="bg-tranparent w-full cursor-pointer border-none text-left"
							>
								{item.title}
								{#if item.year}
									({item.year})
								{/if}
							</button>
						</span>
					</calcite-card>
				{:else}
					<calcite-card label={item.title}>
						<button
							onclick={() => handleMediaRoute(item.id)}
							class="cursor-pointer border-none bg-transparent text-left"
							slot="thumbnail"
						>
							<img
								alt={item.title}
								class="aspect-video object-cover"
								src={`${PUBLIC_POCKETBASE_URL}api/files/media/${item.id}/${item.image}`}
							/>
						</button>

						<span slot="heading">
							<button
								onclick={() => handleMediaRoute(item.id)}
								class="bg-tranparent w-full cursor-pointer border-none text-left"
							>
								{item.title}
								{#if item.year}
									({item.year})
								{/if}
							</button>
						</span>
					</calcite-card>
				{/if}
			{/each}
		</div>
	{:else}
		<p class="text-white">
			Sorry, this is no media with the tag of <strong>{data.tag.title}</strong>
		</p>
	{/if}
</Content>
