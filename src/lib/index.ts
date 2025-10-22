import { browser } from '$app/environment';

// calcite components - client-side only - (dont need exporting)
if (browser) {
	import('@esri/calcite-components/components/calcite-combobox');
	import('@esri/calcite-components/components/calcite-combobox-item');
	import('@esri/calcite-components/components/calcite-button');
	import('@esri/calcite-components/components/calcite-icon');
	import('@esri/calcite-components/components/calcite-fab');
	import('@esri/calcite-components/components/calcite-card');
	import('@esri/calcite-components/components/calcite-chip');
	import('@esri/calcite-components/components/calcite-input');
	import('@esri/calcite-components/components/calcite-action');
	import('@esri/calcite-components/components/calcite-tooltip');
	import('@esri/calcite-components/components/calcite-switch');
}

import Header from '$lib/ui/header.svelte';
import Background from '$lib/ui/background.svelte';
import Content from '$lib/ui/content.svelte';
import SidebarList from '$lib/ui/sidebar-list.svelte';
import SidebarDemos from '$lib/ui/sidebar-demos.svelte';
import SidebarDetails from '$lib/ui/sidebar-details.svelte';

export { Header, Background, Content, SidebarList, SidebarDemos, SidebarDetails };
