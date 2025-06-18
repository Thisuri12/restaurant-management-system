import { faker } from "@faker-js/faker";

export const generateFakeCategory = (restaurantId: number) => ({
  name: faker.commerce.department(),
  restaurant_id: restaurantId,
});
