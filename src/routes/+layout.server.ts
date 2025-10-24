import type { LayoutServerLoad } from './$types';
import initPocketBase from '$lib/pocketbase';

export const load: LayoutServerLoad = async (event) => {
	let pb: object | null = {};
	let engagements: object = {};
	let industries: object = {};

	// if (navigator.onLine) {
	//   pb = initPocketBase();
	// } else {
	//   pb = initPocketBase("http://127.0.0.1:8090/");
	// }
	pb = initPocketBase();
	const a = await pb.settings.testS3('backups');
	console.log('a', a);

	industries = await pb.collection('industries').getList(1, 100);
	engagements = await pb.collection('engagements').getList(1, 100, { expand: 'tags' });

	return {
		industries,
		engagements
	};
};
