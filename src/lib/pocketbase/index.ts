import { type TypedPocketBase } from "./pocketbase-types";

import PocketBase from "pocketbase";
import { PUBLIC_POCKETBASE_URL } from "$env/static/public";

export default function initPocketBase() {
  try {
    const pb = new PocketBase(PUBLIC_POCKETBASE_URL) as TypedPocketBase;
    return pb;
  } catch (error) {
    console.log("Error initializing database: ", error);
    return null;
  }
}
