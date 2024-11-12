import express from "express";
import { getSuggestions, getWeather } from "../utils/apiWeather.js";
import { generatePackingList } from "../utils/apiHuggingFace.js";
const router = express.Router();

// POST /api/trips - Create a new trip and generate packing list
router.post("/", async (req, res) => {
  const { location, duration, month } = req.body;

  // Basic validation
  if (!location || !duration || !month) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const weather = await getWeather(location, month);
    const packingList = await generatePackingList(
      location,
      weather.averageTemperature,
      weather.condition,
      duration
    );

    // Return the generated packing list
    return res.status(201).json({ packingList });
  } catch (error) {
    console.error("Error generating packing list:", error);
    res.status(500).json({ error: "Failed to generate packing list" });
  }
});

// GET /api/trips/:tripId - Retrieve packing list for a specific trip
router.get("s/:tripId", (req, res) => {
  const tripId = req.params.tripId;

  // Logic to retrieve packing list for the given tripId
  // ... (Fetch packing list from database based on tripId)

  res.json(packingList);
});

router.get("/location-suggestions", async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: "Query parameter is required" });
  }

  const result = await getSuggestions(query);
  result.error ? res.status(500).json(result) : res.json(result);
});

export default router;
