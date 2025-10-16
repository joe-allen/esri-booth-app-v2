import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

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
			handleHttpError: 'warn',
			handleMissingId: 'warn',
			entries: ['*'] // This ensures all static routes are prerendered
		}
	}
};

export default config;
