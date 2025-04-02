import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

const weatherApi = {
  //Get current location weather
  getCurrentLocationWeather: async (lat, long) => {
    if (!lat || !long) return;

    try {
      const response = await axios.get(
        `${BASE_URL}/weather?lat=${lat}&lon=${long}`,
        {
          params: {
            units: "imperial",
            appid: API_KEY,
          },
        }
      );

      return response && response.status === 200 ? response.data : null;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Falied to fetch weather data"
      );
    }
  },

  // Get current weather for a city
  getCurrentWeather: async (city) => {
    if (!city) return;

    try {
      const response = await axios.get(`${BASE_URL}/weather`, {
        params: {
          q: city,
          units: "imperial",
          appid: API_KEY,
        },
      });
      return response && response.status === 200 ? response.data : null;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Falied to fetch weather data"
      );
    }
  },

  //Get 5-day forecast for a current location
  getCurrentLocationForecast: async (lat, long) => {
    if (!lat || !long) return;

    try {
      const response = await axios.get(
        `${BASE_URL}/forecast?lat=${lat}&lon=${long}`,
        {
          params: {
            units: "imperial",
            appid: API_KEY,
          },
        }
      );
      return response && response.status === 200 ? response.data : null;
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
      const response = await axios.get(`${BASE_URL}/forecast`, {
        params: {
          q: city,
          units: "imperial",
          appid: API_KEY,
        },
      });
      return response && response.status === 200 ? response.data : null;
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
      const promises = cities.map((city) =>
        axios.get(`${BASE_URL}/weather`, {
          params: {
            q: city,
            units: "imperial",
            appid: API_KEY,
          },
        })
      );
      const response = await Promise.all(promises);
      return response.map((response) => (response ? response.data : null));
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Falied to fetch weather data"
      );
    }
  },
};

export default weatherApi;
