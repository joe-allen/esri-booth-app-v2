import type { LayoutServerLoad } from "./$types";
import initPocketBase from "$lib/pocketbase";

export const load: LayoutServerLoad = async (event) => {
  let pb: object | null = {};
  let conferences: object = {};
  let industries: object = {};

  // if (navigator.onLine) {
  //   pb = initPocketBase("https://aecdemo.pockethost.io/");
  // } else {
  //   pb = initPocketBase("http://127.0.0.1:8090/");
  // }
  pb = initPocketBase("https://aecdemo.pockethost.io/");

  industries = await pb.collection("industries").getList(1, 200);
  conferences = await pb.collection("conferences").getList(1, 200);

  return {
    industries,
    conferences,
  };
};
