import sequelize from "../config/database";
import { User, Rating, Dish } from "../models";
import { generateFakeRating } from "../utils/fakers/rating.faker";
import { faker } from "@faker-js/faker";

const seedRating = async () => {
  try {
    await sequelize.sync();

    const dishes = await Dish.findAll();
    const users = await User.findAll();
    const userIds = users.map((u) => u.id);

    for (const dish of dishes) {
      const ratingsCount = faker.number.int({ min: 1, max: 5 });

      for (let i = 0; i < ratingsCount; i++) {
        await Rating.create(generateFakeRating(dish.id, userIds));
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
