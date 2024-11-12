import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

// Define the Hugging Face API URL and model
const API_URL =
  "https://api-inference.huggingface.co/models/meta-llama/Meta-Llama-3-8B-Instruct/v1/chat/completions";
const API_KEY = process.env.HUGGINGFACE_API_KEY;

const cleanResponse = (generatedText) => {
  const lines = generatedText
    .split("\n")
    .filter(
      (item) => item.trim() && !item.toLowerCase().includes("packing list")
    );
  const packingList = [];
  let currentCategory = null;

  lines.forEach((line) => {
    line = line.trim();

    // Check for category lines (starting with "**")
    if (line.startsWith("**")) {
      const categoryName = line.replace(/\*\*/g, "").trim();
      currentCategory = { name: categoryName, items: [] };
      packingList.push(currentCategory);
    }
    // Check for item lines (starting with "*") and add them to the current category
    else if (line.startsWith("*") && currentCategory) {
      const item = line.replace(/^\*\s*/, "").trim();
      currentCategory.items.push(item);
    }
  });

  return packingList;
};

export const generatePackingList = async (
  location,
  temperature,
  weatherSummary,
  duration
) => {
  const prompt = `
  Generate a concise packing list for a trip to ${location} with the weather condition: ${weatherSummary}, 
  temperature: ${temperature}°C, and the trip duration of ${duration} days. List only essential items to pack, 
  avoiding unnecessary details or optional items.   
  `;

  const body = {
    model: "meta-llama/Meta-Llama-3-8B-Instruct",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.5,
    max_tokens: 500,
    top_p: 0.7,
    options: {
      use_cache: false,
    },
  };
  // Parameters for the model: low temperature (no need to be creative) (0<T<2, want T~0)
  try {
    const response = await axios.post(API_URL, body, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    });

    if (response.data.error) {
      throw new Error("AI API Error: ", response.data.error);
    }
    const generatedText =
      response.data.choices?.[0]?.message?.content ||
      "No packing list generated.";

    const packingList = cleanResponse(generatedText);

    return packingList.length ? packingList : ["No packing list generated."];
  } catch (error) {
    throw error;
  }
};
