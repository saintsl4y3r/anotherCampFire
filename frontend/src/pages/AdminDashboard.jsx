import React from 'react';
import { Box, Typography, Button, Grid, Paper } from '@mui/material';

const AdminDashboard = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(to right, #fbc2eb, #a6c1ee)',
        padding: 4,
      }}
    >
      <Typography variant="h3" fontWeight="bold" gutterBottom>
        🎩 CampFire Admin Dashboard
      </Typography>
      <Typography variant="subtitle1" gutterBottom color="#444">
        Quản lý hệ thống thiết bị, người dùng và đơn thuê.
      </Typography>

      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid item xs={12} md={4}>
          <Paper elevation={4} sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6">📦 Quản lý sản phẩm</Typography>
            <Button variant="outlined" sx={{ mt: 2 }}>Xem sản phẩm</Button>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={4} sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6">👥 Quản lý người dùng</Typography>
            <Button variant="outlined" sx={{ mt: 2 }}>Danh sách người dùng</Button>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={4} sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6">📄 Đơn thuê thiết bị</Typography>
            <Button variant="outlined" sx={{ mt: 2 }}>Xem đơn thuê</Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashboard;
