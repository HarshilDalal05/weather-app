"use client";

import React from "react";
import moment from "moment-timezone";
import { FaWind } from "react-icons/fa";
import { convertTemperature, formatTemperature } from "../utils/temperature";

const LoadingState = () => {
  return (
    <div className="animate-pulse">
      <div className="h-8 bg-gray-700 rounded w-1/4 mb-4"> </div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[...Array(5)].map((_, i) => {
          return (
            <div key={i} className="bg-gray-700 rounded-lg p-4 h-32"></div>
          );
        })}
      </div>
    </div>
  );
};

const ForecastCard = ({ day, unit }) => {
  const date = moment(day.dt * 1000);
  const temp = convertTemperature(day.main.temp, unit);
  const minTemp = convertTemperature(day.main.temp_min, unit);
  const maxTemp = convertTemperature(day.main.temp_max, unit);
  const weatherIcon = day.weather[0]?.icon;
  const description = day.weather[0]?.description;

  return (
    <div className="bg-[#1e1e1e] rounded-lg p-4 flex flex-col items-center">
      <div className="text-sm text-gray-300"> {date.format("ddd")}</div>
      <div className="text-sm text-gray-400"> {date.format("MMM D")}</div>
      <img
        src={`https://openweathermap.org/img/wn/${weatherIcon}.png`}
        alt={description}
        className="w-12 h-12 my-2"
      />
      <div className="text-sm font-semibold">
        {formatTemperature(temp, unit)}
      </div>
      <div className="text-xs font-semibold">
        {formatTemperature(minTemp, unit)} / {formatTemperature(maxTemp, unit)}
      </div>
      <div className="text-xs text-gray-400 capitalize mt-1">{description}</div>
      <div className="flex items-center gap-1 text-xs text-gray-300 mt-2">
        <FaWind className="text-xs" />
        <span>{day.wind.speed}</span>
      </div>
    </div>
  );
};

const WeatherApp = ({ forecast, loading, unit }) => {
  if (loading) return <LoadingState />;
  if (!forecast) return null;
  return (
    <div className="flex- 1 bg-[#1e1e1e] rounded-xl p-6">
      <h2 className="text-xl font-semibold mb-4">5-Day Forecast</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {forecast.map((day, index) => {
          return <ForecastCard key={day.dt} day={day} unit={unit} />;
        })}
      </div>
    </div>
  );
};

export default WeatherApp;
