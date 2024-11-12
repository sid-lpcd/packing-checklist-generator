import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const METEOSTAT_BASE_URL = "https://meteostat.p.rapidapi.com";
const METEOSTAT_API_KEY = process.env.METEOSTAT_API_KEY;

// Fetch the nearest station ID
const getNearestStationId = async (latitude, longitude) => {
  try {
    const response = await axios.get(`${METEOSTAT_BASE_URL}/stations/nearby`, {
      params: { lat: latitude, lon: longitude, limit: 1 },
      headers: {
        "X-RapidAPI-Key": METEOSTAT_API_KEY,
        "X-RapidAPI-Host": "meteostat.p.rapidapi.com",
      },
    });

    if (response.data.data && response.data.data.length > 0) {
      return response.data.data[0].id; // Nearest station ID
    } else {
      throw new Error("No nearby station found.");
    }
  } catch (error) {
    throw error;
  }
};

function classifyWeatherCondition(monthData) {
  const { tavg, prcp, tsun } = monthData;

  // Thresholds for clear vs. rainy
  const clearTempThreshold = 10; // Temperature in °C for "clear" conditions
  const clearSunshineThreshold = 150; // Sunshine hours
  const clearPrecipThreshold = 50; // Precipitation in mm

  const rainyPrecipThreshold = 100; // Higher precipitation for "rainy" conditions

  // Check if it meets "clear" conditions
  if (
    tavg > clearTempThreshold &&
    prcp < clearPrecipThreshold &&
    tsun > clearSunshineThreshold
  ) {
    return "clear";
  }

  // Check if it meets "rainy" conditions
  if (prcp > rainyPrecipThreshold && tsun < clearSunshineThreshold) {
    return "rainy";
  }

  // Default to "mixed" if it doesn’t clearly fall into "clear" or "rainy"
  return "mixed";
}

// Get monthly data for a specific station
const getMonthlyWeatherData = async (stationId, year, month) => {
  try {
    const response = await axios.get(`${METEOSTAT_BASE_URL}/stations/monthly`, {
      params: {
        station: stationId,
        start: `${year}-${month}-01`,
        end: `${year}-${month}-28`,
      },
      headers: {
        "X-RapidAPI-Key": METEOSTAT_API_KEY,
        "X-RapidAPI-Host": "meteostat.p.rapidapi.com",
      },
    });

    if (response.data.data && response.data.data.length > 0) {
      const monthData = response.data.data[0];

      return {
        averageTemperature: monthData.tavg,
        condition: classifyWeatherCondition(monthData),
      };
    } else {
      throw new Error("No data available for the specified month.");
    }
  } catch (error) {
    throw error;
  }
};

// Main function to get monthly weather summary for a location
export const getWeatherSummaryForLocation = async (
  latitude,
  longitude,
  month
) => {
  try {
    const stationId = await getNearestStationId(latitude, longitude);
    const year = new Date().getFullYear() - 1; // Previous year for historical data
    const weatherData = await getMonthlyWeatherData(stationId, year, month);
    return weatherData;
  } catch (error) {
    return null;
  }
};
