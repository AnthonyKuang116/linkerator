import axios from 'axios';

const BASE = 'https://localhost:3000'

export async function getLink() {
  try {
    const { data } = await axios.get(`${BASE}/links`);
    return data;
  } catch (error) {
    throw error;
  }
}