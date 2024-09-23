import React, { useState, useEffect } from "react";
import { baseUrl } from "../baseUrl";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductDetailsModal = ({ isOpen, onClose, product, onProductEdited }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedProduct, setEditedProduct] = useState(null);

  useEffect(() => {
    if (product) {
      setEditedProduct(product);
    }
  }, [product]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({ ...editedProduct, [name]: value });
  };

  const handleSave = async () => {
    if (!editedProduct) return;

    try {
      const response = await axios.put(
        `${baseUrl}/products/${editedProduct._id}`,
        editedProduct
      );
      toast.success(response.data.message || "Product updated successfully");
      onProductEdited(editedProduct); // Update parent component state
      setIsEditMode(false);
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product");
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setIsEditMode(false);
    }
  }, [isOpen]);

  if (!product) return null;

  return (
    <div
      className={`fixed top-0 right-0 h-full w-[500px] bg-white shadow-lg transform transition-transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="p-4 border-b relative">
        <h2 className="text-xl font-bold">Product Details</h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 absolute top-4 right-4"
        >
          &times;
        </button>
      </div>
      <div className="p-5 space-y-4">
        {isEditMode ? (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={editedProduct?.name || ""}
                onChange={handleInputChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                value={editedProduct?.description || ""}
                onChange={handleInputChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <input
                type="text"
                name="category"
                value={editedProduct?.category || ""}
                onChange={handleInputChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Price
              </label>
              <input
                type="number"
                name="price"
                value={editedProduct?.price || ""}
                onChange={handleInputChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Stock
              </label>
              <input
                type="number"
                name="stock"
                value={editedProduct?.stock || ""}
                onChange={handleInputChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <button
              onClick={handleSave}
              className="mt-4 bg-coffee text-white px-4 py-2 rounded-md"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditMode(false)}
              className="mt-4 ml-2bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <div className="mt-1 p-2 border border-gray-300 rounded-md">
                {editedProduct?.name || product.name}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <div className="mt-1 p-2 border border-gray-300 rounded-md">
                {editedProduct?.description || product.description}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <div className="mt-1 p-2 border border-gray-300 rounded-md">
                {editedProduct?.category || product.category}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Price
              </label>
              <div className="mt-1 p-2 border border-gray-300 rounded-md">
                {typeof editedProduct?.price === "number" ||
                !isNaN(parseFloat(editedProduct?.price))
                  ? `$${parseFloat(editedProduct?.price).toFixed(2)}`
                  : "N/A"}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Stock
              </label>
              <div className="mt-1 p-2 border border-gray-300 rounded-md">
                {editedProduct?.stock || product.stock}
              </div>
            </div>
            <button
              onClick={() => setIsEditMode(true)}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Edit
            </button>
          </>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default ProductDetailsModal;
