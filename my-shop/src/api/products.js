import axios from 'axios';

// Базовый URL для mock API (json-server)
const API_URL = 'http://localhost:3001/products';

// Функция для загрузки товаров
export const fetchProducts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data; // Возвращаем данные товаров
  } catch (error) {
    console.error('Ошибка при загрузке товаров:', error);
    throw error; // Пробрасываем ошибку, чтобы обработать её в компоненте
  }
};