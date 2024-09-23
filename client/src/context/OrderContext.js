// src/context/OrderContext.js
import React, { createContext, useContext, useState } from 'react';

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [productList, setProductList] = useState([]);
  const [formState, setFormState] = useState({
    customerId: '',
    address: '',
    selectedProductId: '',
    quantity: 0,
    date: new Date().toISOString().split('T')[0],
  });

  const addProduct = (product) => {
    setProductList([...productList, product]);
  };

  const clearProducts = () => {
    setProductList([]);
  };

  const updateFormState = (newFormState) => {
    setFormState((prevState) => ({
      ...prevState,
      ...newFormState,
    }));
  };

  return (
    <OrderContext.Provider
      value={{
        productList,
        formState,
        addProduct,
        clearProducts,
        updateFormState,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => useContext(OrderContext);
