import React, { useState, useEffect } from 'react';
import useFetch from '../hook/useFetch';
import { baseUrl } from '../baseUrl';
import Filter from '../components/Filter';
import { FaEdit, FaTrash } from 'react-icons/fa';
import AddProductForm from '../components/AddProductForm';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';

const Products = () => {
  const { data: products, loading, error } = useFetch(`${baseUrl}/products`);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [file, setFile] = useState(null);

  const handleProductAdded = (newProduct) => {
    setFilteredProducts([newProduct, ...filteredProducts]);
    setShowForm(false);
  };

  const handleSearch = (e) => setSearch(e.target.value);
  const handleCategoryChange = (e) => setSelectedCategory(e.target.value);
  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleFileUpload = async () => {
    if (file) {
      const fileType = file.type;
      if (fileType.includes('csv')) {
        Papa.parse(file, {
          header: true,
          complete: (results) => {
            uploadProducts(results.data);
          },
        });
      } else if (fileType.includes('excel') || fileType.includes('spreadsheetml')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: 'array' });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const json = XLSX.utils.sheet_to_json(worksheet);
          uploadProducts(json);
        };
        reader.readAsArrayBuffer(file);
      }
    }
  };

  const uploadProducts = async (products) => {
    try {
      const response = await fetch(`${baseUrl}/products/upload`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(products),
      });
      const data = await response.json();
      if (response.ok) {
        setFilteredProducts([...filteredProducts, ...data]);
      } else {
        console.error('Failed to upload products', data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    if (products) {
      const filtered = products.filter(product => {
        const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
        const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
        return matchesCategory && matchesSearch;
      });
      setFilteredProducts(filtered);
    }
  }, [products, search, selectedCategory]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-5 bg-gray-100 flex-1">
      <div className="flex justify-between mb-5">
        <div></div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-coffee hover:bg-coffee-light text-white font-bold py-2 px-4 rounded-md"
        >
          {showForm ? 'Close Form' : 'Add Product'}
        </button>
      </div>
      {showForm && <AddProductForm onProductAdded={handleProductAdded} />}
      <div className="mb-5">
        <input type="file" accept=".csv,.xlsx,.xls" onChange={handleFileChange} className="mb-3"/>
        <button onClick={handleFileUpload} className="bg-coffee hover:bg-coffee-light text-white font-bold py-2 px-4 rounded-md">
          Upload File
        </button>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <Filter
            search={search}
            handleSearch={handleSearch}
            selectedCategory={selectedCategory}
            handleCategoryChange={handleCategoryChange}
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
              {filteredProducts.map((product, index) => (
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
