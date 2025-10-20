<script lang="ts">
	let {
		children,
		cn,
		sidePanelIsVisible
	}: { children: any; cn?: string; sidePanelIsVisible: boolean } = $props();
</script>

<section class={[cn, sidePanelIsVisible ? 'main-content-w-full' : '']}>
	{@render children?.()}
</section>

<style>
	section {
		overflow-y: auto;
	}
</style>
