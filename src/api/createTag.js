import axios from "axios";
async function createTag(tagName) {
  try {
    const { data } = await axios.post("/api/tags", { name: tagName });
    return data;
  } catch (error) {
    throw error;
  }
}

export default createTag;
