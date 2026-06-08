import express from "express";
import cors from "cors";
import pino from "pino-http";

import serviceRequestsRoutes from "./routes/serviceRequestsRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(pino());

app.use("/api", serviceRequestsRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "AutoWerkstattPortal API is running",
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
