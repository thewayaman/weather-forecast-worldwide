import React, { useState } from "react";
import { Descriptions, DescriptionsProps, Result, Skeleton } from "antd";
import {
  getHumidityEmoji,
  getPressureEmoji,
  getSeaLevelPressureEmoji,
  getTemperatureEmoji,
  getWindDirectionEmoji,
  getWindSpeedEmoji,
} from "../utils/emoji-generators";
import { useCityData, useWeatherData } from "../hooks/useCityWeatherData";

const CityWeatherDetail = ({
  cityName,
}: {
  cityName: string;
}): React.ReactElement => {
  const [weatherItems, setWeatherItems] = useState<DescriptionsProps["items"]>(
    []
  );
  const {
    data: cityData,
    error: cityError,
    isLoading: cityLoading,
  } = useCityData(cityName);

  const {
    data: weatherData,
    error: weatherError,
    isLoading: weatherLoading,
  } = useWeatherData(
    cityData?.[0]?.lat?.toString() || "",
    cityData?.[0]?.lon?.toString() || ""
  );

  if (cityError || weatherError)
    return (
      <Result
        status="500"
        title="500"
        subTitle="Sorry, something went wrong. Please try again after a while"
      />
    );

  const weatherIconUrl = weatherData?.weather[0]?.icon
    ? `https://openweathermap.org/img/wn/${weatherData?.weather[0]?.icon}.png`
    : null;

  const kelvinTemp = weatherData?.main.temp;
  const celsiusTemp = kelvinTemp !== undefined ? kelvinTemp - 273.15 : null;
  const fahrenheitTemp =
    kelvinTemp !== undefined ? ((kelvinTemp - 273.15) * 9) / 5 + 32 : null;

  const windSpeed = weatherData?.wind?.speed;
  const windDirection = weatherData?.wind?.deg;
  const windGust = weatherData?.wind?.gust;

  if (cityData?.length && weatherData && !weatherItems?.length) {
    setWeatherItems([
      {
        label: "Weather Conditions:",
        span: { xl: 2, xxl: 2 },
        children: (
          <>
            {weatherData.weather[0]?.description || "N/A"}
            {weatherIconUrl && (
              <img
                src={weatherIconUrl}
                alt="weather_icon"
                style={{ height: "30px", width: "30px" }}
              />
            )}
          </>
        ),
      },
      {
        label: "Temperature 🌡️ :",
        span: { xl: 2, xxl: 2 },
        children: (
          <p>
            {fahrenheitTemp?.toFixed(1) || "N/A"}°F /{" "}
            {celsiusTemp?.toFixed(1) || "N/A"}°C /{" "}
            {kelvinTemp?.toFixed(1) || "N/A"} K{" "}
            {getTemperatureEmoji(kelvinTemp)}
          </p>
        ),
      },
      {
        label: "Wind Direction:",
        span: { xl: 2, xxl: 2 },
        children: <span>{getWindDirectionEmoji(windDirection)}</span>,
      },
      {
        label: "Wind Speed:",
        span: { xl: 2, xxl: 2 },
        children: (
          <p>
            {windSpeed?.toFixed(1) || "N/A"} m/s {getWindSpeedEmoji(windSpeed)}
          </p>
        ),
      },
      {
        label: "Wind Gust:",
        span: { xl: 2, xxl: 2 },
        children: <p>{windGust?.toFixed(1) || "N/A"} m/s</p>,
      },
      {
        label: "Feels Like:",
        span: { xl: 2, xxl: 2 },
        children: (
          <p>
            {weatherData.main.feels_like?.toFixed(1) || "N/A"} K{" "}
            {getTemperatureEmoji(weatherData.main.feels_like || 0)}
          </p>
        ),
      },
      {
        label: "Min/Max Temp:",
        span: { xl: 2, xxl: 2 },
        children: (
          <p>
            {weatherData.main.temp_min?.toFixed(1) || "N/A"} K /{" "}
            {weatherData.main.temp_max?.toFixed(1) || "N/A"} K
          </p>
        ),
      },
      {
        label: "Humidity:",
        span: { xl: 2, xxl: 2 },
        children: (
          <p>
            {weatherData.main.humidity !== undefined
              ? `${weatherData.main.humidity}%`
              : "N/A"}{" "}
            {getHumidityEmoji(weatherData.main.humidity || 0)}
          </p>
        ),
      },
      {
        label: "Pressure:",
        span: { xl: 2, xxl: 2 },
        children: (
          <p>
            {weatherData.main.pressure || "N/A"} hPa{" "}
            {getPressureEmoji(weatherData.main.pressure || 0)}
          </p>
        ),
      },
      {
        label: "Sea Level Pressure:",
        span: { xl: 2, xxl: 2 },
        children: (
          <p>
            {weatherData.main.sea_level || "N/A"} hPa{" "}
            {getSeaLevelPressureEmoji(weatherData.main.sea_level || 0)}
          </p>
        ),
      },
      {
        label: "Ground Level Pressure:",
        span: { xl: 2, xxl: 2 },
        children: (
          <p>
            {weatherData.main.grnd_level || "N/A"} hPa 🌍 Ground Level Pressure
          </p>
        ),
      },
    ]);
  }

  return (
    <Skeleton
      style={{ margin: "15px 0px 30px 0px" }}
      loading={cityLoading || weatherLoading}
      active
    >
      <Descriptions
        title={cityName + " Weather info"}
        bordered
        style={{ margin: "15px 0 0 0" }}
        column={{ xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4 }}
        items={weatherItems}
        size="small"
      />
    </Skeleton>
  );
};

export default CityWeatherDetail;
