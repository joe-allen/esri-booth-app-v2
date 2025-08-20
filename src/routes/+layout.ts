import { PUBLIC_BUILD_TARGET } from "$env/static/public";

console.log("VITE: ", PUBLIC_BUILD_TARGET);
// console.log("Process: ", process.env.BUILD_TARGET);

export const ssr =
  PUBLIC_BUILD_TARGET === "static" || PUBLIC_BUILD_TARGET === "file"
    ? true
    : false;
export const prerender =
  PUBLIC_BUILD_TARGET === "static" || PUBLIC_BUILD_TARGET === "file"
    ? true
    : false;
