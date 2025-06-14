import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import socialRoutes from "./routes/social.routes";
import restaurantRoutes from "./routes/restaurant.routes";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/auth/social", socialRoutes);

app.use("/api/restaurants", restaurantRoutes);

export default app;
