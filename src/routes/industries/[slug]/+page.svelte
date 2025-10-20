<script lang="ts">
	import { PUBLIC_BUILD_TARGET } from '$env/static/public';
	import { goto } from '$app/navigation';

	// ui
	import { SidepanelIndustries, Content } from '$lib';

	// api
	import { PUBLIC_POCKETBASE_URL } from '$env/static/public';

	// svelte
	import { page } from '$app/state';
	import { flip } from 'svelte/animate';
	import { cubicOut } from 'svelte/easing';

	let { data } = $props();

	function handleEngagementRoute(id: string) {
		if (PUBLIC_BUILD_TARGET === 'tauri') {
			window.location.href = `../engagements/${id}.html`;
		} else {
			goto(`../engagements/${id}`);
		}
	}
</script>

<SidepanelIndustries {data} />
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
						<a
							href={`/demo/${item.id}`}
							class="bg-transparent border-none text-left cursor-pointer"
							slot="thumbnail"
						>
							<img
								alt={item.title}
								class="aspect-video object-cover"
								src={`${PUBLIC_POCKETBASE_URL}api/files/${item.collectionName}/${item.id}/${item.background_image}`}
							/>
						</a>

						<span slot="heading">
							<a
								href={`/demo/${item.id}`}
								class="border-none text-left cursor-pointer bg-tranparent w-full"
							>
								{item.title}
							</a>
						</span>
						<div slot="footer-end" class="w-full">
							{#if item.tags.length}
								<div class="flex flex-wrap gap-1">
									{#each item.expand.tags as tag}
										<calcite-chip
											kind="brand"
											class="flex items-center"
											value="calcite chip"
											scale="s">{tag.title}</calcite-chip
										>
									{/each}
								</div>
							{/if}
						</div>
					</calcite-card>
				{:else}
					<calcite-card label={item.title}>
						<button
							onclick={() => handleEngagementRoute(item.id)}
							class="bg-transparent border-none text-left cursor-pointer"
							slot="thumbnail"
						>
							<img
								alt={item.title}
								class="aspect-video object-cover"
								src={`${PUBLIC_POCKETBASE_URL}api/files/engagements/${item.id}/${item.background_image}`}
							/>
						</button>

						<span slot="heading">
							<button
								onclick={() => handleEngagementRoute(item.id)}
								class="border-none text-left cursor-pointer bg-tranparent w-full"
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
										<calcite-chip
											kind="brand"
											class="flex items-center"
											value="calcite chip"
											scale="s">{tag.title}</calcite-chip
										>
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
