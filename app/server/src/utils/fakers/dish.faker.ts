import { faker } from "@faker-js/faker";

export const generateFakeDish = (restaurantId: number, categoryId: number) => ({
  name: faker.commerce.productName(),
  price: faker.number.float({ min: 100, max: 2000, fractionDigits: 0.01 }),
  description: faker.commerce.productDescription(),
  image_url: faker.image.urlLoremFlickr({
    category: "food",
    width: 640,
    height: 480,
  }),
  restaurant_id: restaurantId,
  category_id: categoryId,
});
