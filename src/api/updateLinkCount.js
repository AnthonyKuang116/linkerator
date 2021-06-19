import axios from "axios";
async function updateLinkClickCount(linkId) {
  try {
    const { data } = await axios.patch(`/api/links/${linkId}`);
    return data;
  } catch (error) {
    throw error;
  }
}

export default updateLinkClickCount;
