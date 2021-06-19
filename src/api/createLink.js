import axios from "axios";
async function createLink({ link, comment, tags }) {
  try {
    const { data } = await axios.post("/api/links", {
      link,
      clickCount: 0,
      comment,
      dateShared: new Date(),
      tags,
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export default createLink;
