import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import socialRoutes from "./routes/social.routes";
import restaurantRoutes from "./routes/restaurant.routes";
import categoryRoutes from "./routes/category.routes";
import dishRoutes from "./routes/dishes.routes";
import ratingRoutes from "./routes/rating.routes";

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
app.use("/api/categories", categoryRoutes);
app.use("/api/dishes", dishRoutes);
app.use("/api/rating", ratingRoutes);

export default app;
