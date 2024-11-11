import express from "express";
import { getSuggestions } from "../utils/apiWeather.js";
const router = express.Router();

// POST /api/trips - Create a new trip and generate packing list
router.post("/", (req, res) => {
  // Logic to create a new trip and generate a packing list
  // ... (Access trip details from req.body)
  // ... (Generate packing list)
  // ... (Save trip and packing list to database)

  res.status(201).json({ message: "Trip created and packing list generated" });
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
