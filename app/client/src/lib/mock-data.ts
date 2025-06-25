import { MenuData } from "./types";

export const menuData: MenuData = {
  restaurant: {
    name: "Tossed - St Martin's Lane",
    location: "Covent Garden, London",
    open_time: "08:00",
    close_time: "22:00",
    min_price: 15.0,
    deliveryFee: "£2.49",
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=400&fit=crop",
  },
  categories: [
    {
      id: "popular",
      name: "Popular with other people",
      items: [
        {
          id: 1,
          name: "Caesar Salad",
          description:
            "Crisp romaine lettuce, parmesan, croutons, caesar dressing",
          price: 8.95,
          image:
            "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop",
          popular: true,
        },
        {
          id: 2,
          name: "Chicken Wrap",
          description:
            "Grilled chicken, mixed greens, tomatoes, cucumber in a tortilla wrap",
          price: 7.5,
          image:
            "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
          popular: true,
        },
        {
          id: 11,
          name: "Veggie Sandwich",
          description:
            "Whole grain bread with avocado, sprouts, tomato and hummus",
          price: 6.95,
          image:
            "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop",
          popular: true,
        },
        {
          id: 12,
          name: "BBQ Chicken Pizza",
          description: "Grilled chicken, BBQ sauce, mozzarella cheese",
          price: 11.5,
          image:
            "https://images.unsplash.com/photo-1548365328-8347c6b850de?w=400&h=300&fit=crop",
          popular: true,
        },
        {
          id: 13,
          name: "Margherita Pizza",
          description: "Classic tomato, basil, and mozzarella",
          price: 10.0,
          image:
            "https://images.unsplash.com/photo-1548365328-8347c6b850de?w=400&h=300&fit=crop",
          popular: true,
        },
        {
          id: 14,
          name: "Avocado Toast",
          description: "Sourdough bread with mashed avocado and chili flakes",
          price: 5.95,
          image:
            "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=300&fit=crop",
          popular: true,
        },
        {
          id: 15,
          name: "Buffalo Wings",
          description: "Spicy chicken wings with blue cheese dip",
          price: 9.5,
          image:
            "https://images.unsplash.com/photo-1506354666786-959d6d497f1a?w=400&h=300&fit=crop",
          popular: true,
        },
        {
          id: 16,
          name: "Chocolate Brownie",
          description: "Rich chocolate brownie with walnuts",
          price: 4.5,
          image:
            "https://images.unsplash.com/photo-1559622210-3e1d71a9e1d9?w=400&h=300&fit=crop",
          popular: true,
        },
      ],
    },
    {
      id: "deals",
      name: "Meal Deals",
      items: [
        {
          id: 3,
          name: "Lunch Deal",
          description: "Any salad + drink + snack",
          price: 12.95,
          image:
            "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop",
          deal: true,
        },
        {
          id: 4,
          name: "Wrap Combo",
          description: "Any wrap + side + drink",
          price: 10.95,
          image:
            "https://images.unsplash.com/photo-1559496417-e7f25cb247cd?w=400&h=300&fit=crop",
          deal: true,
        },
        {
          id: 17,
          name: "Family Meal Deal",
          description: "2 large pizzas + 4 drinks",
          price: 25.99,
          image:
            "https://images.unsplash.com/photo-1548365328-8347c6b850de?w=400&h=300&fit=crop",
          deal: true,
        },
        {
          id: 18,
          name: "Breakfast Deal",
          description: "Coffee + pastry + fruit cup",
          price: 7.95,
          image:
            "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=300&fit=crop",
          deal: true,
        },
        {
          id: 19,
          name: "Snack Pack",
          description: "Chips + dip + drink",
          price: 5.99,
          image:
            "https://images.unsplash.com/photo-1506354666786-959d6d497f1a?w=400&h=300&fit=crop",
          deal: true,
        },
        {
          id: 20,
          name: "Veggie Meal Deal",
          description: "Salad + wrap + drink",
          price: 14.5,
          image:
            "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
          deal: true,
        },
        {
          id: 21,
          name: "Kids Meal Deal",
          description: "Small wrap + juice box + fruit snack",
          price: 6.95,
          image:
            "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop",
          deal: true,
        },
        {
          id: 22,
          name: "Dinner Deal",
          description: "Main course + side + drink",
          price: 18.99,
          image:
            "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop",
          deal: true,
        },
      ],
    },
    {
      id: "salads",
      name: "Fresh Salads",
      items: [
        {
          id: 5,
          name: "Greek Salad",
          description:
            "Mixed greens, feta cheese, olives, tomatoes, cucumber, red onion",
          price: 9.25,
          image:
            "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop",
        },
        {
          id: 6,
          name: "Quinoa Power Bowl",
          description: "Quinoa, avocado, chickpeas, pomegranate, mixed seeds",
          price: 10.5,
          image:
            "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop",
        },
        {
          id: 23,
          name: "Cobb Salad",
          description: "Mixed greens, chicken, bacon, egg, blue cheese",
          price: 11.0,
          image:
            "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop",
        },
        {
          id: 24,
          name: "Caesar Salad Deluxe",
          description: "Classic Caesar with grilled shrimp",
          price: 12.5,
          image:
            "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop",
        },
        {
          id: 25,
          name: "Asian Sesame Salad",
          description: "Mixed greens, sesame seeds, mandarin oranges",
          price: 10.0,
          image:
            "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
        },
        {
          id: 26,
          name: "Spinach and Strawberry Salad",
          description: "Fresh spinach, strawberries, almonds, feta cheese",
          price: 9.5,
          image:
            "https://images.unsplash.com/photo-1559496417-e7f25cb247cd?w=400&h=300&fit=crop",
        },
        {
          id: 27,
          name: "Mediterranean Salad",
          description: "Tomatoes, cucumber, olives, feta, and red onion",
          price: 9.75,
          image:
            "https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=400&h=300&fit=crop",
        },
        {
          id: 28,
          name: "Fruit Salad Bowl",
          description: "Seasonal fruit mix with mint and honey dressing",
          price: 8.5,
          image:
            "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&h=300&fit=crop",
        },
      ],
    },
    {
      id: "wraps",
      name: "Wraps & Rolls",
      items: [
        {
          id: 7,
          name: "Falafel Wrap",
          description: "Homemade falafel, hummus, salad, tahini sauce",
          price: 8.25,
          image:
            "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
        },
        {
          id: 8,
          name: "Tuna Melt",
          description: "Tuna, cheese, tomatoes, mixed greens in a grilled wrap",
          price: 7.95,
          image:
            "https://images.unsplash.com/photo-1559496417-e7f25cb247cd?w=400&h=300&fit=crop",
        },
        {
          id: 29,
          name: "Chicken Caesar Wrap",
          description: "Grilled chicken, romaine lettuce, Caesar dressing",
          price: 9.0,
          image:
            "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop",
        },
        {
          id: 30,
          name: "Buffalo Chicken Wrap",
          description: "Spicy chicken, lettuce, ranch dressing",
          price: 9.5,
          image:
            "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop",
        },
        {
          id: 31,
          name: "Veggie Wrap",
          description: "Grilled vegetables, hummus, mixed greens",
          price: 8.75,
          image:
            "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
        },
        {
          id: 32,
          name: "Steak Wrap",
          description: "Grilled steak, onions, peppers, and cheese",
          price: 10.5,
          image:
            "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop",
        },
        {
          id: 33,
          name: "Shrimp Wrap",
          description: "Grilled shrimp, avocado, and spicy mayo",
          price: 11.0,
          image:
            "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop",
        },
        {
          id: 34,
          name: "BBQ Pulled Pork Wrap",
          description: "Pulled pork, BBQ sauce, and coleslaw",
          price: 9.75,
          image:
            "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop",
        },
      ],
    },
    {
      id: "drinks",
      name: "Drinks & Smoothies",
      items: [
        {
          id: 9,
          name: "Green Smoothie",
          description: "Spinach, apple, banana, ginger, lemon",
          price: 4.95,
          image:
            "https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=400&h=300&fit=crop",
        },
        {
          id: 10,
          name: "Fresh Orange Juice",
          description: "Freshly squeezed orange juice",
          price: 3.95,
          image:
            "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&h=300&fit=crop",
        },
        {
          id: 35,
          name: "Mango Smoothie",
          description: "Fresh mango, yogurt, honey",
          price: 5.5,
          image:
            "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=400&h=300&fit=crop",
        },
        {
          id: 36,
          name: "Berry Blast",
          description: "Mixed berries, banana, and almond milk",
          price: 5.75,
          image:
            "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop",
        },
        {
          id: 37,
          name: "Iced Coffee",
          description: "Cold brewed coffee with ice",
          price: 3.5,
          image:
            "https://images.unsplash.com/photo-1528825871115-3581a5387919?w=400&h=300&fit=crop",
        },
        {
          id: 38,
          name: "Lemonade",
          description: "Fresh lemonade with mint",
          price: 3.0,
          image:
            "https://images.unsplash.com/photo-1562440499-6441e292ac47?w=400&h=300&fit=crop",
        },
        {
          id: 39,
          name: "Cucumber Cooler",
          description: "Cucumber, lime, and soda water",
          price: 3.75,
          image:
            "https://images.unsplash.com/photo-1562440499-6441e292ac47?w=400&h=300&fit=crop",
        },
        {
          id: 40,
          name: "Chai Latte",
          description: "Spiced tea with steamed milk",
          price: 4.0,
          image:
            "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop",
        },
      ],
    },
    {
      id: "desserts",
      name: "Desserts",
      items: [
        {
          id: 41,
          name: "Cheesecake",
          description: "Creamy cheesecake with berry topping",
          price: 6.0,
          image:
            "https://images.unsplash.com/photo-1559622210-3e1d71a9e1d9?w=400&h=300&fit=crop",
        },
        {
          id: 42,
          name: "Tiramisu",
          description: "Classic Italian coffee-flavored dessert",
          price: 6.5,
          image:
            "https://images.unsplash.com/photo-1528825871115-3581a5387919?w=400&h=300&fit=crop",
        },
        {
          id: 43,
          name: "Chocolate Lava Cake",
          description: "Warm chocolate cake with molten center",
          price: 6.75,
          image:
            "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop",
        },
        {
          id: 44,
          name: "Fruit Tart",
          description: "Pastry crust with custard and fresh fruits",
          price: 5.95,
          image:
            "https://images.unsplash.com/photo-1562440499-6441e292ac47?w=400&h=300&fit=crop",
        },
        {
          id: 45,
          name: "Ice Cream Sundae",
          description: "Vanilla ice cream with chocolate syrup and nuts",
          price: 5.5,
          image:
            "https://images.unsplash.com/photo-1562440499-6441e292ac47?w=400&h=300&fit=crop",
        },
        {
          id: 46,
          name: "Macarons",
          description: "Colorful almond meringue cookies",
          price: 4.95,
          image:
            "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop",
        },
        {
          id: 47,
          name: "Brownies",
          description: "Rich chocolate brownies with nuts",
          price: 4.5,
          image:
            "https://images.unsplash.com/photo-1559622210-3e1d71a9e1d9?w=400&h=300&fit=crop",
        },
        {
          id: 48,
          name: "Panna Cotta",
          description: "Creamy Italian dessert with berry sauce",
          price: 6.25,
          image:
            "https://images.unsplash.com/photo-1548365328-8347c6b850de?w=400&h=300&fit=crop",
        },
      ],
    },
    {
      id: "soups",
      name: "Soups",
      items: [
        {
          id: 49,
          name: "Tomato Soup",
          description: "Rich tomato soup with basil",
          price: 4.5,
          image:
            "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop",
        },
        {
          id: 50,
          name: "Chicken Noodle Soup",
          description: "Classic chicken noodle soup with vegetables",
          price: 5.25,
          image:
            "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
        },
        {
          id: 51,
          name: "Minestrone",
          description: "Italian vegetable soup with pasta",
          price: 5.0,
          image:
            "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop",
        },
        {
          id: 52,
          name: "Butternut Squash Soup",
          description: "Creamy roasted squash soup",
          price: 5.5,
          image:
            "https://images.unsplash.com/photo-1559496417-e7f25cb247cd?w=400&h=300&fit=crop",
        },
        {
          id: 53,
          name: "French Onion Soup",
          description: "Caramelized onions with melted cheese",
          price: 6.0,
          image:
            "https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=400&h=300&fit=crop",
        },
        {
          id: 54,
          name: "Lentil Soup",
          description: "Hearty lentil soup with spices",
          price: 5.0,
          image:
            "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&h=300&fit=crop",
        },
        {
          id: 55,
          name: "Clam Chowder",
          description: "Creamy chowder with clams and potatoes",
          price: 6.5,
          image:
            "https://images.unsplash.com/photo-1562440499-6441e292ac47?w=400&h=300&fit=crop",
        },
        {
          id: 56,
          name: "Miso Soup",
          description: "Traditional Japanese miso soup",
          price: 4.25,
          image:
            "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop",
        },
      ],
    },
    {
      id: "pizzas",
      name: "Pizzas",
      items: [
        {
          id: 57,
          name: "Pepperoni Pizza",
          description: "Classic pepperoni and mozzarella",
          price: 12.5,
          image:
            "https://images.unsplash.com/photo-1548365328-8347c6b850de?w=400&h=300&fit=crop",
        },
        {
          id: 58,
          name: "Veggie Pizza",
          description: "Tomato, bell peppers, onions, mushrooms",
          price: 11.0,
          image:
            "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop",
        },
        {
          id: 59,
          name: "Meat Lover's Pizza",
          description: "Pepperoni, sausage, bacon, ham",
          price: 14.5,
          image:
            "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop",
        },
        {
          id: 60,
          name: "BBQ Chicken Pizza",
          description: "BBQ sauce, grilled chicken, onions",
          price: 13.0,
          image:
            "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
        },
        {
          id: 61,
          name: "Four Cheese Pizza",
          description: "Mozzarella, cheddar, parmesan, blue cheese",
          price: 13.5,
          image:
            "https://images.unsplash.com/photo-1559496417-e7f25cb247cd?w=400&h=300&fit=crop",
        },
        {
          id: 62,
          name: "Hawaiian Pizza",
          description: "Ham, pineapple, mozzarella",
          price: 12.0,
          image:
            "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop",
        },
        {
          id: 63,
          name: "Margherita Pizza",
          description: "Tomato, basil, fresh mozzarella",
          price: 11.5,
          image:
            "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop",
        },
        {
          id: 64,
          name: "Spinach and Feta Pizza",
          description: "Spinach, feta cheese, garlic",
          price: 12.5,
          image:
            "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
        },
      ],
    },
    {
      id: "sandwiches",
      name: "Sandwiches",
      items: [
        {
          id: 65,
          name: "BLT Sandwich",
          description: "Bacon, lettuce, tomato, mayo on toasted bread",
          price: 7.5,
          image:
            "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop",
        },
        {
          id: 66,
          name: "Club Sandwich",
          description: "Triple decker with turkey, bacon, lettuce, tomato",
          price: 8.5,
          image:
            "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
        },
        {
          id: 67,
          name: "Egg Salad Sandwich",
          description: "Egg salad with mayo and mustard",
          price: 6.75,
          image:
            "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop",
        },
        {
          id: 68,
          name: "Grilled Cheese",
          description: "Classic grilled cheese sandwich",
          price: 6.0,
          image:
            "https://images.unsplash.com/photo-1559496417-e7f25cb247cd?w=400&h=300&fit=crop",
        },
        {
          id: 69,
          name: "Pulled Pork Sandwich",
          description: "BBQ pulled pork with coleslaw",
          price: 9.25,
          image:
            "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop",
        },
        {
          id: 70,
          name: "Turkey Sandwich",
          description: "Turkey breast, lettuce, tomato, mayo",
          price: 7.75,
          image:
            "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop",
        },
        {
          id: 71,
          name: "Veggie Sandwich",
          description: "Avocado, sprouts, tomato, hummus",
          price: 6.95,
          image:
            "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&h=300&fit=crop",
        },
        {
          id: 72,
          name: "Roast Beef Sandwich",
          description: "Roast beef, cheddar, horseradish sauce",
          price: 8.95,
          image:
            "https://images.unsplash.com/photo-1562440499-6441e292ac47?w=400&h=300&fit=crop",
        },
      ],
    },

    {
      id: "pasta",
      name: "Pasta",
      items: [
        {
          id: 73,
          name: "Spaghetti Carbonara",
          description:
            "Classic Italian pasta with eggs, cheese, pancetta, and pepper",
          price: 10.5,
          image:
            "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=400&h=300&fit=crop",
        },
        {
          id: 74,
          name: "Penne Arrabbiata",
          description: "Penne pasta with spicy tomato sauce and garlic",
          price: 9.75,
          image:
            "https://images.unsplash.com/photo-1512058564366-c9e7aa01e1e8?w=400&h=300&fit=crop",
        },
        {
          id: 75,
          name: "Fettuccine Alfredo",
          description: "Creamy Alfredo sauce with parmesan cheese and butter",
          price: 11.0,
          image:
            "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=400&h=300&fit=crop",
        },
        {
          id: 76,
          name: "Lasagna",
          description:
            "Layers of pasta, meat sauce, ricotta, and mozzarella cheese",
          price: 12.5,
          image:
            "https://images.unsplash.com/photo-1572441710480-5483f9e5b927?w=400&h=300&fit=crop",
        },
        {
          id: 77,
          name: "Ravioli",
          description:
            "Stuffed pasta with ricotta and spinach, served with marinara",
          price: 10.25,
          image:
            "https://images.unsplash.com/photo-1568051243852-0c5b0a1ec324?w=400&h=300&fit=crop",
        },
        {
          id: 78,
          name: "Pesto Pasta",
          description: "Penne pasta with fresh basil pesto sauce and pine nuts",
          price: 9.95,
          image:
            "https://images.unsplash.com/photo-1525755662778-989d0524087e8?w=400&h=300&fit=crop",
        },
        {
          id: 79,
          name: "Seafood Linguine",
          description:
            "Linguine pasta with mixed seafood in a garlic white wine sauce",
          price: 14.0,
          image:
            "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
        },
        {
          id: 80,
          name: "Mac and Cheese",
          description: "Baked macaroni pasta with creamy cheese sauce",
          price: 8.95,
          image:
            "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=400&h=300&fit=crop",
        },
      ],
    },

    {
      id: "sweets",
      name: "Sweets",
      items: [
        {
          id: 81,
          name: "Chocolate Brownie",
          description: "Rich and fudgy chocolate brownie with walnuts",
          price: 5.5,
          image:
            "https://images.unsplash.com/photo-1590080877777-f3d6e1bb6bb6?w=400&h=300&fit=crop",
        },
        {
          id: 82,
          name: "Cheesecake",
          description:
            "Creamy New York-style cheesecake with a graham cracker crust",
          price: 6.25,
          image:
            "https://images.unsplash.com/photo-1562440499-6441e292ac47?w=400&h=300&fit=crop",
        },
        {
          id: 83,
          name: "Tiramisu",
          description:
            "Classic Italian dessert with mascarpone and coffee-soaked ladyfingers",
          price: 6.75,
          image:
            "https://images.unsplash.com/photo-1505253210343-cfb62b7cba49?w=400&h=300&fit=crop",
        },
        {
          id: 84,
          name: "Apple Pie",
          description: "Traditional apple pie with cinnamon and flaky crust",
          price: 5.95,
          image:
            "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop",
        },
        {
          id: 85,
          name: "Ice Cream Sundae",
          description:
            "Vanilla ice cream with chocolate sauce, nuts, and cherries",
          price: 4.95,
          image:
            "https://images.unsplash.com/photo-1525755662778-989d0524087e8?w=400&h=300&fit=crop",
        },
        {
          id: 86,
          name: "Lemon Tart",
          description: "Tangy lemon custard in a buttery tart shell",
          price: 5.75,
          image:
            "https://images.unsplash.com/photo-1568051243852-0c5b0a1ec324?w=400&h=300&fit=crop",
        },
        {
          id: 87,
          name: "Banana Split",
          description:
            "Banana with ice cream scoops, whipped cream, and toppings",
          price: 6.5,
          image:
            "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=400&h=300&fit=crop",
        },
        {
          id: 88,
          name: "Panna Cotta",
          description: "Creamy Italian dessert topped with berries",
          price: 6.0,
          image:
            "https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=400&h=300&fit=crop",
        },
      ],
    },

    {
      id: "sfgfsb",
      name: "SBffsdbb",
      items: [
        {
          id: 73,
          name: "Spaghetti Carbonara",
          description:
            "Classic Italian pasta with eggs, cheese, pancetta, and pepper",
          price: 10.5,
          image:
            "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=400&h=300&fit=crop",
        },
        {
          id: 74,
          name: "Penne Arrabbiata",
          description: "Penne pasta with spicy tomato sauce and garlic",
          price: 9.75,
          image:
            "https://images.unsplash.com/photo-1512058564366-c9e7aa01e1e8?w=400&h=300&fit=crop",
        },
        {
          id: 75,
          name: "Fettuccine Alfredo",
          description: "Creamy Alfredo sauce with parmesan cheese and butter",
          price: 11.0,
          image:
            "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=400&h=300&fit=crop",
        },
        {
          id: 76,
          name: "Lasagna",
          description:
            "Layers of pasta, meat sauce, ricotta, and mozzarella cheese",
          price: 12.5,
          image:
            "https://images.unsplash.com/photo-1572441710480-5483f9e5b927?w=400&h=300&fit=crop",
        },
        {
          id: 77,
          name: "Ravioli",
          description:
            "Stuffed pasta with ricotta and spinach, served with marinara",
          price: 10.25,
          image:
            "https://images.unsplash.com/photo-1568051243852-0c5b0a1ec324?w=400&h=300&fit=crop",
        },
        {
          id: 78,
          name: "Pesto Pasta",
          description: "Penne pasta with fresh basil pesto sauce and pine nuts",
          price: 9.95,
          image:
            "https://images.unsplash.com/photo-1525755662778-989d0524087e8?w=400&h=300&fit=crop",
        },
        {
          id: 79,
          name: "Seafood Linguine",
          description:
            "Linguine pasta with mixed seafood in a garlic white wine sauce",
          price: 14.0,
          image:
            "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
        },
        {
          id: 80,
          name: "Mac and Cheese",
          description: "Baked macaroni pasta with creamy cheese sauce",
          price: 8.95,
          image:
            "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=400&h=300&fit=crop",
        },
      ],
    },

    {
      id: "DBDBDB",
      name: "BDBDGBdgbndg",
      items: [
        {
          id: 73,
          name: "Spaghetti Carbonara",
          description:
            "Classic Italian pasta with eggs, cheese, pancetta, and pepper",
          price: 10.5,
          image:
            "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=400&h=300&fit=crop",
        },
        {
          id: 74,
          name: "Penne Arrabbiata",
          description: "Penne pasta with spicy tomato sauce and garlic",
          price: 9.75,
          image:
            "https://images.unsplash.com/photo-1512058564366-c9e7aa01e1e8?w=400&h=300&fit=crop",
        },
        {
          id: 75,
          name: "Fettuccine Alfredo",
          description: "Creamy Alfredo sauce with parmesan cheese and butter",
          price: 11.0,
          image:
            "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=400&h=300&fit=crop",
        },
        {
          id: 76,
          name: "Lasagna",
          description:
            "Layers of pasta, meat sauce, ricotta, and mozzarella cheese",
          price: 12.5,
          image:
            "https://images.unsplash.com/photo-1572441710480-5483f9e5b927?w=400&h=300&fit=crop",
        },
        {
          id: 77,
          name: "Ravioli",
          description:
            "Stuffed pasta with ricotta and spinach, served with marinara",
          price: 10.25,
          image:
            "https://images.unsplash.com/photo-1568051243852-0c5b0a1ec324?w=400&h=300&fit=crop",
        },
        {
          id: 78,
          name: "Pesto Pasta",
          description: "Penne pasta with fresh basil pesto sauce and pine nuts",
          price: 9.95,
          image:
            "https://images.unsplash.com/photo-1525755662778-989d0524087e8?w=400&h=300&fit=crop",
        },
        {
          id: 79,
          name: "Seafood Linguine",
          description:
            "Linguine pasta with mixed seafood in a garlic white wine sauce",
          price: 14.0,
          image:
            "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
        },
        {
          id: 80,
          name: "Mac and Cheese",
          description: "Baked macaroni pasta with creamy cheese sauce",
          price: 8.95,
          image:
            "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=400&h=300&fit=crop",
        },
      ],
    },

    {
      id: "DFBDGBNdgnb",
      name: "SFbDFBdGBgng",
      items: [
        {
          id: 73,
          name: "Spaghetti Carbonara",
          description:
            "Classic Italian pasta with eggs, cheese, pancetta, and pepper",
          price: 10.5,
          image:
            "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=400&h=300&fit=crop",
        },
        {
          id: 74,
          name: "Penne Arrabbiata",
          description: "Penne pasta with spicy tomato sauce and garlic",
          price: 9.75,
          image:
            "https://images.unsplash.com/photo-1512058564366-c9e7aa01e1e8?w=400&h=300&fit=crop",
        },
        {
          id: 75,
          name: "Fettuccine Alfredo",
          description: "Creamy Alfredo sauce with parmesan cheese and butter",
          price: 11.0,
          image:
            "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=400&h=300&fit=crop",
        },
        {
          id: 76,
          name: "Lasagna",
          description:
            "Layers of pasta, meat sauce, ricotta, and mozzarella cheese",
          price: 12.5,
          image:
            "https://images.unsplash.com/photo-1572441710480-5483f9e5b927?w=400&h=300&fit=crop",
        },
        {
          id: 77,
          name: "Ravioli",
          description:
            "Stuffed pasta with ricotta and spinach, served with marinara",
          price: 10.25,
          image:
            "https://images.unsplash.com/photo-1568051243852-0c5b0a1ec324?w=400&h=300&fit=crop",
        },
        {
          id: 78,
          name: "Pesto Pasta",
          description: "Penne pasta with fresh basil pesto sauce and pine nuts",
          price: 9.95,
          image:
            "https://images.unsplash.com/photo-1525755662778-989d0524087e8?w=400&h=300&fit=crop",
        },
        {
          id: 79,
          name: "Seafood Linguine",
          description:
            "Linguine pasta with mixed seafood in a garlic white wine sauce",
          price: 14.0,
          image:
            "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
        },
        {
          id: 80,
          name: "Mac and Cheese",
          description: "Baked macaroni pasta with creamy cheese sauce",
          price: 8.95,
          image:
            "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=400&h=300&fit=crop",
        },
      ],
    },
  ],
};
