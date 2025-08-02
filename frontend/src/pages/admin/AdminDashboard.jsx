import React from 'react';
import {
  Box, Typography, List, ListItem, ListItemIcon, ListItemText,
  AppBar, Toolbar, IconButton, CssBaseline, Drawer
} from '@mui/material';
import {
  Dashboard, Inventory, Category as CategoryIcon, Store,
  People, RateReview, Settings, Logout, Report
} from '@mui/icons-material';
import { useNavigate, useLocation, Link as RouterLink } from 'react-router-dom';

import CategoriesScreen       from './CategoriesScreen';
import ProductScreen          from './ProductScreen';
import ManufacturersScreen    from './ManufacturersScreen';
import UsersScreen            from './UsersScreen';
import ReviewsScreen          from './ReviewsScreen';
import SettingsScreen         from './SettingsScreen';
import FinanceReport          from './FinanceReport';

const menuItems = [
  { label: 'Tổng quan',         icon: <Dashboard />,     path: '/admin/overview' },
  { label: 'Sản phẩm',          icon: <Inventory />,     path: '/admin/products' },
  { label: 'Danh mục',          icon: <CategoryIcon />,  path: '/admin/categories' },
  { label: 'Nhà sản xuất',      icon: <Store />,         path: '/admin/manufacturers' },
  { label: 'Người dùng',        icon: <People />,        path: '/admin/users' },
  { label: 'Đánh giá',          icon: <RateReview />,    path: '/admin/reviews' },
  { label: 'Cài đặt',           icon: <Settings />,      path: '/admin/settings' },
  { label: 'Báo cáo doanh thu', icon: <Report />,        path: '/admin/reports' },
];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('adminLoggedIn');
    navigate('/');
  };

  let MainContent;
  switch (pathname) {
    case '/admin/products':
      MainContent = <ProductScreen />;
      break;
    case '/admin/categories':
      MainContent = <CategoriesScreen />;
      break;
    case '/admin/manufacturers':
      MainContent = <ManufacturersScreen />;
      break;
    case '/admin/users':
      MainContent = <UsersScreen />;
      break;
    case '/admin/reviews':
      MainContent = <ReviewsScreen />;
      break;
    case '/admin/settings':
      MainContent = <SettingsScreen />;
      break;
    case '/admin/reports':
      MainContent = <FinanceReport />;
      break;
    case '/admin/overview':
    default:
      MainContent = (
        <>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Xin chào, Quản trị viên 👋
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Hãy chọn một mục từ thanh bên trái để bắt đầu quản lý hệ thống.
          </Typography>
        </>
      );
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <AppBar position="fixed" sx={{ zIndex: 1201, bgcolor: 'white', color: 'black' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" fontWeight="bold">
            🛠️ Trang Quản Trị CampFire
          </Typography>
          <IconButton color="inherit" edge="end" onClick={handleLogout} title="Đăng xuất">
            <Logout />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': { width: 240, boxSizing: 'border-box', pt: 8 }
        }}
      >
        <List>
          {menuItems.map((item, idx) => (
            <ListItem
              button
              key={idx}
              component={RouterLink}
              to={item.path}
              selected={pathname === item.path}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: '#f5f5f5',
          p: 6,
          mt: 8
        }}
      >
        {MainContent}
      </Box>
    </Box>
  );
}
