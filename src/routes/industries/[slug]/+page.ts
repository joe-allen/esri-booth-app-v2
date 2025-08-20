import { PUBLIC_BUILD_TARGET } from "$env/static/public";
import initPocketBase from "$lib/pocketbase";

export const prerender =
  PUBLIC_BUILD_TARGET === "static" || PUBLIC_BUILD_TARGET === "tuari"
    ? true
    : false;

// This function tells SvelteKit which dynamic routes to prerender
export async function entries() {
  const pb = initPocketBase();

  try {
    const industries = await pb.collection("industries").getList(1, 1000);
    return industries.items.map((industry) => ({
      slug: industry.id,
    }));
  } catch (error) {
    console.error("Failed to fetch industries for prerendering:", error);
    return [];
  }
}
