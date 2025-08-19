import type { PageLoad } from "./$types";
import initPocketBase from "$lib/pocketbase";

export const prerender = false;
export const ssr = false;

export const load: PageLoad = async ({ params }) => {
  let pb: object | null = {};
  let records: object = {};
  let conference: object = {};
  let conferenceImg: string = "";
  let conferenceContent: object = {};

  pb = initPocketBase("https://aecdemo.pockethost.io/");

  conference = await pb.collection("conferences").getOne(params.slug);
  conferenceImg = conference.background_image
    ? `${pb.baseURL}api/files/conferences/${conference.id}/${conference.background_image}`
    : "";
  records = await pb.collection("content").getList(1, 2000);
  conferenceContent = records.items.filter((c) =>
    c.conference.includes(params.slug)
  );

  return {
    conference,
    conferenceImg,
    conferenceContent,
  };
};
