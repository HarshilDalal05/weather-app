"use client";

import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import useWeather from "./utils/useWeather";

export default function Home() {
  const {
    weather,
    loading,
    error,
    location,
    setLocation,
    temperatureUnit,
    setTemperatureUnit,
  } = useWeather();
  if (loading.weather) return <div>Loading...</div>;
  if (error) return <div>Error : {error}</div>;
  if (!weather) return;
  return (
    <div className="flex min-h-screen flex-col bg-[#0f0f0f] text-white">
      <div className="flex-1 p-6">
        <div className=" flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col ml-2 mb-4">
            <span className="text-lg md:text-xl lg:text-lg">Hi, MyDevPage</span>
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
        <div className="flex flex-col md:flex-row gap-4">
          {weather && (
            <WeatherCard
              weather={weather}
              unit={temperatureUnit}
              onToggle={setTemperatureUnit}
            />
          )}
        </div>
      </div>
    </div>
  );
}
