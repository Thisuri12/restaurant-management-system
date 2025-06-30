import { faker } from "@faker-js/faker";

export const generateFakeDish = (restaurantId: number, categoryId: number) => ({
  name: faker.commerce.productName(),
  price: faker.number.float({ min: 100, max: 2000, fractionDigits: 2 }),
  description: faker.commerce.productDescription(),
  image_url: faker.image.urlLoremFlickr({ category: "food" }),
  restaurant_id: restaurantId,
  category_id: categoryId,
  popular: faker.datatype.boolean(), // randomly true/false
  deal: faker.datatype.boolean(),    // randomly true/false
});
