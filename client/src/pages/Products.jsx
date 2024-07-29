import React from "react";
import useFetch from "../hook/useFetch";
import { baseUrl } from "../baseUrl";
import Filter from "../components/Filter";
import { FaEdit, FaTrash } from "react-icons/fa";

const Products = () => {
  const { data: products, loading, error } = useFetch(`${baseUrl}/products`);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-5 bg-gray-100 flex-1">
      <div className="flex justify-between mb-5">
        <div></div>
        <button className="bg-coffee hover:bg-coffee-light text-white font-bold py-2 px-4 rounded-md">
          Add Product
        </button>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <Filter />
          <table className="w-full bg-white rounded-md shadow-sm">
            <thead className="bg-coffee-light text-white rounded-md">
              <tr className="text-left">
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Image</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Description</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Stock</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={product._id} className="border-t">
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  </td>
                  <td className="px-4 py-3">{product.name}</td>
                  <td className="px-4 py-3">
                    {product.description.substring(0, 50)}...{" "}
                  </td>
                  <td className="px-4 py-3">
                    {product.category || "Espresso"}
                  </td>
                  <td className="px-4 py-3">${product.price.toFixed(2)}</td>
                  <td className="px-4 py-3">{product.stock}</td>
                  <td className="px-4 py-3 gap-3">
                    <button className="text-coffee hover:text-coffee-light">
                      <FaEdit />
                    </button>
                    <button className="ml-5 text-coffee hover:text-coffee-light">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default Products;
