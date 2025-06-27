import { Restaurant } from "../models/restaurant.model";
import { generateFakeRestaurant } from "../utils/fakers/restaurant.faker";
import sequelize from "../config/database";

import dotenv from "dotenv";
dotenv.config();

const seedRestaurants = async () => {
  try {
    await sequelize.sync();

    const restaurantCount = 50;

    for (let i = 0; i < restaurantCount; i++) {
      await Restaurant.create(generateFakeRestaurant());
    }

    console.log(`Seeded ${restaurantCount} restaurants`);
  } catch (err) {
    console.error("Seeding restaurants failed:", err);
  } finally {
    await sequelize.close();
  }
};

seedRestaurants();
