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
    const engagements = await pb.collection("engagements").getOne(params.slug);
    const engagementsImg = engagements.background_image
      ? `${pb.baseURL}api/files/engagements/${engagements.id}/${engagements.background_image}`
      : "";
      
      const links = await pb.collection("links").getList(1, 2000);
      const engagementsLinks = links.items.filter((c) =>
        c.engagements.includes(params.slug)
    );
console.log("engagementsLinks", engagementsLinks);

    // return {
    //   engagements,
    //   engagementsImg,
    //   engagementsLinks,
    // };

    return;
  } catch (error) {
    console.error("Failed to load engagements data:", error);
    throw error;
  }
};
