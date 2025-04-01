import React from "react";
import moment from "moment-timezone";
import { FaMapMarkedAlt, FaRegEye, FaWind } from "react-icons/fa";
import { WiBarometer, WiHumidity } from "react-icons/wi";
import { convertTemperature, formatTemperature } from "../utils/temperature";
import TemperatureToggle from "./TemperatureToggle";

const LocationHeader = ({ name, country }) => {
  return (
    <div className="flex items-center p-2 rounded-lg bg-[#363636]">
      <FaMapMarkedAlt className="text-sm md:text-lg mr-2 text-gray-300" />
      <h2 className="text-sm md:text-lg font-normal">
        {name},{country}
      </h2>
    </div>
  );
};

const DateDisplay = ({ date }) => {
  <div className="text-left mb-4">
    <h3 className="md:text-3xl text-xl font-semibold">
      {date.format("ddddd")}
    </h3>
    <h3 className="md:text-xl text-md mt-2 text-gray-300">
      {date.format("DD MM,YYYY")}
    </h3>
  </div>;
};

const WeatherIcon = ({ icon, description }) => {
  return (
    <div>
      <img
        src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
        alt={description}
        className="w-24 h-24 md:w-36 md:h-36 mb-4"
      />
    </div>
  );
};

const WeatherDetails = ({ wind, humidity, pressure, visibility }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="flex items-center gap-2 text-gray-300">
        <FaWind className="text-lg" /> <span>{wind} m/s</span>
      </div>
      <div className="flex items-center gap-2 text-gray-300">
        <WiHumidity className="text-lg" /> <span>{humidity} %</span>
      </div>
      <div className="flex items-center gap-2 text-gray-300">
        <WiBarometer className="text-lg" /> <span>{pressure} hPa</span>
      </div>
      <div className="flex items-center gap-2 text-gray-300">
        <FaRegEye className="text-lg" />
        <span>{(visibility / 1000).toFixed(1)} km</span>
      </div>
    </div>
  );
};

const TemperatureDisplay = ({ temp, feelsLike, description, unit }) => {
  return (
    <div className="text-center">
      <div className="md:text-6xl text 4-xl text-right font-bold">
        {formatTemperature(temp, unit)}
      </div>
      <div className="text-2xl text-right text-gray-200">
        {formatTemperature(feelsLike, unit)}
      </div>
      <div className="md:text-2xl text-xl capitalize mt-2 text-right">
        {description}
      </div>
      <div className="mt-2 text-right text-gray-200">
        Feels like {formatTemperature(feelsLike, unit)}
      </div>
    </div>
  );
};

const WeatherCard = ({ weather, unit, onToggle }) => {
  if (!weather) return null;

  const {
    main,
    weather: weatherData,
    name,
    sys,
    timezone,
    wind,
    visibility,
  } = weather;

  const weatherIcon = weatherData[0]?.icon;
  const weatherDescription = weatherData[0]?.description;

  const timeZoneName = moment.tz.guess();
  const date = moment().tz(timeZoneName);

  const temp = convertTemperature(main.temp, unit);
  const feelsLike = convertTemperature(main.feels_like, unit);

  return (
    <div className="rounded-xl p-6 flex-1 shadow-lg bg-[#1e1e1e] text-white">
      <div className="flex justify-between items-center mb-4">
        <LocationHeader name={name} country={sys.country} />
        <TemperatureToggle unit={unit} onToggle={onToggle} />
      </div>
      <DateDisplay date={date} />
      <div className="flex justify-center items-center">
        <WeatherIcon icon={weatherIcon} description={weatherDescription} />
        <TemperatureDisplay
          temp={temp}
          feelsLike={feelsLike}
          description={weatherDescription}
          unit={unit}
        />
      </div>
      <WeatherDetails
        wind={wind.speed}
        humidity={main.humidity}
        pressure={main.pressure}
        visibility={visibility}
      />
    </div>
  );
};

export default WeatherCard;
