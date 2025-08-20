import initPocketBase from "$lib/pocketbase";

export const prerender = true;

// This function tells SvelteKit which dynamic routes to prerender
export async function entries() {
  const pb = initPocketBase("https://aecdemo.pockethost.io/");

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
