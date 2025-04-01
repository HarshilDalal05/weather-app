import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

const weatherApi = {
  // Get current weather for a city
  getCurrentWeather: async (city) => {
    if (!city) return;

    try {
      console.log({ key: API_KEY, url: `${BASE_URL}/weather` });
      const response = await axios.get(`${BASE_URL}/weather`, {
        params: {
          q: city,
          units: "imperial",
          appid: API_KEY,
        },
      });

      return response && response.status === 0 ? response.data : null;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Falied to fetch weather data"
      );
    }
  },

  //Get 5-day forecast for a city
  getForecast: async (city) => {
    if (!city) return;
    try {
      console.log({ key: API_KEY, url: `${BASE_URL}/forecast` });
      const response = await axios.get(`${BASE_URL}/forecast`, {
        params: {
          q: city,
          units: "imperial",
          appid: API_KEY,
        },
      });

      return response && response.status === 0 ? response.data : null;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Falied to fetch weather data"
      );
    }
  },

  // Get weather for multiple cities
  getMultiCitiesWeather: async (cities) => {
    if (cities.length === 0 || !cities) return;
    try {
      console.log({ key: API_KEY, url: `${BASE_URL}/forecast` });
      const promises = cities.map((city) =>
        axios.get(`${BASE_URL}/forecast`, {
          params: {
            q: city,
            units: "imperial",
            appid: API_KEY,
          },
        })
      );

      const response = await Promise.call(promises);

      return response.map((response) =>
        response && response.status === 0 ? response.data : null
      );
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Falied to fetch weather data"
      );
    }
  },
};

export default weatherApi;
