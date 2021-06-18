import axios from "axios";
import GetTags from "./getTags";

const BASE = "localhost:5000";

export async function getLinks() {
  try {
    const { data } = await axios.get(`api/links`);

    return data;
  } catch (error) {
    throw error;
  }
}

export async function getLinkById(linkId) {
  try {
    const { data } = await axios.get(`api/links/${linkId}`);
    return data;
  } catch (error) {
    throw error;
  }
}


export { default as createTag } from "./createTag";
export { default as getTags } from "./getTags";
export { default as createLink } from "./createLink";
export { default as deleteLink} from "./deleteLink";
export { default as goToLink} from "./goToLink";
export { default as linkCount} from "./linkCount";
