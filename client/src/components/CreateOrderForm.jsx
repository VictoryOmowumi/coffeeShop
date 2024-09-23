import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useOrder } from "../context/OrderContext";
import { baseUrl } from "../baseUrl";
import { ToastContainer, toast } from "react-toastify";
import useFetch from "../hook/useFetch";
import "react-toastify/dist/ReactToastify.css";

const CreateOrderForm = ({ onOrderCreated, showForm, setShowForm }) => {
  const { productList, addProduct, clearProducts, formState, updateFormState } =
    useOrder();
  const { data: products } = useFetch(`${baseUrl}/products`);
  const { data: customers } = useFetch(`${baseUrl}/customers`);

  useEffect(() => {
    updateFormState({
      date: new Date().toISOString().split("T")[0],
    });
  }, []);

  const validationSchema = Yup.object().shape({
    customerId: Yup.string().required("Required"),
    address: Yup.string().required("Required"),
    selectedProductId: Yup.string(),
    quantity: Yup.number(),
  });

  const handleAddProduct = (values, setFieldValue) => {
    const selectedProduct = products.find(
      (product) => product._id === values.selectedProductId
    );

    if (selectedProduct) {
      const newProduct = {
        productId: selectedProduct._id,
        name: selectedProduct.name,
        quantity: values.quantity,
        price: selectedProduct.price * values.quantity,
      };
      addProduct(newProduct);
      setFieldValue("selectedProductId", "");
      setFieldValue("quantity", 0);
    }
  };

  const calculateTotal = () => {
    return productList.reduce((acc, item) => acc + item.price, 0);
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    const orderData = {
      customerId: values.customerId,
      address: values.address,
      products: productList.map(({ productId, quantity }) => ({
        productId,
        quantity,
      })),
      date: values.date,
      total: calculateTotal(),
    };

    try {
      const response = await fetch(`${baseUrl}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });
      const data = await response.json();
      console.log("Order created:", data);
      if (response.status === 201) {
        onOrderCreated(data?.order);
        toast.success("Order created successfully", {
          onClose: () => {
            setShowForm(false);
            window.location.reload();
          },
        });
        clearProducts();
        updateFormState({
          customerId: "",
          address: "",
          selectedProductId: "",
          quantity: 0,
          date: new Date().toISOString().split("T")[0],
        });
      } 
    } catch (error) {
      toast.error("Failed to create order");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCustomerChange = (event, setFieldValue) => {
    const selectedCustomerId = event.target.value;
    setFieldValue("customerId", selectedCustomerId);

    if (selectedCustomerId) {
      const selectedCustomer = customers.find(
        (customer) => customer._id === selectedCustomerId
      );
      if (selectedCustomer) {
        setFieldValue("address", selectedCustomer.address || "");
        updateFormState({ address: selectedCustomer.address || "" });
      }
    } else {
      setFieldValue("address", "");
      updateFormState({ address: "" });
    }
  };

  return (
    <div
      className={`z-50 fixed top-0 right-0 h-full overflow-scroll no-scrollbar w-full max-w-lg bg-white shadow-lg transition-transform transform ${
        showForm ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex justify-between items-center p-4 bg-gray-100 border-b">
        <h2 className="text-xl font-bold">Create Order</h2>
        <button
          onClick={() => setShowForm(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          Close
        </button>
      </div>
      <Formik
        initialValues={formState}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, values, setFieldValue }) => (
          <Form className="space-y-4 p-5">
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="customerId"
              >
                Customer
              </label>
              <Field
                as="select"
                name="customerId"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                onChange={(e) => {
                  handleCustomerChange(e, setFieldValue);
                }}
              >
                <option value="">Select a customer</option>
                {customers.map((customer) => (
                  <option key={customer._id} value={customer._id}>
                    {customer.name}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="customerId"
                component="div"
                className="text-red-500 text-sm mt-1"
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
                name="address"
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                placeholder="Enter address"
                onChange={(e) => {
                  setFieldValue("address", e.target.value);
                  updateFormState({ address: e.target.value });
                }}
              />
              <ErrorMessage
                name="address"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="selectedProductId"
              >
                Product
              </label>
              <Field
                as="select"
                name="selectedProductId"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              >
                <option value="">Select a product</option>
                {products.map((product) => (
                  <option key={product._id} value={product._id}>
                    {product.name} - ${product.price}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="selectedProductId"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="quantity"
              >
                Quantity
              </label>
              <Field
                name="quantity"
                type="number"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                placeholder="Enter quantity"
                min="0"
              />
              <ErrorMessage
                name="quantity"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div className="flex justify-end my-3">
            <button
              type="button"
              className="bg-transparent border border-coffee hover:bg-coffee text-coffee hover:text-white font-bold py-2 px-4 rounded-md"
              onClick={() => handleAddProduct(values, setFieldValue)}
            >
              Add Product
            </button>
            </div>

            <div className="mt-6">
              <ul className="divide-y divide-gray-200">
                {productList.map((product, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center py-3"
                  >
                    <span>
                      {product.name} x {product.quantity}
                    </span>
                    <span>${product.price.toFixed(2)}</span>
                  </li>
                ))}
              </ul>
              <div className="text-right font-bold mt-4">
                Total: ${calculateTotal().toFixed(2)}
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-coffee hover:bg-coffee-light text-white font-bold py-2 px-4 rounded-md"
            >
              {isSubmitting ? "Creating..." : "Create Order"}
            </button>
          </Form>
        )}
      </Formik>
      <ToastContainer />
    </div>
  );
};

export default CreateOrderForm;
