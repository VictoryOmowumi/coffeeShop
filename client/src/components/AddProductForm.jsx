import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import CustomInput from './Input';
import { baseUrl } from '../baseUrl';

const AddProductForm = ({ onProductAdded }) => {
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

  const handleSubmit = async (values, { setSubmitting }) => {
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
      } else {
        console.error('Failed to add product', data);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, touched, errors }) => (
        <Form className="space-y-4 bg-white p-5 rounded-md shadow-sm">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <CustomInput name="name" placeholder="Enter product name" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <CustomInput name="description" as="textarea" placeholder="Enter product description" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <CustomInput name="price" type="number" placeholder="Enter product price" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Stock</label>
            <CustomInput name="stock" type="number" placeholder="Enter product stock" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Image URL</label>
            <CustomInput name="image" placeholder="Enter product image URL" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <CustomInput name="category" placeholder="Enter product category" />
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
  );
};

export default AddProductForm;
