import axios from "axios";
import dotenv from "dotenv";

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

// Convert month name (string) to a number (0-11)
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
  return months.indexOf(monthName);
};

// Summarize weather conditions from the descriptions
const getWeatherSummary = (descriptions) => {
  const weatherCount = {
    sunny: 0,
    rainy: 0,
    cloudy: 0,
    others: 0,
  };

  descriptions.forEach((desc) => {
    if (desc.includes("clear")) weatherCount.sunny++;
    else if (desc.includes("rain")) weatherCount.rainy++;
    else if (desc.includes("cloud")) weatherCount.cloudy++;
    else weatherCount.others++;
  });

  const total = descriptions.length;
  return {
    sunny: (weatherCount.sunny / total) * 100,
    rainy: (weatherCount.rainy / total) * 100,
    cloudy: (weatherCount.cloudy / total) * 100,
    others: (weatherCount.others / total) * 100,
  };
};

// Fetch weather data from OpenWeatherMap API
export const getWeather = async (location, month) => {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${OPENWEATHER_API_KEY}&units=metric`;
  const monthNum = monthNameToNumber(month);
  try {
    const response = await axios.get(url);

    if (response.cod !== "200") {
      throw new Error("Error fetching weather data");
    }

    // Filter the weather data by month or return a general forecast
    const weather = response.list.filter((forecast) => {
      const forecastDate = new Date(forecast.dt * 1000);
      return forecastDate.getMonth() === monthNum; // Check if forecast is for the desired month
    });

    const temperature =
      weather.reduce((acc, current) => acc + current.main.temp, 0) /
      weather.length; // Average temp

    const weatherDescriptions = weather.map(
      (forecast) => forecast.weather[0].description
    );

    const weatherSummary = getWeatherSummary(weatherDescriptions);

    return { temperature, weatherSummary };
  } catch (error) {
    console.error("Error fetching weather:", error);
    throw new Error("Unable to fetch weather data");
  }
};
