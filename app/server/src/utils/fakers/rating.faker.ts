import { faker } from "@faker-js/faker";

export const generateFakeRating = (dishId: number, userIds: number[]) => ({
  dish_id: dishId,
  user_id:
    faker.datatype.boolean() && userIds.length > 0
      ? faker.helpers.arrayElement(userIds)
      : undefined,
  rating: faker.number.int({ min: 1, max: 5 }),
  comment: faker.datatype.boolean() ? faker.lorem.sentences(2) : undefined,
});
