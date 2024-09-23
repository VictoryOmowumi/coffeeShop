import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import { baseUrl } from '../baseUrl';
import useFetch from '../hook/useFetch';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddProductForm = ({ onProductAdded, showForm, setShowForm }) => {
  const [file, setFile] = useState(null);

  const { data: categories, loading, error } = useFetch(`${baseUrl}/products/categories`);

  const initialValues = {
    name: '',
    description: '',
    price: '',
    stock: '',
    image: '',
    category: ''
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    description: Yup.string().required('Required'),
    price: Yup.number().required('Required').positive('Must be positive'),
    stock: Yup.number().required('Required').integer('Must be an integer'),
    image: Yup.string().url('Invalid URL').required('Required'),
    category: Yup.string().required('Required')
  });

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadProducts = async (products) => {
    try {
      const response = await fetch(`${baseUrl}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(products),
      });
      const data = await response.json();
      if (response.ok) {
        onProductAdded(data);
        toast.success('Products uploaded successfully');
      } else {
        console.error('Failed to upload products', data);
        toast.error('Failed to upload products');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to upload products');
    }
  };

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

  const handleSubmit = async (values, { setSubmitting }) => {
    if (file) {
      await handleFileUpload();
    } else {
      try {
        const response = await fetch(`${baseUrl}/products`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(values)
        });
        const data = await response.json();
        if (response.ok) {
          onProductAdded(data);
          toast.success('Product added successfully');
        } else {
          console.error('Failed to add product', data);
          toast.error('Failed to add product');
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setSubmitting(false);
      }
    }
  };

  return (
    <div className={`z-50 fixed top-0 right-0 h-full overflow-scroll no-scrollbar w-full max-w-lg bg-white shadow-lg transition-transform transform ${showForm ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="flex justify-between items-center p-4 bg-gray-100 border-b">
        <h2 className="text-xl font-bold">Add Product</h2>
        <button onClick={() => setShowForm(false)} className="text-gray-500 hover:text-gray-700">
          Close
        </button>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4 p-5">
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="name">Name</label>
              <Field name="name" type="text" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" placeholder="Enter product name" />
              <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="description">Description</label>
              <Field name="description" as="textarea" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" placeholder="Enter product description" />
              <ErrorMessage name="description" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="price">Price</label>
              <Field name="price" type="number" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" placeholder="Enter product price" min="0" />
              <ErrorMessage name="price" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="stock">Stock</label>
              <Field name="stock" type="number" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" placeholder="Enter product stock" min="0" />
              <ErrorMessage name="stock" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="image">Image URL</label>
              <Field name="image" type="text" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" placeholder="Enter product image URL" />
              <ErrorMessage name="image" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="category">Category</label>
              <Field as="select" name="category" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm">
                <option value="">Select a category</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="category" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Upload File</label>
              <div className="flex">
              <input type="file" accept=".csv,.xlsx,.xls" onChange={handleFileChange} className="mt-1 block w-full" />
                <button type="button" onClick={handleFileUpload} className="bg-coffee hover:bg-coffee-light text-white font-bold py-2 px-4 rounded-md ml-2">
                  Upload
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-coffee hover:bg-coffee-light text-white font-bold py-2 px-4 rounded-md"
            >
              {isSubmitting ? 'Adding...' : 'Add Product'}
            </button>
          </Form>
        )}
      </Formik>
      <ToastContainer />
    </div>
  );
};

export default AddProductForm;