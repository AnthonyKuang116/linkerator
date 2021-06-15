import axios from 'axios';

const BASE = 'https://localhost:5000'

export async function getLinks() {
  try {
    const { data } = await axios.get(`${BASE}/api/links`);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getLinkById(linkId) {
  try {
    const { data } = await axios.get(`${BASE}/api/links/${linkId}`)
    return data;
  } catch (error) {
    throw error;
  }
}