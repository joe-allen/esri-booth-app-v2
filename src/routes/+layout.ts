import { PUBLIC_BUILD_TARGET } from '$env/static/public';

export const ssr =
	PUBLIC_BUILD_TARGET === 'tauri' || PUBLIC_BUILD_TARGET === 'static' ? true : false;
export const prerender =
	PUBLIC_BUILD_TARGET === 'tauri' || PUBLIC_BUILD_TARGET === 'static' ? true : false;
