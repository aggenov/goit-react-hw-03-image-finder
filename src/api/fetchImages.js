import axios from 'axios';

const baseURL = 'https://pixabay.com/api/';
const API_KEY = '35688783-f7dd279a2997f488b5e5fbef0';

export const fetchImages = async (nameImage, page) => {
  const params = new URLSearchParams({
    q: nameImage, //поисковое слово
    page: page, //номен страницы
    key: API_KEY, //ключ доступа
    image_type: 'photo', //тип картинки
    orientation: 'horizontal', //ориентация
    per_page: '12', //количество на странице
  });

  const response = await axios.get(`${baseURL}?${params}`);
  return response.data.hits;
};
