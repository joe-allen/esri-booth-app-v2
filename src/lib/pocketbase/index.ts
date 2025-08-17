import { type TypedPocketBase } from "./pocketbase-types";
import PocketBase from "pocketbase";

export default function initPocketBase(url: string) {
  try {
    const pb = new PocketBase(url) as TypedPocketBase;
    return pb;
  } catch (error) {
    console.log("Error initializing database: ", error);
    return null;
  }
}
