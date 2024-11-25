import { useQuery } from "@tanstack/react-query";

import { CityList, WeatherData } from "../types/weather";
import {
  fetchGeocodingDataByName,
  fetchWeatherData,
} from "../api/rest/weatherAPI";

export const useCityData = (cityName: string) => {
  return useQuery<CityList>({
    queryKey: ["cityCoordinates", cityName],
    queryFn: () => fetchGeocodingDataByName(cityName),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

export const useWeatherData = (lat: string, lon: string) => {
  return useQuery<WeatherData | null>({
    queryKey: ["weatherData", lat, lon],
    queryFn: () => fetchWeatherData(lat, lon),
    enabled: !!lat && !!lon,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
