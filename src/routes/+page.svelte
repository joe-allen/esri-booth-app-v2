<script lang="ts">
	// config
	import { PUBLIC_BUILD_TARGET, PUBLIC_POCKETBASE_URL } from '$env/static/public';

	// svelte
	import { goto } from '$app/navigation';

	// ui
	import { SidebarList, Content } from '$lib';

	let { data } = $props();
	console.log('data', data.engagements);

	function navigateToIndustry(id: string) {
		if (PUBLIC_BUILD_TARGET === 'tauri') {
			window.location.href = `industries/${id}.html`;
		} else {
			goto(`industries/${id}`);
		}
	}
</script>

<!-- THIS WONT WORK ON TAURI DEV: -->
<!-- Welcome, select an
{#if PUBLIC_BUILD_TARGET === 'tauri' || PUBLIC_BUILD_TARGET === 'static'}
	<a href="industries.html">industry.html</a>.
{:else}
	<a href="industries">industry</a>.
{/if} -->

<SidebarList results={data.industries.items} />
<Content cn="pt-6">
	{#if data.engagements.items.length}
		<div class="grid grid-cols-3 gap-4">
			{#each data.engagements.items as item}
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
								{#if item.expand.tags.length > 3}
									<calcite-chip
										class="flex items-center"
										kind="brand"
										value="calcite chip"
										scale="s">2+</calcite-chip
									>
								{:else}
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
							{#if item.background_image}
								<img
									alt={item.title}
									class="aspect-video object-cover"
									src={`${PUBLIC_POCKETBASE_URL}api/files/${item.collectionName}/${item.id}/${item.background_image}`}
								/>
							{:else}
								<img
									class=""
									src="https://dummyimage.com/300x169/141414/fff"
									alt="placeholder 300x168"
									width="300"
									height="168"
								/>
							{/if}
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
								{#if item.expand.tags.length > 3}
									<calcite-chip
										class="flex items-center"
										kind="brand"
										value="calcite chip"
										scale="s">3+</calcite-chip
									>
								{:else}
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
							{/if}
						</div>
					</calcite-card>
				{/if}
			{/each}
		</div>
	{:else}
		<h1 class="text-white">HOME - Ideas for this state (when no industry is selected).</h1>
	{/if}
</Content>
