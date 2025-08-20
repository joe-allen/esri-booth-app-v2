import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://svelte.dev/docs/kit/integrations
  // for more information about preprocessors
  preprocess: vitePreprocess(),

  kit: {
    adapter: adapter({
      fallback: 'index.html'
    }),
    prerender: {
      handleHttpError: 'warn',
      handleMissingId: 'warn',
      entries: ['*'] // This ensures all static routes are prerendered
    },
    paths: {
      base: process.argv.includes('dev') ? '' : '/Users/jos13577/Documents/Suitcase/customers/esri/aec_demo/app/build'
    },
    router: {
      type: 'hash'
    }
  }
};

export default config;
