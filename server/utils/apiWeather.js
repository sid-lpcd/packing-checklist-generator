import axios from "axios";
import dotenv from "dotenv";
import { getWeatherSummaryForLocation } from "./apiMeteoStat.js";

dotenv.config();

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;

export const getSuggestions = async (query) => {
  try {
    // Call the OpenWeatherMap Geocoding API
    const response = await axios.get(
      `http://api.openweathermap.org/geo/1.0/direct`,
      {
        params: {
          q: query,
          limit: 5, // Limit the results to 5 suggestions
          appid: OPENWEATHER_API_KEY,
        },
      }
    );

    if (response.status !== 200) {
      throw new Error("Failed to fetch location suggestions from the server.");
    }

    // Extract location names from the API response
    const suggestions = response.data.map(
      (location) =>
        `${location.name}, ${location.state ? location.state + ", " : ""}${
          location.country
        }`
    );

    return suggestions;
  } catch (error) {
    return {
      error: true,
      message: "Unable to fetch location suggestions",
      details: error.message,
    };
  }
};

// Convert month name (string) to a number (1-12)
const monthNameToNumber = (monthName) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthIndex = months.indexOf(monthName);
  return monthIndex < 10 ? `0${monthIndex}` : `${monthIndex}`;
};

// Fetch weather data from OpenWeatherMap API
export const getWeather = async (location, month) => {
  try {
    const geoResponse = await axios.get(
      `http://api.openweathermap.org/geo/1.0/direct`,
      {
        params: {
          q: location,
          limit: 1, // Get the top result for the location
          appid: OPENWEATHER_API_KEY,
        },
      }
    );

    if (geoResponse.status !== 200 || geoResponse.data.length === 0) {
      throw new Error("Failed to fetch geolocation data for the location.");
    }

    const { lat, lon } = geoResponse.data[0];

    const weatherSummary = await getWeatherSummaryForLocation(
      lat,
      lon,
      monthNameToNumber(month)
    );
    return weatherSummary;
  } catch (error) {
    throw new Error("Unable to fetch weather data", error);
  }
};
