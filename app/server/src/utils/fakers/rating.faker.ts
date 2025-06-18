import sequelize from "@config/database";
import { Rating } from "@models/rating.model";
import { Dish } from "@models/dish.model";
import { generateFakeRating } from "src/seeders/seed-ratings";
import { faker } from "@faker-js/faker/.";

const seedRating = async () => {
  try {
    await sequelize.sync();

    const dishes = await Dish.findAll();

    for (const dish of dishes) {
      const ratingsCount = faker.number.int({ min: 1, max: 5 });

      for (let i = 0; i < ratingsCount; i++) {
        await Rating.create(generateFakeRating(dish.id));
      }
    }

    console.log("Seeded ratings successfully.");
  } catch (error) {
    console.error("Seeding ratings failed:", error);
  } finally {
    await sequelize.close();
  }
};

seedRating();
