import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container, Typography, Grid, Card, CardMedia, Box, Rating, Chip,
  Divider, CircularProgress, Button, Stack, IconButton, Snackbar, Alert
} from '@mui/material';
import { ArrowBack, ShoppingCart, Share } from '@mui/icons-material';
import WishlistButton from "../components/WishlistButton";

const mockProducts = [
  {
    id: 1,
    name: "Lều Coleman Instant Cabin 8",
    category: ["Lều", "Gia đình"],
    manufacturer: "Coleman",
    price: 450000,
    originalPrice: 4500000,
    stock: 15,
    description: "Lều gia đình 8 người, dễ dàng dựng chỉ trong 60 giây với công nghệ dựng nhanh. Có khả năng chống mưa, chắn gió tốt.",
    image_url: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&h=400&fit=crop",
    rating: 4.5,
    reviews: 32,
    hot: true,
    availability: "Có sẵn"
  },
  {
    id: 2,
    name: "Túi ngủ Marmot Trestles",
    category: ["Túi ngủ", "Mùa đông"],
    manufacturer: "Marmot",
    price: 280000,
    originalPrice: 2800000,
    stock: 8,
    description: "Túi ngủ mùa đông giữ nhiệt tốt, thiết kế chống thấm và thoáng khí phù hợp với các chuyến đi rừng lạnh.",
    image_url: "https://images.unsplash.com/photo-1571863533956-01c88e79957e?w=600&h=400&fit=crop",
    rating: 4.7,
    reviews: 18,
    hot: false,
    availability: "Còn ít"
  },
  {
    id: 3,
    name: "Bếp gas MSR PocketRocket 2",
    category: ["Bếp gas", "Du lịch"],
    manufacturer: "MSR",
    price: 1200000,
    originalPrice: 2000000,
    stock: 5,
    description: "Bếp gas siêu nhẹ, nhỏ gọn với khả năng đun sôi nước cực nhanh, phù hợp cho người đi phượt.",
    image_url: "https://www.wildearth.com.au/assets/full/S662-09884.jpg?20210318034158",
    rating: 4.8,
    reviews: 45,
    hot: true,
    availability: "Có sẵn"
  },
  {
    id: 4,
    name: "Ba lô Osprey Atmos AG 65",
    category: ["Ba lô", "Trekking"],
    manufacturer: "Osprey",
    price: 6500000,
    originalPrice: 8500000,
    stock: 3,
    description: "Ba lô trekking cao cấp với hệ thống lưng thông khí Anti-Gravity độc quyền, siêu thoải mái và phân bố trọng lượng tốt.",
    image_url: "https://balosaigon.com/wp-content/uploads/2023/06/Osprey-Atmos-AG-65.jpg",
    rating: 4.9,
    reviews: 67,
    hot: true,
    availability: "Có sẵn"
  }
];

const ProductDetailScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    const found = mockProducts.find(p => p.id === parseInt(id));
    setTimeout(() => setProduct(found || null), 300);
  }, [id]);

  const formatPrice = (p) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(p);
  const showSnackbar = (msg, severity = 'success') => setSnackbar({ open: true, message: msg, severity });
  const handleCloseSnackbar = () => setSnackbar(prev => ({ ...prev, open: false }));

  const addToCart = () => {
    if (product.stock === 0) {
      showSnackbar('Sản phẩm đã hết hàng', 'error');
    } else {
      showSnackbar(`Đã thêm "${product.name}" vào giỏ hàng`, 'success');
    }
  };

  if (!product) return <Container sx={{ py: 10, textAlign: 'center' }}><CircularProgress /></Container>;

  return (
    <>
      <Container sx={{ py: 5 }}>
        <Button variant="outlined" startIcon={<ArrowBack />} onClick={() => navigate('/')}>Quay lại</Button>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          <Grid item xs={12} md={6}>
            <Card><CardMedia component="img" height="400" image={product.image_url} /></Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" fontWeight="bold">{product.name}</Typography>
            <Typography variant="body1" color="text.secondary">Thương hiệu: {product.manufacturer}</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', my: 1 }}>
              <Rating value={product.rating} readOnly precision={0.1} />
              <Typography sx={{ ml: 1 }}>{product.rating} ({product.reviews} đánh giá)</Typography>
              {product.hot && <Chip label="HOT" color="error" sx={{ ml: 2 }} />}
            </Box>
            <Typography variant="h5" color="primary">{formatPrice(product.price)}/ngày</Typography>
            <Typography sx={{ textDecoration: 'line-through' }}>Giá mua: {formatPrice(product.originalPrice)}</Typography>
            <Chip label={product.availability} color="success" sx={{ my: 2 }} />
            <Typography variant="body2">Còn lại: {product.stock} sản phẩm</Typography>
            <Divider sx={{ my: 2 }} />
            <Typography>{product.description}</Typography>
            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
              <Button variant="contained" onClick={addToCart} startIcon={<ShoppingCart />}>Thuê ngay</Button>
              <WishlistButton product={product} />
              <IconButton onClick={() => navigator.clipboard.writeText(window.location.href)}><Share /></IconButton>
            </Stack>
          </Grid>
        </Grid>
      </Container>
      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={handleCloseSnackbar}>
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </>
  );
};

export default ProductDetailScreen;
