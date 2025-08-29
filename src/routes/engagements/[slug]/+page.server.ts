import type { PageServerLoad } from "./$types";

import { PUBLIC_BUILD_TARGET } from "$env/static/public";
import initPocketBase from "$lib/pocketbase";

export const prerender =
  PUBLIC_BUILD_TARGET === "tauri" || PUBLIC_BUILD_TARGET === "static"
    ? true
    : false;

export const load: PageServerLoad = async ({ params }) => {
  const pb = initPocketBase();

  try {
    const engagement = await pb.collection("engagements").getOne(params.slug, {
      expand: 'links, media, tags'
    });
    const engagementBgImg = engagement.background_image
			? `${pb.baseURL}api/files/engagements/${engagement.id}/${engagement.background_image}`
			: '';

    return {
      engagement,
      engagementBgImg
    };

  } catch (error) {
    console.error("Failed to load engagements data:", error);
    throw error;
  }
};
