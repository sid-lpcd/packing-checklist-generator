import axios from "axios";

const OPENWEATHER_API_KEY = "bdc3bb69beee5a517d113eeb1af5d442";

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
