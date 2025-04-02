"use client";

import Highlights from "./components/Highlights";
import SearchBar from "./components/SearchBar";
import WeatherApp from "./components/WeatherApp";
import WeatherCard from "./components/WeatherCard";
import WeatherList from "./components/WeatherList";
import useWeather from "./utils/useWeather";

export default function Home() {
  const {
    weather,
    loading,
    error,
    location,
    forecast,
    temperatureUnit,
    citiesWeather,
    setCitiesWeather,
    highlights,
    setLocation,
    setTemperatureUnit,
  } = useWeather();

  const handleAddCity = async (cityName) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`
      );

      if (!response.ok) {
        throw new Error("City not found");
      }

      const newCity = await response.json();

      if (citiesWeather.some((city) => city.id === newCity.id)) {
        throw new Error("City Already in Liast");
      }
      setCitiesWeather((prev) => [...prev, newCity]);
    } catch (error) {
      throw new Error("Error in adding city :", error.message);
    }
  };

  const handleRemoveCity = (cityId) => {
    setCitiesWeather((prev) => prev.filter((city) => city.id !== cityId));
  };
  return (
    <div className="flex min-h-screen flex-col bg-gray-950 text-white">
      <div className="flex-1 p-6">
        <div className=" flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col ml-2 mb-4">
            <span className="text-lg md:text-xl lg:text-lg">Hi, Harshil</span>
            <span className="text-sm md:text-md lg:text-xl font-bold">
              Good Morning
            </span>
          </div>
          <div className="flex items-center gap-4 mb-4">
            <SearchBar setLocation={setLocation} />
          </div>
        </div>
        {error && (
          <div className="bg-red-500/19 border-red-500 text-red-500 px-4 py-2 rounded-lg mb-4">
            {error}
          </div>
        )}
        <div className="flex flex-col md:flex-row gap-4 my-10">
          {weather && (
            <WeatherCard
              weather={weather}
              unit={temperatureUnit}
              onToggle={setTemperatureUnit}
            />
          )}
          {highlights && <Highlights highlights={highlights} />}
        </div>
        <div>
          <div className="my-10">
            <WeatherList
              citiesWeather={citiesWeather}
              loading={loading.cities}
              unit={temperatureUnit}
              onAddCity={handleAddCity}
              onRemoveCity={handleRemoveCity}
            />
          </div>
          <div className="my-10">
            <WeatherApp
              forecast={forecast}
              loading={loading.forecast}
              unit={temperatureUnit}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
