import type { PageServerLoad } from './$types';

import { PUBLIC_BUILD_TARGET } from '$env/static/public';
import initPocketBase from '$lib/pocketbase';

// export const prerender =
// 	PUBLIC_BUILD_TARGET === 'tauri' || PUBLIC_BUILD_TARGET === 'static' ? true : false;

export const load: PageServerLoad = async ({ params }) => {
	const pb = initPocketBase();

	try {
		const tag = await pb?.collection('tags').getFirstListItem(`slug = "${params.slug}"`);
		const tags = await pb?.collection('tags').getFullList({ sort: 'title' });
		const media = await pb?.collection('media').getList(1, 2000, { expand: 'tags' });
		const mediaByTag = media?.items.filter((e) => e?.tags.includes(tag.id));

		return {
			tag,
			tags,
			mediaByTag
		};
	} catch (error) {
		console.error('Failed to load tag data:', error);
		throw error;
	}
};
