export const fetchWeatherData = async (lat: string, lon: string) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&exclude=hourly,daily&appid=869c13276631d7009344fb54d38bdaf5`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch weather data");
  }

  return response.json(); // Returns the parsed JSON data
};

export const fetchGeocodingDataByName = async (capitalCityName: string) => {
  const response = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${capitalCityName}&limit=1&appid=869c13276631d7009344fb54d38bdaf5`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch weather data");
  }

  return response.json(); // Returns the parsed JSON data
};
