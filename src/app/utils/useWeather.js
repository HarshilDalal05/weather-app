import { useState, useEffect } from "react";
import weatherApi from "./weatherApi";

const useWeather = (initialLocation = "New York") => {
  const [weather, setWeather] = useState(null);
  const [highlights, setHighlights] = useState(null);
  const [location, setLocation] = useState(initialLocation || "");
  const [forecast, setForcast] = useState(null);
  const [citiesWeather, setCitiesWeather] = useState([]);
  const [temperatureUnit, setTemperatureUnit] = useState("F");
  const [loading, setLoading] = useState({
    weather: true,
    forcast: true,
    cities: true,
  });
  const [error, setError] = useState(null);
  const [cities, setCities] = useState(["London", "Tokyo"]);

  const processHighlights = (data) => {
    const { wind, main, visibility, sys } = data;

    return {
      wind: wind?.speed,
      humidity: main?.humidity,
      uv: 0,
      visibility: (visibility / 1000).toFixed(1),
      sunrise: new Date(sys.sunrise * 1000).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      sunset: new Date(sys.sunset * 1000).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  };

  const fetchWeatherData = async () => {
    try {
      setError(null);
      setLoading((prev) => ({ ...prev, weather: true }));
      const weatherData = await weatherApi?.getCurrentWeather(location);
      setWeather(weatherData);

      setHighlights(processHighlights(weatherData));
    } catch (error) {
      setError(error?.message);
      console.error("Error fetching weather : ", error);
    } finally {
      setLoading((prev) => ({ ...prev, weather: false }));
    }
  };

  const fetchForecastData = async () => {
    try {
      setLoading((prev) => ({ ...prev, weather: true }));
      const forecastData = await weatherApi?.getForecast(location);
      const dailyForecasts = forecastData?.list
        .filter((item, index) => index % 8 === 0)
        .slice(0, 5);

      setForcast(dailyForecasts);
    } catch (error) {
      setError(error?.message);
      console.error("Error fetching forecast : ", error);
    } finally {
      setLoading((prev) => ({ ...prev, forecast: false }));
    }
  };

  const fetchCitiesWeatherData = async () => {
    try {
      setLoading((prev) => ({ ...prev, cities: true }));
      const weatherData = await weatherApi?.getMultiCitiesWeather(cities);
      setCitiesWeather(weatherData);
    } catch (error) {
      setError(error?.message);
      console.error("Error fetching cities weather : ", error);
    } finally {
      setLoading((prev) => ({ ...prev, cities: false }));
    }
  };

  useEffect(() => {
    fetchWeatherData();
    fetchForecastData();
  }, [location]);

  useEffect(() => {
    fetchCitiesWeatherData();
  }, [cities]);

  return {
    weather,
    highlights,
    location,
    setLocation,
    forecast,
    citiesWeather,
    setCitiesWeather,
    temperatureUnit,
    setTemperatureUnit,
    loading,
    error,
  };
};

export default useWeather;
