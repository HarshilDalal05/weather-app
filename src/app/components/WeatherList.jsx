import React, { useState } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";
import { convertTemperature, formatTemperature } from "../utils/temperature";

const LoadingState = () => {
  return (
    <div className="animate-pulse">
      <div className="h-8 bg-gray-700 rounded w-1/4 mb-4"> </div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[...Array(2)].map((_, i) => {
          return (
            <div key={i} className="bg-gray-700 rounded-lg p-4 h-32"></div>
          );
        })}
      </div>
    </div>
  );
};

const CityWeatherCard = ({ city, unit, onRemove, setLocation }) => {
  const temp = convertTemperature(city?.main?.temp, unit);
  const weatherIcon = city.weather[0]?.icon;
  const description = city.weather[0]?.description;
  return (
    <div
      className="bg-[#1e1e1e] rounded-lg p-4 relative group"
      onClick={() => {
        setLocation(city.name);
      }}
    >
      <button
        onClick={() => onRemove(city.id)}
        className="absolute top-0 right-2 text-gray-400 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="Remove city"
      >
        <FaTimes />
      </button>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">{city.name}</h3>
          <h3 className="text-sm text-gray-400">{city.sys.country}</h3>
        </div>
        <img
          src={`https://openweathermap.org/img/wn/${weatherIcon}.png`}
          alt={description}
          className="w-12 h-12 mx-auto mt-2"
        />
        <div className="text-right">
          <div className="text-xl font-bold">
            {formatTemperature(temp, unit)}
          </div>
          <div className="text-sm text-gray-400 capitalize">{description}</div>
        </div>
      </div>
    </div>
  );
};

const AddCityModel = ({ isOpen, onClose, onAdd, isLoading }) => {
  const [cityName, setCityName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!cityName.trim()) return;
    onAdd(cityName.trim());
    setCityName("");
    onClose();
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-8 bg-black bg-opacity-50 flex items-center justify-center z-58">
      <div className="bg-[#1e1e1e] rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Add New city</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
            placeholder="Enter city name ...."
            className="w-full py-2 px-4 rounded-lg bg-[#363636] text-white border border-gray-700 focus:outline-none focus:ring-2 focus: ring-blue-500 mb-4"
          />
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-400 hover:text-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? "Adding ...." : "Add City"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const WeatherList = ({
  citiesWeather,
  loading,
  unit,
  onAddCity,
  onRemoveCity,
  setLocation,
}) => {
  const [modelOpen, setModelOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddCity = async (cityName) => {
    setIsLoading(true);
    try {
      await onAddCity(cityName);
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) return <LoadingState />;

  return (
    <div className="flex-1 bg-[#1e1e1e] rounded-xl p-6">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold"> Other Cities</h2>
        <button
          onClick={() => setModelOpen(true)}
          className="p-2 rounded-lg bg-[#363636] text-gray-300 hover:text-white"
          aria-label="Add new city"
        >
          <FaPlus />
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {citiesWeather?.map((city) => {
          return (
            <CityWeatherCard
              key={city.id}
              city={city}
              unit={unit}
              onRemove={onRemoveCity}
              setLocation={setLocation}
            />
          );
        })}
      </div>
      {modelOpen && (
        <AddCityModel
          isOpen={modelOpen}
          onClose={() => setModelOpen(false)}
          onAdd={handleAddCity}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default WeatherList;
