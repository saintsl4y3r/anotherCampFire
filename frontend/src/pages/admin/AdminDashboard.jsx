import React from 'react';
import {
  Box, Typography, List, ListItem, ListItemIcon, ListItemText,
  AppBar, Toolbar, IconButton, CssBaseline, Drawer
} from '@mui/material';
import {
  Dashboard, Inventory, Category, Store, People, RateReview,
  Settings, Logout
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const menuItems = [
  { label: 'Tổng quan', icon: <Dashboard />, path: '/admin/overview' },
  { label: 'Sản phẩm', icon: <Inventory />, path: '/admin/products' },
  { label: 'Danh mục', icon: <Category />, path: '/admin/categories' },
  { label: 'Nhà sản xuất', icon: <Store />, path: '/admin/manufacturers' },
  { label: 'Người dùng', icon: <People />, path: '/admin/users' },
  { label: 'Đánh giá', icon: <RateReview />, path: '/admin/reviews' },
  { label: 'Cài đặt', icon: <Settings />, path: '/admin/settings' }
];

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 👉 Clear login state here (e.g., token or flag)
    localStorage.removeItem('token');
    localStorage.removeItem('adminLoggedIn');
    navigate('/login');
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      {/* Top AppBar */}
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

      {/* Sidebar Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box', pt: 8 }
        }}
      >
        <List>
          {menuItems.map((item, index) => (
            <ListItem button key={index} component="a" href={item.path}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: '#f5f5f5',
          p: 6,
          mt: 8
        }}
      >
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Xin chào, Quản trị viên 👋
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Hãy chọn một mục từ thanh bên trái để bắt đầu quản lý hệ thống.
        </Typography>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
