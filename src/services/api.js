import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
});

const API_KEY = import.meta.env.VITE_API_KEY; 

export const getWeather = async (city) => {
  try {
    const response = await api.get(`/weather?q=${city}&units=metric&lang=pt_br&appid=${API_KEY}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar clima atual:", error);
    throw error;
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