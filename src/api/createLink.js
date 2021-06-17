import axios from "axios";
async function createLink({ link, comment, tagId }) {
  try {
    const { data } = await axios.post("/api/links", {
      tagId,
      link,
      clickCount: 0,
      comment,
      dateShared: new Date(),
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export default createLink;
