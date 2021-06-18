import axios from "axios";

async function goToLink(linkId) {
    try {
        const response = await axios.get(`/api/links/${linkId}`);
        return response;
    } catch (error) {
        console.error("goToLink error", error);
        throw error;
    }
}

export default goToLink;