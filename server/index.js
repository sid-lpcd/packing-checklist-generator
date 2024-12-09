import express from "express";
import cors from "cors";
import path from "path";
import tripRoutes from "./routes/tripRoutes.js";
import listRoutes from "./routes/listRoutes.js";

const app = express();

const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? ["https://your-production-url.com"] //to be updated
    : null;
if (allowedOrigins) {
  app.use(cors({ origin: allowedOrigins }));
}
app.use(cors());

// this is a built in middleware function in Express. It parses incoming requests with JSON payloads
app.use(express.json());

app.use("/api/trip", tripRoutes);
app.use("/api/list", listRoutes);

app.use("/", (req, res) => {
  console.log("Hello World");
  res.send("Hello World");
});

// Error-handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

const port = parseInt(process.env.PORT) || 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
