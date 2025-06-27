import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import sequelize from "./config/database";
import "./models";

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected");

    await sequelize.sync();

    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();
