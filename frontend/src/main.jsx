import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink
} from '@apollo/client';

import App from './App.jsx';
import Login from './pages/Login.jsx';
import StartPage from './pages/StartPage.jsx';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import UserHome from './pages/UserHome.jsx';
import Register from './pages/Register.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import './index.css';

const graphqlUri = import.meta.env.VITE_GRAPHQL_URI;

const httpLink = createHttpLink({
  uri: graphqlUri,
  fetchOptions: {
    mode: 'cors',
  },
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/user" element={<UserHome />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </BrowserRouter>
  </ApolloProvider>
);
