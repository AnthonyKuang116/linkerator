import axios from "axios";

export async function getLinks() {
  try {
    const { data } = await axios.get(`/api/links`);

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
export { default as updateLinkClickCount } from "./updateLinkCount";
export { default as deleteLink } from "./deleteLink";
