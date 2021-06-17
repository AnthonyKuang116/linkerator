import axios from "axios";
async function getTags() {
  try {
    const { data } = await axios.get("/api/tags");
    return data;
  } catch (error) {
    throw error;
  }
}

export default getTags;
