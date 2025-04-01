"use client";

import useWeather from "./utils/useWeather";

export default function Home() {
  const { weather, loading, error } = useWeather();
  if (loading.weather) return <div>Loading...</div>;
  if (error) return <div>Error : {error}</div>;
  if (!weather) return;
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">
        {weather.name}, {weather.sys.country}
      </h1>
      <p className="text-xl">
        {weather.main.temp}°F - {weather.weather[0].description}
      </p>
    </div>
  );
}
