import type { PageServerLoad } from './$types';

import { PUBLIC_BUILD_TARGET } from '$env/static/public';
import initPocketBase from '$lib/pocketbase';

// export const prerender =
// 	PUBLIC_BUILD_TARGET === 'tauri' || PUBLIC_BUILD_TARGET === 'static' ? true : false;

export const load: PageServerLoad = async ({ params }) => {
	const pb = initPocketBase();

	try {
		const media = await pb?.collection('media').getFirstListItem(`id = "${params.slug}"`);

		return {
			media
		};
	} catch (error) {
		console.error('Failed to load media data:', error);
		throw error;
	}
};
