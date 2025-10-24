import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

// Dynamically import the appropriate adapter based on BUILD_TARGET
const adapter =
	process.env.BUILD_TARGET === 'static' || process.env.BUILD_TARGET === 'tauri'
		? (await import('@sveltejs/adapter-static')).default
		: (await import('@sveltejs/adapter-vercel')).default;

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter({
			pages: process.env.BUILD_TARGET === 'static' ? 'build-static' : 'build',
			assets: process.env.BUILD_TARGET === 'static' ? 'build-static' : 'build',
			fallback:
				process.env.BUILD_TARGET === 'tauri' || process.env.BUILD_TARGET === 'static'
					? undefined
					: 'index.html',
			precompress: false
		}),
		paths: {
			base: process.env.BUILD_TARGET === 'tauri' ? '' : ''
		},
		prerender: {
			handleHttpError: 'ignore',
			handleMissingId: 'ignore',
			entries: ['*'] // This ensures all static routes are prerendered
		}
	}
};

export default config;
