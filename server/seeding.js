const products = [
    {
      name: 'Signature Blend',
      description: 'A rich, full-bodied coffee with notes of dark chocolate and black cherry. Grown on the slopes of a mist-covered mountain in Central America.',
      price: 12.99,
      stock: 50,
      image: 'https://iili.io/H8Y78Qt.webp',
    },
    {
      name: 'Golden Sunrise',
      description: 'A smooth and bright coffee with a citrusy kick. Sourced from the rolling hills of Africa.',
      price: 10.99,
      stock: 30,
      image: 'https://iili.io/H8Y7WEg.webp',
    },
    {
      name: 'Rainforest Rhapsody',
      description: 'An earthy and complex coffee with notes of toasted nuts and caramel. Sustainably grown in the rainforests of South America.',
      price: 14.99,
      stock: 40,
      image: 'https://iili.io/H8Y7kTN.webp',
    },
    {
      name: 'Harvest Moon',
      description: 'A smooth and earthy blend with notes of cocoa and hazelnut.',
      price: 9.99,
      stock: 25,
      image: 'https://iili.io/H8Y7X4a.webp',
    },
    {
      name: 'Wildfire',
      description: 'A bold and smoky blend with notes of dark chocolate and molasses.',
      price: 12.99,
      stock: 45,
      image: 'https://iili.io/H8Y7r4s.webp',
    },
    {
      name: 'Walnut Wonder',
      description: 'A smooth and nutty coffee from the slopes of South America.',
      price: 9.99,
      stock: 35,
      image: 'https://iili.io/H8Y7gGn.webp',
    },
    {
      name: 'Breezy Beans',
      description: 'This coffee blend is made from beans sourced from Honduras and Costa Rica. It is a light roast coffee with a bright and citrusy flavor profile. It is perfect for pour-over and drip coffee brewing methods.',
      price: 11.99,
      stock: 50,
      image: 'https://iili.io/H8Y7lpV.webp',
    },
    {
      name: 'Indo-Viet Roast',
      description: 'This coffee blend is made from beans sourced from Indonesia and Vietnam. It is a medium-dark roast coffee with a spicy and earthy flavor profile, with notes of cinnamon and clove. It is perfect for drip and French press brewing methods.',
      price: 13.99,
      stock: 20,
      image: 'https://iili.io/H8Y7wYv.webp',
    },
    {
      name: 'Ethiopian Yirgacheffe',
      description: 'A light and fruity coffee with notes of blueberry and citrus. Grown in the highlands of Ethiopia, this coffee is sure to brighten up your morning.',
      price: 12.99,
      stock: 60,
      image: 'https://iili.io/H8Y7VCF.webp',
    },
    {
      name: 'Lazy Days',
      description: 'A medium-bodied coffee with a sweet and nutty flavor. Grown in the lush regions of Brazil, this coffee is perfect for a lazy afternoon.',
      price: 9.99,
      stock: 15,
      image: 'https://iili.io/H8Y7NvR.webp',
    }
  ];
  
  
const Product = require('./models/product');

// Function to seed initial data into the database
const seedDatabase = async () => {
  try {
    await Product.deleteMany(); // Clear existing data
    await Product.insertMany(products);
    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

// Seed the database on server startup
seedDatabase();
