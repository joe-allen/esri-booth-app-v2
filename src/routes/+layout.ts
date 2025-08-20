export const ssr = process.env.BUILD_TYPE === "static" ? true : false;
export const prerender = process.env.BUILD_TYPE === "static" ? true : false;
