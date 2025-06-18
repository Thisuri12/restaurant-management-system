import { faker } from "@faker-js/faker";

export const generateFakeRating = (dishId: number, userId?: number) => ({
  dish_id: dishId,
  user_id: userId ?? faker.number.int({ min: 1, max: 100 }),
  rating: faker.number.int({ min: 1, max: 5 }),
  comment: faker.datatype.boolean() ? faker.lorem.sentences(2) : undefined,
});
