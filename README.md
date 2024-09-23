Coffee Shop Management Application ☕️
This is a full-stack Coffee Shop Management Application built with Node.js, Express.js, and React.js. It provides features for managing products, orders, customers, and an admin dashboard for overseeing key metrics.

Table of Contents
Features
Tech Stack
Getting Started
Prerequisites
Installation
Running the Application
Screenshots
API Endpoints
Contributing
License

Features
Dashboard: Visual overview with sales charts, total sales, orders, products in stock, and low stock notifications.
Products Management: Add, update, delete, and filter products.
Orders Management: View and filter orders, create new orders.
Customer Management: View customer list, register new customers.
Admin Settings: Admins can view and manage all users.
Tech Stack
Frontend: React.js, Tailwind CSS
Backend: Node.js, Express.js
Database: MongoDB (or MySQL/PostgreSQL)
Authentication: JWT (JSON Web Tokens)
Charting: Chart.js (or whatever charting library you used)
Getting Started
Prerequisites
Node.js v14+
MongoDB (if you're using MongoDB as your database)
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/VictoryOmowumi/coffeeShop.git
cd coffee-shop-app
Install backend dependencies:

bash
Copy code
cd backend
npm install
Install frontend dependencies:

bash
Copy code
cd ../frontend
npm install
Set up environment variables:

Create a .env file in the backend folder and add the following variables:

bash
Copy code
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
Running the Application
Run the backend server:

bash
Copy code
cd backend
npm start
Run the frontend:

bash
Copy code
cd ../frontend
npm start
The application should now be running on http://localhost:3000 (frontend) and http://localhost:5000 (backend).

Dashboard Overview
[Screenshot 2024-09-23 140125](https://github.com/user-attachments/assets/618440f6-4476-4f9e-b152-e0efbd15dc0c)
Settings
![Screenshot 2024-09-23 140102](https://github.com/user-attachments/assets/c9061d6d-f76c-43a1-a05e-056ffd3dd6b0)
Login Page
![Screenshot 2024-09-23 140222](https://github.com/user-attachments/assets/ecfeac8e-235f-4b0a-8a62-b132777c1d54)
Settings Page
![Screenshot 2024-09-23 140203](https://github.com/user-attachments/assets/ae3aa82c-8630-4362-8556-8319fe4220c0)
Orders Page
.![Screenshot 2024-09-23 140144](https://github.com/user-attachments/assets/f5b18c25-1f9a-4278-ac76-cd73b6e80137)
API Endpoints
Here are some of the key API endpoints used in the backend:

GET /api/products: Fetch all products.
POST /api/products: Create a new product.
PUT /api/products/
: Update a product by ID.
DELETE /api/products/
: Delete a product by ID.
GET /api/orders: Fetch all orders.
POST /api/orders: Create a new order.
GET /api/customers: Fetch all customers.
POST /api/customers: Register a new customer




