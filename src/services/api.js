import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
});

// Lembre-se: Sua chave deve estar no arquivo .env na raiz do projeto!
// Exemplo no .env: VITE_API_KEY=sua_chave_aqui
const API_KEY = import.meta.env.VITE_API_KEY; 

export const getWeather = async (city) => {
  try {
    const response = await api.get(`/weather?q=${city}&units=metric&lang=pt_br&appid=${API_KEY}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar clima atual:", error);
    throw error; // Repassa o erro para o App tratar
  }
};

export const getForecast = async (city) => {
  try {
    const response = await api.get(`/forecast?q=${city}&units=metric&lang=pt_br&appid=${API_KEY}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar previsão:", error);
    throw error;
  }
};