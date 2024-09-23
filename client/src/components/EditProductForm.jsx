import React, { useState } from "react";
import axios from "axios";
import { baseUrl } from "../baseUrl";

const EditProductForm = ({ product, onProductEdited, setShowEditForm }) => {
  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [category, setCategory] = useState(product.category);
  const [price, setPrice] = useState(product.price);
  const [stock, setStock] = useState(product.stock);
  const [image, setImage] = useState(product.image);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedProduct = {
        ...product,
        name,
        description,
        category,
        price,
        stock,
        image,
      };
      const response = await axios.put(
        `${baseUrl}/products/${product._id}`,
        updatedProduct
      );
      onProductEdited(response.data);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div
      className={`z-50 fixed top-0 right-0 h-full overflow-scroll no-scrollbar w-full max-w-lg bg-white shadow-lg transition-transform transform ${
        setShowEditForm ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex justify-between items-center p-4 bg-gray-100 border-b">
        <h2 className="text-xl font-bold">Edit Product</h2>
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-5 rounded-md shadow-md"
      >
        <h2 className="text-2xl mb-4">Edit Product</h2>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Stock</label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block text-sm font-bold mb-2">
            Image
          </label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="flex justify-between">
        <button
            onClick={() => setShowEditForm(false)}
            className="border border-coffee text-coffee p-2 px-4 rounded-md hover:bg-coffee hover:text-white"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-coffee text-white p-2 px-4 rounded-md"
          >
            Save
          </button>
         
        </div>
      </form>
    </div>
  );
};

export default EditProductForm;
