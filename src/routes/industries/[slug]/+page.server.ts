import type { PageServerLoad } from "./$types";
import initPocketBase from "$lib/pocketbase";

export const prerender = process.env.BUILD_TYPE === "static" ? true : false;

export const load: PageServerLoad = async ({ params }) => {
  const pb = initPocketBase("https://aecdemo.pockethost.io/");

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
