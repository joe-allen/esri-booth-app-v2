import { PUBLIC_BUILD_TARGET } from '$env/static/public';
import initPocketBase from '$lib/pocketbase';

// export const prerender =
// 	PUBLIC_BUILD_TARGET === 'tauri' || PUBLIC_BUILD_TARGET === 'static' ? true : false;

// This function tells SvelteKit which dynamic routes to prerender
export async function entries() {
	const pb = initPocketBase();

	try {
		const media = await pb.collection('media').getList(1, 1000);
		return media.items.map((mediaItem) => ({
			slug: mediaItem.id
		}));
	} catch (error) {
		console.error('Failed to fetch media for prerendering:', error);
		return [];
	}
}
