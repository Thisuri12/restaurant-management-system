import sequelize from "@config/database";
import { Category } from "@models/category.model";
import { Restaurant } from "@models/restaurant.model";
import { generateFakeCategory } from "src/utils/fakers/category.faker";

const seedCategories = async () => {
  try {
    await sequelize.sync();

    const restaurants = await Restaurant.findAll();

    for (const restaurant of restaurants) {
      const numberOfCategories = 3;

      for (let i = 0; i < numberOfCategories; i++) {
        await Category.create(generateFakeCategory(restaurant.id));
      }
    }

    console.log("Seeded categories successfully.");
  } catch (error) {
    console.error("Seeding categories failed:", error);
  } finally {
    await sequelize.close();
  }
};

seedCategories();
