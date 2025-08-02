import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink
} from '@apollo/client';

import StartPage from './pages/StartPage.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import UserHome from './pages/UserHome.jsx';
import NoPage from './pages/NoPage.jsx';

import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import CategoriesScreen from './pages/admin/CategoriesScreen.jsx';
import ManufacturersScreen from './pages/admin/ManufacturersScreen.jsx';
import ReviewsScreen from './pages/admin/ReviewsScreen.jsx';
import SettingsScreen from './pages/admin/SettingsScreen.jsx';
import UsersScreen from './pages/admin/UsersScreen.jsx';
import ProductsScreen from './pages/admin/ProductScreen.jsx';
import FinanceReport from './pages/admin/FinanceReport.jsx';

// component
import CartScreen from './pages/CartScreen.jsx';
import WishlistScreen from './pages/WishlistScreen.jsx';
import ProfileScreen from './pages/ProfileScreen.jsx';
import LibraryScreen from './pages/LibraryScreen.jsx';
import PaymentScreen from './pages/PaymentScreen.jsx';
import ProductDetailScreen from './pages/ProductDetailScreen.jsx';

import './index.css';

const graphqlUri = import.meta.env.VITE_GRAPHQL_URI;
const httpLink = createHttpLink({
  uri: graphqlUri,
  fetchOptions: { mode: 'cors' },
});
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<StartPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/user" element={<UserHome />} />
        
        {/* User Routes (thêm các route mới) */}
        <Route path="/cart" element={<CartScreen />} />
        <Route path="/wishlist" element={<WishlistScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/library" element={<LibraryScreen />} />
        <Route path="/users" element={<UsersScreen />} /> 
        <Route path="/payment" element={<PaymentScreen />} />
        <Route path="/product/:id" element={<ProductDetailScreen />} />
        <Route path="/category/:slug" element={<LibraryScreen />} />
        <Route path="/brand/:name" element={<LibraryScreen />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/overview" element={<AdminDashboard />} />
        <Route path="/admin/categories" element={<CategoriesScreen />} />
        <Route path="/admin/manufacturers" element={<ManufacturersScreen />} />
        <Route path="/admin/users" element={<UsersScreen />} />
        <Route path="/admin/reviews" element={<ReviewsScreen />} />
        <Route path="/admin/settings" element={<SettingsScreen />} />
        <Route path="/admin/products" element={<ProductsScreen />} />
        <Route path="/admin/reports" element={<FinanceReport />} />

        {/* 404 */}
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  </ApolloProvider>
);