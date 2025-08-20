import initPocketBase from '$lib/pocketbase';

export const prerender = true;

// This function tells SvelteKit which dynamic routes to prerender
export async function entries() {
  const pb = initPocketBase("https://aecdemo.pockethost.io/");

  try {
    const conferences = await pb.collection("conferences").getList(1, 1000);
    return conferences.items.map((conference) => ({
      slug: conference.id
    }));
  } catch (error) {
    console.error('Failed to fetch conferences for prerendering:', error);
    return [];
  }
}