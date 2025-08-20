import type { PageServerLoad } from "./$types";
import initPocketBase from "$lib/pocketbase";

export const prerender = true;
console.log("process.env.BASE_PATH", process.env.BASE_PATH);

export const load: PageServerLoad = async ({ params }) => {
  const pb = initPocketBase("https://aecdemo.pockethost.io/");

  try {
    const conference = await pb.collection("conferences").getOne(params.slug);
    const conferenceImg = conference.background_image
      ? `${pb.baseURL}api/files/conferences/${conference.id}/${conference.background_image}`
      : "";

    const records = await pb.collection("content").getList(1, 2000);
    const conferenceContent = records.items.filter((c) =>
      c.conference.includes(params.slug)
    );

    return {
      conference,
      conferenceImg,
      conferenceContent,
    };
  } catch (error) {
    console.error("Failed to load conference data:", error);
    throw error;
  }
};
