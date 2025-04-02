"use client";

import React from "react";
import { FaWind, FaTint, FaEye, FaTemperatureHigh } from "react-icons/fa";
import { FiSunrise, FiSunset } from "react-icons/fi";

const HighlightsCard = ({ icon: Icon, title, value, unit = "" }) => {
  return (
    <div className="bg-[#1e1e1e] rounded-lg p-4">
      <div className="flex items-center gap-2 text-gray-400 mb-2">
        <Icon className="text-lg" />
        <span className="text-sm">{title}</span>
      </div>
      <div className="text-xl font-semibold">
        {value}
        {unit && <span className="text-sm text-gray-400 ml-1">{unit}</span>}
      </div>
    </div>
  );
};

const Highlights = ({ highlights }) => {
  if (!highlights) return null;
  const { wind, humidity, visibility, sunrise, sunset, uv } = highlights;
  return (
    <div className="flex-1 bg-[#1e1e1e] rounded-xl p-6">
      <h2 className="text-xl font-semibold mb-4">Today&apos;s Highlights</h2>
      <div className="grid grid-cols-2 gap-4">
        <HighlightsCard
          icon={FaWind}
          title="Wind Speed"
          value={wind}
          unit="m/s"
        />
        <HighlightsCard
          icon={FaTint}
          title="Humidity"
          value={humidity}
          unit="%"
        />
        <HighlightsCard
          icon={FaEye}
          title="Visibility"
          value={visibility}
          unit="km"
        />
        <HighlightsCard icon={FaTemperatureHigh} title="UV Index" value={uv} />
        <HighlightsCard icon={FiSunrise} title="Sunrise" value={sunrise} />
        <HighlightsCard icon={FiSunset} title="Sunset" value={sunset} />
      </div>
    </div>
  );
};

export default Highlights;
