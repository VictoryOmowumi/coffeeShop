import React from 'react';

const ViewDetailsModal = ({ isOpen, onClose, item }) => {
  if (!item) return null;

  const totalAmount = item.products.reduce(
    (sum, product) => sum + (product.product.price * product.quantity),
    0
  );

  return (
    <div
      className={`fixed top-0 right-0 h-full w-[500px] bg-white shadow-lg transform transition-transform ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="p-4 border-b relative">
        <h2 className="text-xl font-bold">Order Details</h2>
        <button
          onClick={onClose}
          className="text-coffee text-xl hover:text-gray-700 absolute top-4 right-4"
        >
          &times;
        </button>
      </div>
      <div className="p-5 space-y-6">
        {/* Order Details */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Order ID</label>
            <div className="mt-1 p-2 border border-gray-300 rounded-md">{item._id}</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Customer</label>
            <div className="mt-1 p-2 border border-gray-300 rounded-md">{item.customer?.name}</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <div className="mt-1 p-2 border border-gray-300 rounded-md">{item.address}</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Date</label>
            <div className="mt-1 p-2 border border-gray-300 rounded-md">
              {item ? new Date(item.date).toLocaleDateString() : ''}
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Products</label>
          <table className="w-full mt-2 border border-gray-300 rounded-md">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-2 text-left">Product</th>
                <th className="px-4 py-2 text-left">Quantity</th>
                <th className="px-4 py-2 text-left">Price</th>
              </tr>
            </thead>
            <tbody>
              {item.products.map((product, index) => (
                <tr key={index} className="border-b">
                  <td className="px-4 py-2">{product.product.name}</td>
                  <td className="px-4 py-2 text-center">{product.quantity}</td>
                  <td className="px-4 py-2">${(product.product.price * product.quantity).toFixed(2)}</td>
                </tr>
              ))}
              <tr className="font-bold">
                <td className="px-4 py-2 text-left" colSpan="2">Total</td>
                <td className="px-4 py-2 ">${totalAmount.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewDetailsModal;
