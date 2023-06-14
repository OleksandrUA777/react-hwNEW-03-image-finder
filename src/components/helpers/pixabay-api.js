import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '33019590-ab19fb063f714cb66ad378ea8';

export async function fetchImages(q, page) {
  try {
    const resp = await axios.get(
      `${BASE_URL}?key=${KEY}&q=${q}&page=${page}&per_page=12`
    );
    return resp.data.hits;
  } catch (error) {
    console.log(error.message);
  }
}
