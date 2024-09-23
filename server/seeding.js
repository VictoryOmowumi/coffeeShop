const products = [
  {
    name: 'Signature Blend',
    description: 'A rich, full-bodied coffee with notes of dark chocolate and black cherry. Grown on the slopes of a mist-covered mountain in Central America.',
    price: 12.99,
    stock: 50,
    image: 'https://iili.io/H8Y78Qt.webp',
    category: 'Central American',
  },
  {
    name: 'Golden Sunrise',
    description: 'A smooth and bright coffee with a citrusy kick. Sourced from the rolling hills of Africa.',
    price: 10.99,
    stock: 30,
    image: 'https://iili.io/H8Y7WEg.webp',
    category: 'African',
  },
  {
    name: 'Rainforest Rhapsody',
    description: 'An earthy and complex coffee with notes of toasted nuts and caramel. Sustainably grown in the rainforests of South America.',
    price: 14.99,
    stock: 40,
    image: 'https://iili.io/H8Y7kTN.webp',
    category: 'South American',
  },
  {
    name: 'Harvest Moon',
    description: 'A smooth and earthy blend with notes of cocoa and hazelnut.',
    price: 9.99,
    stock: 25,
    image: 'https://iili.io/H8Y7X4a.webp',
    category: 'Blend',
  },
  {
    name: 'Wildfire',
    description: 'A bold and smoky blend with notes of dark chocolate and molasses.',
    price: 12.99,
    stock: 45,
    image: 'https://iili.io/H8Y7r4s.webp',
    category: 'Blend',
  },
  {
    name: 'Walnut Wonder',
    description: 'A smooth and nutty coffee from the slopes of South America.',
    price: 9.99,
    stock: 35,
    image: 'https://iili.io/H8Y7gGn.webp',
    category: 'South American',
  },
  {
    name: 'Breezy Beans',
    description: 'This coffee blend is made from beans sourced from Honduras and Costa Rica. It is a light roast coffee with a bright and citrusy flavor profile. It is perfect for pour-over and drip coffee brewing methods.',
    price: 11.99,
    stock: 50,
    image: 'https://iili.io/H8Y7lpV.webp',
    category: 'Central American',
  },
  {
    name: 'Indo-Viet Roast',
    description: 'This coffee blend is made from beans sourced from Indonesia and Vietnam. It is a medium-dark roast coffee with a spicy and earthy flavor profile, with notes of cinnamon and clove. It is perfect for drip and French press brewing methods.',
    price: 13.99,
    stock: 20,
    image: 'https://iili.io/H8Y7wYv.webp',
    category: 'Asian',
  },
  {
    name: 'Ethiopian Yirgacheffe',
    description: 'A light and fruity coffee with notes of blueberry and citrus. Grown in the highlands of Ethiopia, this coffee is sure to brighten up your morning.',
    price: 12.99,
    stock: 60,
    image: 'https://iili.io/H8Y7VCF.webp',
    category: 'African',
  },
  {
    name: 'Lazy Days',
    description: 'A medium-bodied coffee with a sweet and nutty flavor. Grown in the lush regions of Brazil, this coffee is perfect for a lazy afternoon.',
    price: 9.99,
    stock: 15,
    image: 'https://iili.io/H8Y7NvR.webp',
    category: 'South American',
  },
  {
    "name": "Andean Almond",
    "description": "A smooth and mellow coffee from the mountains of South America, with hints of almond and toffee.",
    "price": 10.99,
    "stock": 50,  
    "image": "https://iili.io/H8Y5Sgj.webp",
    "category": "South American"
  },
  {
    "name": "Savanna Noir",
    "description": "A bold and rich coffee from the African savanna, with notes of dark chocolate and blackcurrant.",
    "price": 12.99,
    "stock": 50,  
    "image": "https://iili.io/H8Y7vjI.webp",
    "category": "African"
  },
  {
    "name": "Coconut Kiss",
    "description": "A light and refreshing coffee from the shores of the Asia Pacific, with a subtle coconut flavor.",
    "price": 9.99,
    "stock": 50,  
    "image": "https://iili.io/H8Y7GQ1.webp",
    "category": "Asia Pacific"
  },
  {
    "name": "Arabian Nights",
    "description": "A bold and spicy coffee from the Middle East, with notes of cardamom and cinnamon.",
    "price": 13.99,
    "stock": 50,  
    "image": "https://iili.io/H8Y7ckQ.webp",
    "category": "Middle Eastern"
  },
  {
    "name": "Midnight Mocha",
    "description": "Indulge in the rich, velvety flavors of this decadent mocha blend. Dark chocolate and espresso notes are combined with a touch of vanilla for a luxurious coffee experience.",
    "price": 14.99,
    "stock": 50,  
    "image": "https://iili.io/H8Y7Opp.webp",
    "category": "South American"
  },
  {
    "name": "Himalayan Heights",
    "description": "Grown on the steep slopes of the Himalayan Mountains, this coffee is known for its bright acidity and delicate floral notes. This light roast is perfect for those who prefer a more delicate flavor profile.",
    "price": 12.99,
    "stock": 50,  
    "image": "https://iili.io/H8Y7j3J.webp",
    "category": "Asia Pacific"
  },
  {
    "name": "Sumatra Blend",
    "description": "Get your day started with the bold and earthy flavors of Sumatra. Grown on the lush tropical slopes of the Gayo Highlands, this coffee is known for its full body, low acidity, and notes of dark chocolate and smoke.",
    "price": 8.99,
    "stock": 50,  
    "image": "https://iili.io/H8Y7UCX.webp",
    "category": "Asia Pacific"
  },
  {
    "name": "Bali Bliss",
    "description": "Escape to the tropical paradise of Bali with this smooth and mellow blend. Grown on small family farms, this coffee is shade-grown and hand-picked for a rich and nuanced flavor profile. Notes of milk chocolate, hazelnut, and a hint of tropical fruit.",
    "price": 11.99,
    "stock": 50,  
    "image": "https://iili.io/H8Y71TB.webp",
    "category": "Asia Pacific"
  },
  {
    "name": "Central Perk",
    "description": "A medium roast coffee with a smooth, nutty flavor and a hint of caramel. Inspired by your favorite coffee shop!",
    "price": 9.99,
    "stock": 50,  
    "image": "https://iili.io/H8Y7aYx.webp",
    "category": "Central American"
  },
  {
    "name": "Chilean Charm",
    "description": "This coffee boasts a smooth and balanced flavor, with notes of chocolate, caramel, and a hint of fruit. It has a medium body and a subtle acidity that will leave you feeling refreshed and energized.",
    "price": 12.99,
    "stock": 50,  
    "image": "https://iili.io/H8Y7EhP.webp",
    "category": "South American"
  }
];


