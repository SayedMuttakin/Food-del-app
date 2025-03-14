const items = [
  {
    id: 1,
    name: "Pizza",
    description: "Delicious cheese pizza with fresh toppings.",
    image: "/images/pizza.jpg",
    rating: 4.5,
    price: "12.99",
    category: "Pizza", // ক্যাটাগরি যোগ করা হলো
    details: [
      "Made with fresh dough.",
      "Topped with mozzarella cheese.",
      "Includes pepperoni and vegetables.",
      "Baked to perfection."
    ],
  },
  {
    id: 2,
    name: "Burger",
    description: "Juicy beef burger with lettuce and tomatoes.",
    image: "/images/burger.jpg",
    rating: 4.2,
    price: "8.99",
    category: "Burger", // ক্যাটাগরি যোগ করা হলো
    details: [
      "100% beef patty.",
      "Served with fresh lettuce.",
      "Includes tomato slices and pickles.",
      "Option for cheese topping."
    ],
  },
  {
    id: 3,
    name: "Pasta",
    description: "Creamy pasta with a mix of vegetables.",
    image: "/images/pasta.jpg",
    rating: 4.7,
    price: "10.99",
    category: "Pasta", // ক্যাটাগরি যোগ করা হলো
    details: [
      "Served with a creamy Alfredo sauce.",
      "Includes seasonal vegetables.",
      "Topped with Parmesan cheese.",
      "Can be made spicy on request."
    ],
  },
  {
    id: 4,
    name: "Salad",
    description: "Fresh garden salad with a variety of veggies.",
    image: "/images/salad.jpg",
    rating: 4.0,
    price: "6.99",
    category: "Soup", // ক্যাটাগরি যোগ করা হলো
    details: [
      "Includes lettuce, cucumbers, and tomatoes.",
      "Dressed with olive oil and vinegar.",
      "Can add grilled chicken or tofu.",
      "Healthy and refreshing."
    ],
  },
  {
    id: 5,
    name: "Tacos",
    description: "Spicy tacos filled with meat and fresh veggies.",
    image: "/images/tacos.jpg",
    rating: 4.3,
    price: "7.99",
    category: "Chicken", // ক্যাটাগরি যোগ করা হলো
    details: [
      "Soft or hard shell options available.",
      "Filled with seasoned meat and fresh toppings.",
      "Served with salsa and guacamole.",
      "Great for sharing!"
    ],
  },
  {
    id: 6,
    name: "Ice Cream",
    description: "Creamy ice cream with various flavors.",
    image: "/images/icecream.jpg",
    rating: 4.9,
    price: "5.99",
    category: "Icecream", // ক্যাটাগরি যোগ করা হলো
    details: [
      "Available in chocolate, vanilla, and strawberry.",
      "Topped with sprinkles or chocolate syrup.",
      "Perfect for a hot day.",
      "Can be served in a cone or cup."
    ],
  },
  {
    id: 7,
    name: "Steak",
    description: "Grilled steak cooked to perfection.",
    image: "/images/steak.jpg",
    rating: 4.6,
    price: "15.99",
    category: "Chicken", // ক্যাটাগরি যোগ করা হলো
    details: [
      "Choice of ribeye or filet mignon.",
      "Seasoned and grilled to your liking.",
      "Served with mashed potatoes and veggies.",
      "A favorite among meat lovers."
    ],
  },
  {
    id: 8,
    name: "Fries",
    description: "Crispy golden fries, a perfect side dish.",
    image: "/images/fries.jpg",
    rating: 4.1,
    price: "4.99",
    category: "Burger", // ক্যাটাগরি যোগ করা হলো
    details: [
      "Crispy on the outside, fluffy on the inside.",
      "Perfectly salted and served hot.",
      "Great with ketchup or mayo.",
      "Ideal as a snack or side."
    ],
  },
  {
    id: 9,
    name: "Chocolate Cake",
    description: "Rich and moist chocolate cake.",
    image: "/images/chocolatecake.jpg",
    rating: 4.7,
    price: "9.99",
    category: "Icecream", // ক্যাটাগরি যোগ করা হলো
    details: [
      "Made with dark chocolate for intense flavor.",
      "Frosted with creamy chocolate icing.",
      "Served with a scoop of vanilla ice cream.",
      "A must-try for chocolate lovers."
    ],
  },
  {
    id: 10,
    name: "Pancakes",
    description: "Fluffy pancakes with maple syrup.",
    image: "/images/pancakes.jpg",
    rating: 4.4,
    price: "7.49",
    category: "Pasta", // ক্যাটাগরি যোগ করা হলো
    details: [
      "Served with fresh berries and whipped cream.",
      "Made with a secret recipe for extra fluffiness.",
      "Perfect for breakfast or brunch.",
      "Drizzled with real maple syrup."
    ],
  },
  {
    id: 11,
    name: "Wings",
    description: "Spicy chicken wings served with ranch.",
    image: "/images/wings.jpg",
    rating: 4.3,
    price: "9.49",
    category: "Chicken", // ক্যাটাগরি যোগ করা হলো
    details: [
      "Available in mild, medium, and hot flavors.",
      "Served with celery sticks.",
      "Perfect for game day or parties.",
      "Crispy and flavorful."
    ],
  },
  {
    id: 12,
    name: "Muffins",
    description: "Freshly baked muffins in various flavors.",
    image: "/images/muffins.jpg",
    rating: 4.6,
    price: "3.99",
    category: "Icecream", // ক্যাটাগরি যোগ করা হলো
    details: [
      "Options include blueberry, chocolate chip, and banana.",
      "Great for breakfast or a snack.",
      "Moist and fluffy with a golden crust.",
      "Made with real fruit and ingredients."
    ],
  },
  {
    id: 13,
    name: "Bagel",
    description: "Toasted bagel with cream cheese.",
    image: "/images/bagel.jpg",
    rating: 4.2,
    price: "3.49",
    category: "Burger", // ক্যাটাগরি যোগ করা হলো
    details: [
      "Freshly baked and toasted to perfection.",
      "Served with a generous spread of cream cheese.",
      "Option to add smoked salmon.",
      "Perfect for breakfast on the go."
    ],
  },
  {
    id: 14,
    name: "Kebab",
    description: "Juicy kebabs grilled to perfection.",
    image: "/images/kebab.jpg",
    rating: 4.5,
    price: "11.99",
    category: "Kebab", // ক্যাটাগরি যোগ করা হলো
    details: [
      "Marinated with spices and grilled over charcoal.",
      "Served with pita bread and garlic sauce.",
      "Great for sharing or as a main dish.",
      "Tender and flavorful."
    ],
  },
  {
    id: 15,
    name: "Quiche",
    description: "Savory pie filled with eggs, cheese, and veggies.",
    image: "/images/quiche.jpg",
    rating: 4.4,
    price: "8.99",
    category: "Pasta", // ক্যাটাগরি যোগ করা হলো
    details: [
      "Homemade crust filled with a delicious mixture.",
      "Can be customized with your choice of veggies.",
      "Served warm for a delightful experience.",
      "Perfect for brunch or lunch."
    ],
  },
  {
    id: 16,
    name: "Cheesecake",
    description: "Creamy cheesecake with a graham cracker crust.",
    image: "/images/cheesecake.jpg",
    rating: 4.8,
    price: "10.99",
    category: "Icecream", // ক্যাটাগরি যোগ করা হলো
    details: [
      "Rich and smooth cheesecake filling.",
      "Topped with fresh berries or chocolate sauce.",
      "Perfectly balanced sweetness.",
      "A classic dessert for any occasion."
    ],
  },
  {
    id: 17,
    name: "Fruit Salad",
    description: "Fresh mixed fruit salad with a drizzle of honey.",
    image: "/images/fruitsalad.jpg",
    rating: 4.5,
    price: "6.49",
    category: "Soup", // ক্যাটাগরি যোগ করা হলো
    details: [
      "A mix of seasonal fruits like berries and melons.",
      "Drizzled with honey for extra sweetness.",
      "Refreshing and healthy.",
      "Great as a side or dessert."
    ],
  },
  {
    id: 18,
    name: "Chili",
    description: "Spicy chili with beans and meat.",
    image: "/images/chili.jpg",
    rating: 4.6,
    price: "9.99",
    category: "Soup", // ক্যাটাগরি যোগ করা হলো
    details: [
      "Hearty and flavorful with a kick.",
      "Made with ground beef and kidney beans.",
      "Topped with cheese and served hot.",
      "Perfect for a cold day."
    ],
  },
];

export default items;