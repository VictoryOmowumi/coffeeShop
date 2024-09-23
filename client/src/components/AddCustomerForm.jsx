import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { baseUrl } from "../baseUrl";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const AddCustomerForm = ({ showForm, setShowForm }) => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    email: Yup.string().email().required("Required"),
    phone: Yup.string().required("Required"),
    address: Yup.string().required("Required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await fetch(`${baseUrl}/customers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to add customer");
      }

      setSubmitting(false);
      setShowForm(false);
      toast.success("Customer added successfully");

      const result = await response.json();
      console.log("Customer added successfully:", result);
    } catch (err) {
      console.error(err.message);
      toast.error("Failed to add customer");
    }
  };

  return (
    <div
      className={`z-50 fixed top-0 right-0 h-full overflow-scroll no-scrollbar w-full max-w-lg bg-white shadow-lg transition-transform transform ${
        showForm ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex justify-between items-center p-4 bg-gray-100 border-b">
        <h2 className="text-xl font-bold">Create New Customer</h2>
        <button
          onClick={() => setShowForm(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          Close
        </button>
      </div>

      <Formik
        initialValues={{
          name: "",
          email: "",
          phone: "",
          address: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, values, setFieldValue }) => (
          <Form className="space-y-4 p-5">
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="name"
              >
                Name
              </label>
              <Field
                type="text"
                name="name"
                id="name"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
              <ErrorMessage
                name="name"
                component="p"
                className="text-red-500 text-sm"
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="email"
              >
                Email
              </label>
              <Field
                type="email"
                name="email"
                id="email"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
              <ErrorMessage
                name="email"
                component="p"
                className="text-red-500 text-sm"
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="phone"
              >
                Phone
              </label>
              <Field
                type="text"
                name="phone"
                id="phone"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
              <ErrorMessage
                name="phone"
                component="p"
                className="text-red-500 text-sm"
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="address"
              >
                Address
              </label>
              <Field
                type="text"
                name="address"
                id="address"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
              <ErrorMessage
                name="address"
                component="p"
                className="text-red-500 text-sm"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-coffee text-white font-bold py-2 px-4 rounded-md hover:bg-coffee-light"
              disabled={isSubmitting}
            >
              Add Customer
            </button>
          </Form>
        )}
      </Formik>
      <ToastContainer />
    </div>
  );
};

export default AddCustomerForm;
