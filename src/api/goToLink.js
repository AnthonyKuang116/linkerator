import axios from "axios";

async function goToLink(linkId) {
    try {
        const response = await axios.patch(`/api/links/${linkId}`);
        return response;
    } catch (error) {
        console.error("goToLink error", error);
        throw error;
    }
}

export default goToLink;