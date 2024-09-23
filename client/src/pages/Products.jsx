import React, { useState, useEffect } from "react";
import useFetch from "../hook/useFetch";
import { baseUrl } from "../baseUrl";
import Filter from "../components/Filter";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import AddProductForm from "../components/AddProductForm";
import EditProductForm from "../components/EditProductForm";
import CustomModal from "../components/Modal";
import axios from "axios";
import {
  MdOutlineArrowForwardIos,
  MdOutlineArrowBackIos,
} from "react-icons/md";
import ProductDetailsModal from "../components/ProductDetailsModal"; 
import Loading from "../components/Loading";

const Products = () => {
  const { data: products, loading, error } = useFetch(`${baseUrl}/products`);
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showCategories, setShowCategories] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deletingProductId, setDeletingProductId] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null); // For product details modal
  const [showProductDetails, setShowProductDetails] = useState(false); // Control modal visibility

  const itemsPerPage = 10;

  const handleProductAdded = (newProduct) => {
    setFilteredProducts([newProduct, ...filteredProducts]);
    setShowForm(false);
  };

  const handleProductEdited = (updatedProduct) => {
    const updatedProducts = filteredProducts.map((product) =>
      product._id === updatedProduct._id ? updatedProduct : product
    );
    setFilteredProducts(updatedProducts);
    setShowEditForm(false);
  };

  const handleSearch = (e) => setSearch(e.target.value);
  const handleCategoryChange = (e) => setSelectedCategory(e.target.value);

  useEffect(() => {
    if (products) {
      const filtered = products.filter((product) => {
        const matchesCategory = selectedCategory
          ? product.category === selectedCategory
          : true;
        const matchesSearch = product.name
          .toLowerCase()
          .includes(search.toLowerCase());
        return matchesCategory && matchesSearch;
      });
      setFilteredProducts(filtered);
    }
  }, [products, search, selectedCategory]);

  const handlePageChange = (page) => setCurrentPage(page);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setShowEditForm(true);
  };

  const handleDeleteClick = async () => {
    try {
      await axios.delete(`${baseUrl}/products/${deletingProductId}`);
      setFilteredProducts(
        filteredProducts.filter((product) => product._id !== deletingProductId)
      );
      setShowModal(false);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const showDeleteModal = (id) => {
    setDeletingProductId(id);
    setShowModal(true);
  };

  const handleViewClick = (product) => {
    setSelectedProduct(product);
    setShowProductDetails(true);
  };

  if (loading) return <Loading />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-5 relative bg-gray-100 flex-1">
      <div className="flex justify-between mb-5">
        <h1 className="text-2xl font-serif font-bold text-brown-900">
          Products
        </h1>
      </div>
      <AddProductForm
        onProductAdded={handleProductAdded}
        showForm={showForm}
        setShowForm={setShowForm}
      />
      {showEditForm && (
        <EditProductForm
          product={editingProduct}
          onProductEdited={handleProductEdited}
          setShowEditForm={setShowEditForm}
        />
      )}
      <CustomModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Delete Product"
        content="Are you sure you want to delete this product?"
        buttonText="Delete"
        onButtonClick={handleDeleteClick}
      />
      <ProductDetailsModal
        isOpen={showProductDetails}
        onClose={() => setShowProductDetails(false)}
        product={selectedProduct}
        onProductEdited={handleProductEdited}
      />
      <Filter
        search={search}
        handleSearch={handleSearch}
        selectedCategory={selectedCategory}
        handleCategoryChange={handleCategoryChange}
        showForm={showForm}
        setShowForm={setShowForm}
        btnText="Add Product"
        showCategories={showCategories}
      />
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
          {currentProducts.map((product, index) => (
            <tr key={product._id} className="border-t">
              <td className="px-4 py-3">{index + 1 + startIndex}</td>
              <td className="px-4 py-3">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded-md"
                />
              </td>
              <td className="px-4 py-3">{product.name}</td>
              <td className="px-4 py-3">
                {product?.description?.substring(0, 50)}...{" "}
              </td>
              <td className="px-4 py-3">{product?.category || "Espresso"}</td>
              <td className="px-4 py-3">
                {typeof product.price === "number" ||
                !isNaN(parseFloat(product.price))
                  ? `$${parseFloat(product.price).toFixed(2)}`
                  : "N/A"}
              </td>

              <td className="px-4 py-3">{product?.stock}</td>
              <td className="px-4 py-3 gap-3">
                <button
                  className="text-coffee hover:text-coffee-light"
                  onClick={() => handleViewClick(product)}
                >
                  <FaEye />
                </button>
                <button
                  className="ml-5 text-coffee hover:text-coffee-light"
                  onClick={() => handleEditClick(product)}
                >
                  <FaEdit />
                </button>
                <button
                  className="ml-5 text-coffee hover:text-coffee-light"
                  onClick={() => showDeleteModal(product._id)}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-5">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className="px-4 py-2 mx-1 border bg-white text-coffee rounded-md"
          disabled={currentPage === 1}
        >
          <MdOutlineArrowBackIos />
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 mx-1 border ${
              index + 1 === currentPage
                ? "bg-coffee text-white"
                : "bg-white text-coffee"
            } rounded-md`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className="px-4 py-2 mx-1 border bg-white text-coffee rounded-md"
          disabled={currentPage === totalPages}
        >
          <MdOutlineArrowForwardIos />
        </button>
      </div>
    </div>
  );
};

export default Products;
