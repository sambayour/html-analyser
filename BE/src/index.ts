import express from "express";
import cors from "cors";
import { analyzeRoute } from "./routes/analyzeRoute";

const app = express();

app.use(cors());

analyzeRoute(app);

const PORT = process.env.PORT || 3200;

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;
