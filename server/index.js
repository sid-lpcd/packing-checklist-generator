import express from "express";
import cors from "cors";
import tripRoutes from "./routes/tripRoutes.js";
import listRoutes from "./routes/listRoutes.js";

const app = express();

// Only let certain URLs access this API - usually used for private APIs
app.use(cors({ origin: "http://localhost:5173/" }));

app.use("/api/trip", tripRoutes);
app.use("/api/list", listRoutes);

const port = parseInt(process.env.PORT) || 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
