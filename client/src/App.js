import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ProtectedRoute from './routes/ProtectedRoutes';
import Loader from './components/Loader';
import { AuthProvider } from './context/AuthContext';
import { OrderProvider } from './context/OrderContext';
import { NotificationProvider } from './context/NotificationContext';
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Products = lazy(() => import('./pages/Products'));
const Orders = lazy(() => import('./pages/Orders'));
const Customers = lazy(() => import('./pages/Customers'));
const Settings = lazy(() => import('./pages/Settings'));
const Login = lazy(() => import('./auth/Login'));

const App = () => {
  return (
    <AuthProvider>
      <OrderProvider>
        <NotificationProvider>
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route
                  index
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/products"
                  element={
                    <ProtectedRoute>
                      <Products />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/orders"
                  element={
                    <ProtectedRoute>
                      <Orders />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/customers"
                  element={
                    <ProtectedRoute>
                      <Customers />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/settings"
                  element={
                    <ProtectedRoute>
                      <Settings />
                    </ProtectedRoute>
                  }
                />
              </Route>
              <Route path="/login" element={<Login />} />
            </Routes>
          </Suspense>
        </NotificationProvider>
      </OrderProvider>
    </AuthProvider>
  );
};

export default App;