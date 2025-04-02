"use client";

import React from "react";

const TemperatureButton = ({ unit, currentUnit, onClick }) => {
  return (
    <button
      onClick={() => onClick(unit)}
      aria-pressed={currentUnit === unit}
      aria-label={`Switch to ${unit}°`}
      className={`px-3 py-1 rounded transition-all duration-200 ${
        currentUnit === unit
          ? `bg-[#1e1e1e] text-white shadow-md`
          : `text-gray-400 hover:text-gray-300 hover:bg-[#2a2a2a]`
      }`}
    >
      °{unit}
    </button>
  );
};

const TemperatureToggle = ({ unit, onToggle }) => {
  return (
    <div
      className="flex items-center bg-[#363636] rounded-lg p-1"
      role="radiogroup"
      arai-label="Temperature unit"
    >
      {["F", "C"].map((i, key) => {
        return (
          <TemperatureButton
            key={key}
            unit={i}
            currentUnit={unit}
            onClick={onToggle}
          />
        );
      })}
    </div>
  );
};

export default TemperatureToggle;
