const convertTemperature = (temp, unit) => {
  return unit === "C" ? (temp - 32) * 5 / 9 : temp;
};

const formatTemperature = (temp, unit) => {
  return `${Math.round(temp)}°${unit}`;
};

export { convertTemperature, formatTemperature };
