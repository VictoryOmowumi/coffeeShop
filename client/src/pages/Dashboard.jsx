import React from 'react';

const Dashboard = () => {
  return (
    <div className="p-8 bg-gray-100 flex-1">
      <h1 className="text-3xl font-bold text-brown-900 mb-6">Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-2">Total Sales</h2>
          <p className="text-gray-700">$12,340</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-2">Orders</h2>
          <p className="text-gray-700">120</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-2">Products in Stock</h2>
          <p className="text-gray-700">230</p>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-bold mb-4">Recent Orders</h2>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b-2 border-gray-300">Order ID</th>
              <th className="py-2 px-4 border-b-2 border-gray-300">Customer</th>
              <th className="py-2 px-4 border-b-2 border-gray-300">Total</th>
              <th className="py-2 px-4 border-b-2 border-gray-300">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-4 border-b">12345</td>
              <td className="py-2 px-4 border-b">John Doe</td>
              <td className="py-2 px-4 border-b">$120.00</td>
              <td className="py-2 px-4 border-b">Shipped</td>
            </tr>
            {/* More rows as needed */}
          </tbody>
        </table>
      </div>

      {/* Top Products */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-bold mb-4">Top Products</h2>
        <ul>
          <li className="py-2 border-b">Signature Blend</li>
          <li className="py-2 border-b">Golden Sunrise</li>
          <li className="py-2 border-b">Rainforest Rhapsody</li>
          {/* More items as needed */}
        </ul>
      </div>

      {/* Notifications */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Notifications</h2>
        <p className="text-gray-700">You have 3 new orders to process.</p>
      </div>
    </div>
  );
};

export default Dashboard;
