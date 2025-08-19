import type { LayoutServerLoad } from "./$types";
import initPocketBase from "$lib/pocketbase";

export const load: LayoutServerLoad = async (event) => {
  let records: object = {};
  let pb: object | null = {};
  let conference: object = {};
  let conferenceImg: string = "";
  let conferenceContent: object = {};

  pb = initPocketBase("https://aecdemo.pockethost.io/");

  conference = await pb.collection("conferences").getOne(event.params.slug);
  conferenceImg = conference.background_image
    ? `${pb.baseURL}api/files/conferences/${conference.id}/${conference.background_image}`
    : "";
  records = await pb.collection("content").getList(1, 2000);
  conferenceContent = records.items.filter((c) =>
    c.conference.includes(event.params.slug)
  );

  return {
    conference,
    conferenceImg,
    conferenceContent,
  };
};
