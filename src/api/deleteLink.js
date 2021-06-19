import axios from "axios";
async function deleteLink(linkId) {
  try {
    const response = await axios.delete(`/api/links/${linkId}`);
    return response;
  } catch (error) {
    console.error("deleteLink", error);
    throw error;
  }
}
export default deleteLink;