const customers = [
  { name: "John Doe", email: "john.doe@example.com", address: "123 Elm Street, Springfield", phone: "555-1234" },
  { name: "Jane Smith", email: "jane.smith@example.com", address: "456 Oak Avenue, Metropolis", phone: "555-5678" },
  { name: "Emily Johnson", email: "emily.johnson@example.com", address: "789 Maple Drive, Gotham", phone: "555-9012" },
  { name: "Michael Brown", email: "michael.brown@example.com", address: "321 Pine Road, Star City", phone: "555-3456" },
  { name: "Sarah Wilson", email: "sarah.wilson@example.com", address: "654 Birch Lane, Central City", phone: "555-7890" },
  { name: "David Lee", email: "david.lee@example.com", address: "987 Cedar Street, Coast City", phone: "555-2345" },
  { name: "Laura Taylor", email: "laura.taylor@example.com", address: "213 Walnut Avenue, National City", phone: "555-6789" },
  { name: "James Anderson", email: "james.anderson@example.com", address: "546 Poplar Road, Keystone City", phone: "555-1230" },
  { name: "Anna Martinez", email: "anna.martinez@example.com", address: "879 Cherry Lane, Starling City", phone: "555-4567" },
  { name: "Robert Miller", email: "robert.miller@example.com", address: "132 Chestnut Street, Smallville", phone: "555-8901" },
];

  
const Product = require('./models/product');
const Customer = require('./models/customer');
// Function to seed initial data into the database
const seedDatabase = async () => {
  try {
    await Product.deleteMany(); 
    await Customer.deleteMany();
    await Product.insertMany(products);
    await Customer.insertMany(customers);   
    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};


seedDatabase();
