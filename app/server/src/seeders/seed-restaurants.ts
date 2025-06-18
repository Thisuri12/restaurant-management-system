import { Restaurant } from "@models/restaurant.model";
import { generateFakeRestaurant } from "src/utils/fakers/restaurant.faker";
import sequelize from "src/config/database";

const seedRestaurants = async () => {
  try {
    await sequelize.sync({ alter: true });

    const restaurantCount = 10;

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
