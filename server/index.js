import express from "express";
import tripRoutes from "./routes/tripRoutes.js";
import listRoutes from "./routes/listRoutes.js";

const app = express();

app.use("/api/trip", tripRoutes);
app.use("/api/list", listRoutes);

const port = parseInt(process.env.PORT) || 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
