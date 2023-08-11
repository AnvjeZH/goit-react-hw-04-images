import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

const API = '37188095-ba760fd787fe26f9993fba281';

export async function fetchQuery(q, page) {
  try {
    const {data} = await axios({
      params: {
        key: API,
        q,
        image_type: 'photo',
        orientation: 'horizontal',
        page,
        per_page: 12,
      },
    });
    return data
  } catch (error) {
    console.log(error);
  }


}
