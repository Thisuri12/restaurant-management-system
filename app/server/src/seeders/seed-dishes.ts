import sequelize from "../config/database";
import { Dish, Category } from "../models";
import { generateFakeDish } from "src/utils/fakers/dish.faker";

const seedDishes = async () => {
  try {
    await sequelize.sync();

    const categories = await Category.findAll();

    for (const category of categories) {
      const numberOfDishes = 5;

      for (let i = 0; i < numberOfDishes; i++) {
        await Dish.create(
          generateFakeDish(category.restaurant_id, category.id)
        );
      }
    }

    console.log("Seeded dishes successfully.");
  } catch (error) {
    console.error("Seeding dishes failed:", error);
  } finally {
    await sequelize.close();
  }
};

seedDishes();
