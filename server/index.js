import express from "express";
import cors from "cors";
import path from "path";
import tripRoutes from "./routes/tripRoutes.js";
import listRoutes from "./routes/listRoutes.js";

const app = express();

const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? ["https://your-production-url.com"] //to be updated
    : ["http://localhost:5173"];
app.use(cors({ origin: allowedOrigins }));

app.use(express.json());

app.use("/api/trip", tripRoutes);
app.use("/api/list", listRoutes);

// Serve static files from React in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(path.resolve(), "client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(path.resolve(), "client/build", "index.html"));
  });
}

// Error-handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

const port = parseInt(process.env.PORT) || 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
