import type { LayoutServerLoad } from "./$types";
import initPocketBase from "$lib/pocketbase";

export const load: LayoutServerLoad = async (event) => {
  let pb: object | null = {};
  let industry: object = {};
  let industryImg: string = "";
  let conferences: object = {};
  let conferencesByIndustry: object = {};

  pb = initPocketBase("https://aecdemo.pockethost.io/");

  industry = await pb.collection("industries").getOne(event.params.slug);
  industryImg = industry.background_image
    ? `${pb.baseURL}/api/files/industries/${industry.id}/${industry.background_image}`
    : "";
  conferences = await pb.collection("conferences").getList(1, 2000);
  conferencesByIndustry = conferences.items.filter((c) =>
    c.industries.includes(event.params.slug)
  );

  return {
    industry,
    industryImg,
    conferencesByIndustry,
  };
};
