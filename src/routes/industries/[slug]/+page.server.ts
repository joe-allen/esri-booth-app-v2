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
    const industry = await pb.collection("industries").getOne(params.slug);
    const industryImg = industry.background_image
      ? `${pb.baseURL}/api/files/industries/${industry.id}/${industry.background_image}`
      : "";

    const conferences = await pb.collection("conferences").getList(1, 2000);
    const conferencesByIndustry = conferences.items.filter((c) =>
      c.industries.includes(params.slug)
    );

    return {
      industry,
      industryImg,
      conferencesByIndustry,
    };
  } catch (error) {
    console.error("Failed to load industry data:", error);
    throw error;
  }
};
