<script lang="ts">
	// config
	import { PUBLIC_BUILD_TARGET, PUBLIC_POCKETBASE_URL } from '$env/static/public';

	// svelte
	import { goto } from '$app/navigation';

	// ui
	import { SidebarList, Content } from '$lib';

	let { data } = $props();

	function handleEngagementRoute(id: string) {
		if (PUBLIC_BUILD_TARGET === 'tauri') {
			window.location.href = `../engagements/${id}.html`;
		} else {
			goto(`../engagements/${id}`);
		}
	}

	function handleRoute(slug: string) {
		console.log('slug', slug);
		if (PUBLIC_BUILD_TARGET === 'tauri') {
			window.location.href = `/tags/${slug}.html`;
		} else {
			goto(`/tags/${slug}`);
		}
	}
</script>

<SidebarList results={data.industries.items} />
<Content cn="pt-6">
	{#if data.engagementsByIndustry.length}
		<div class="grid grid-cols-3 gap-4">
			{#each data.engagementsByIndustry as item}
				{#if PUBLIC_BUILD_TARGET === 'tauri'}
					<button
						style="color: orange; background: none; border: none; text-decoration: underline; cursor: pointer; padding: 0; font: inherit;"
						onclick={() => handleEngagementRoute(item.id)}
					>
						{item.title}
					</button>
				{:else if PUBLIC_BUILD_TARGET === 'static'}
					<calcite-card label={item.title}>
						<button
							onclick={() => handleEngagementRoute(item.id)}
							class="cursor-pointer border-none bg-transparent text-left"
							slot="thumbnail"
						>
							<img
								alt={item.title}
								class="aspect-video object-cover"
								src={`${PUBLIC_POCKETBASE_URL}api/files/${item.collectionName}/${item.id}/${item.background_image}`}
							/>
						</button>

						<span slot="heading">
							<button
								onclick={() => handleEngagementRoute(item.id)}
								class="bg-tranparent w-full cursor-pointer border-none text-left"
							>
								{item.title}
								{#if item.year}
									({item.year})
								{/if}
							</button>
						</span>
						<div slot="footer-end" class="w-full">
							{#if item.tags.length}
								<div class="flex flex-wrap gap-1">
									{#each item.expand.tags as tag}
										<button onclick={() => handleRoute(tag.slug)} class="cursor-pointer">
											<calcite-chip
												kind="brand"
												class="flex cursor-pointer items-center"
												value="calcite chip"
												scale="s">{tag.title}</calcite-chip
											>
										</button>
									{/each}
								</div>
							{/if}
						</div>
					</calcite-card>
				{:else}
					<calcite-card label={item.title}>
						<button
							onclick={() => handleEngagementRoute(item.id)}
							class="cursor-pointer border-none bg-transparent text-left"
							slot="thumbnail"
						>
							<img
								alt={item.title}
								class="aspect-video object-cover"
								src={`${PUBLIC_POCKETBASE_URL}api/files/${item.collectionName}/${item.id}/${item.background_image}`}
							/>
						</button>

						<span slot="heading">
							<button
								onclick={() => handleEngagementRoute(item.id)}
								class="bg-tranparent w-full cursor-pointer border-none text-left"
							>
								{item.title}
								{#if item.year}
									({item.year})
								{/if}
							</button>
						</span>
						<div slot="footer-end" class="w-full">
							{#if item.tags.length}
								<div class="flex flex-wrap gap-1">
									{#each item.expand.tags as tag}
										<button onclick={() => handleRoute(tag.slug)} class="cursor-pointer">
											<calcite-chip
												kind="brand"
												class="flex cursor-pointer items-center"
												value="calcite chip"
												scale="s">{tag.title}</calcite-chip
											>
										</button>
									{/each}
								</div>
							{/if}
						</div>
					</calcite-card>
				{/if}
			{/each}
		</div>
	{:else}
		<p>Coming soon</p>
	{/if}
</Content>
