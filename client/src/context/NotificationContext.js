import React, { createContext, useContext, useState, useEffect } from 'react';
import { baseUrl } from '../baseUrl';
const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Function to check stock levels and update notifications
    const checkStockLevels = async () => {
      const response = await fetch(`${baseUrl}/products`);
      const products = await response.json();

      const lowStockNotifications = products
        .filter(product => product.stock < 15)
        .map(product => `Low stock for ${product.name}: Only ${product.stock} left.`);

      setNotifications(lowStockNotifications);
    };

    checkStockLevels();
  }, []); // Empty dependency array means this runs once on mount

  return (
    <NotificationContext.Provider value={{ notifications }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);
