import { CityList, WeatherData } from "../../types/weather";
import { fetchWrapper } from "../../utils/fetch-wrapper";

const appid = process.env.REACT_APP_OPEN_WEATHER_API_KEY;
export const fetchWeatherData = async (lat: string, lon: string) => {
  const response = await fetchWrapper<WeatherData>(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&exclude=hourly,daily&appid=${appid}`
  );

  return response;
};

export const fetchGeocodingDataByName = async (capitalCityName: string) => {
  const response = await fetchWrapper<CityList>(
    `https://api.openweathermap.org/geo/1.0/direct?q=${capitalCityName}&limit=1&appid=${appid}`
  );

  return response;
};
