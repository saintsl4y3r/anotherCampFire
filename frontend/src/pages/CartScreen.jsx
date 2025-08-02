import React from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Button,
  Divider
} from '@mui/material';
import { Delete } from '@mui/icons-material';

// 🔶 Dữ liệu giỏ hàng mẫu – sẽ thay bằng context hoặc Firestore nếu có
const cartItems = [
  {
    id: 1,
    name: 'Lều Coleman Instant Cabin 8',
    price: 450000,
    image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400&h=300&fit=crop',
    quantity: 1
  },
  {
    id: 2,
    name: 'Túi ngủ Marmot Trestles Elite Eco 20',
    price: 280000,
    image: 'https://images.unsplash.com/photo-1571863533956-01c88e79957e?w=400&h=300&fit=crop',
    quantity: 2
  }
];

// 👉 Format tiền
const formatPrice = (price) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(price);
};

const CartScreen = () => {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        🛒 Giỏ hàng của bạn
      </Typography>
      <Grid container spacing={4}>
        {/* Danh sách sản phẩm */}
        <Grid item xs={12} md={8}>
          {cartItems.map((item) => (
            <Card key={item.id} sx={{ mb: 2, display: 'flex' }}>
              <CardMedia
                component="img"
                sx={{ width: 120 }}
                image={item.image}
                alt={item.name}
              />
              <CardContent sx={{ flex: 1 }}>
                <Box display="flex" justifyContent="space-between">
                  <Box>
                    <Typography variant="h6">{item.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {formatPrice(item.price)} x {item.quantity}
                    </Typography>
                  </Box>
                  <Box>
                    <IconButton color="error">
                      <Delete />
                    </IconButton>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Grid>

        {/* Tóm tắt đơn hàng */}
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Tóm tắt đơn hàng
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Box display="flex" justifyContent="space-between" mb={2}>
              <Typography>Tổng cộng:</Typography>
              <Typography fontWeight="bold">{formatPrice(total)}</Typography>
            </Box>
            <Button variant="contained" fullWidth color="primary">
              Thanh toán ngay
            </Button>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CartScreen;
