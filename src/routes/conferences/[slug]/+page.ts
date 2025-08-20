import { PUBLIC_BUILD_TARGET } from "$env/static/public";
import initPocketBase from "$lib/pocketbase";

export const prerender =
  PUBLIC_BUILD_TARGET === "static" || PUBLIC_BUILD_TARGET === "file"
    ? true
    : false;

// This function tells SvelteKit which dynamic routes to prerender
export async function entries() {
  const pb = initPocketBase();

  try {
    const conferences = await pb.collection("conferences").getList(1, 1000);
    return conferences.items.map((conference) => ({
      slug: conference.id,
    }));
  } catch (error) {
    console.error("Failed to fetch conferences for prerendering:", error);
    return [];
  }
}
