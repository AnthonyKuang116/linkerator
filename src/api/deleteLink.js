import axios from "axios";
async function deleteLink(linkId) {
  try {
    const { data } = await axios.delete(`/api/links/${linkId}`);
    return data;
  } catch (error) {
    console.error("deleteLink", error);
    throw error;
  }
}
export default deleteLink;
