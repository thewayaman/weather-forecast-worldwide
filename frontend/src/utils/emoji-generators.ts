export const getPressureEmoji = (pressure: number | undefined | null) => {
  if (pressure === null || pressure === undefined) return "❓ N/A";
  if (pressure < 1010) return "🌀 Low Pressure (Stormy)";
  if (pressure > 1030) return "🛑 High Pressure (Clear Skies)";
  return "🌬️ Normal Pressure";
};

export const getSeaLevelPressureEmoji = (
  seaLevelPressure: number | undefined | null
) => {
  if (seaLevelPressure === null || seaLevelPressure === undefined)
    return "❓ N/A";
  if (seaLevelPressure < 1010) return "🔽 Lower Sea Level Pressure";
  if (seaLevelPressure > 1030) return "🔼 Higher Sea Level Pressure";
  return "🌊 Normal Sea Level Pressure";
};

export const getHumidityEmoji = (humidity: number | undefined | null) => {
  if (humidity === null || humidity === undefined) return "❓ N/A";
  if (humidity > 80) return "☔️ High Humidity";
  if (humidity < 30) return "🌞 Low Humidity";
  return "💧 Moderate Humidity";
};

export const getWindDirectionEmoji = (deg: number | undefined | null) => {
  if (deg === null || deg === undefined) return "💨 Unknown";
  if (deg >= 0 && deg < 45) return "↗️ North-East";
  if (deg >= 45 && deg < 135) return "⬆️ North";
  if (deg >= 135 && deg < 225) return "⬅️ West";
  if (deg >= 225 && deg < 315) return "⬇️ South";
  return "↖️ North-West";
};

export const getWindSpeedEmoji = (speed: number | undefined | null) => {
  if (speed === null || speed === undefined) return "💨 Unknown";
  if (speed < 1) return "🌬️ Light wind";
  if (speed < 5) return "💨 Moderate wind";
  if (speed < 10) return "🌪️ Strong wind";
  return "🌬️🌪️ Very strong wind";
};

export const getTemperatureEmoji = (kelvin: number | undefined | null) => {
  if (kelvin === null || kelvin === undefined) return "❓ N/A";
  if (kelvin < 273) return "❄️ Feels Cold";
  if (kelvin <= 300) return "🌤️ Feels Moderate";
  return "🔥 Feels Hot";
};
