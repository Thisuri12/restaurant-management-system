import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import socialRoutes from "./routes/social.routes";
import restaurantRoutes from "./routes/restaurant.routes";
import categoryRoutes from "./routes/category.routes";
import dishRoutes from "./routes/dishes.routes";
import ratingRoutes from "./routes/rating.routes";
import orderRoutes from "./routes/order.routes";
import reportRoutes from "./routes/report.routes";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API running" });
});

app.use("/auth", authRoutes);
app.use("/auth", socialRoutes);
app.use("/restaurants", restaurantRoutes);
app.use("/categories", categoryRoutes);
app.use("/dishes", dishRoutes);
app.use("/rating", ratingRoutes);
app.use("/order", orderRoutes);
app.use("/reports", reportRoutes);

export default app;
