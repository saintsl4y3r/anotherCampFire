import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import Login from './pages/Login.jsx';
import StartPage from './pages/Start.page.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import UserHome from './pages/UserHome.jsx';
import './index.css';
import Register from './pages/Register.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<StartPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/user" element={<UserHome />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  </BrowserRouter>
);
