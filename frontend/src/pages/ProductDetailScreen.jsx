import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  Rating,
  Box,
  Chip,
  Divider,
  CircularProgress,
  IconButton,
} from '@mui/material';
import { ArrowBack, ShoppingCart, Favorite, FavoriteBorder } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '../firebase';

const ProductDetailScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const auth = getAuth();
  const user = auth.currentUser;

  const productsData = [
    // Dữ liệu mẫu từ trước
    {
      id: 1,
      name: "Lều Coleman Instant Cabin 8",
      category: "Lều",
      manufacturer: "Coleman",
      price: 450000,
      originalPrice: 4500000,
      stock: 15,
      description: "Lều gia đình 8 người, dựng trong 60 giây với công nghệ Pre-Attached Poles",
      specifications: {
        capacity: "8 người",
        dimensions: "4.3m x 2.4m x 1.8m",
        weight: "18.5kg",
        material: "Polyester 75D, chống thấm nước"
      },
      image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400&h=300&fit=crop",
      rating: 4.5,
      reviews: 32,
      hot: true,
      availability: "Có sẵn"
    },
    {
      id: 2,
      name: "Túi ngủ Marmot Trestles Elite Eco 20",
      category: "Túi ngủ",
      manufacturer: "Marmot",
      price: 280000,
      originalPrice: 2800000,
      stock: 8,
      description: "Túi ngủ mùa đông với lớp lót SpiraFil Eco làm từ chai nhựa tái chế",
      specifications: {
        temperature: "-6°C đến 4°C",
        dimensions: "203cm x 81cm",
        weight: "1.36kg",
        material: "Nylon Pertex Quantum, SpiraFil Eco"
      },
      image: "https://images.unsplash.com/photo-1571863533956-01c88e79957e?w=400&h=300&fit=crop",
      rating: 4.7,
      reviews: 18,
      availability: "Còn ít"
    },
  ];

  useEffect(() => {
    const foundProduct = productsData.find((p) => p.id === parseInt(id));
    setTimeout(() => {
      setProduct(foundProduct || null);
      setLoading(false);
    }, 500);

    if (user) {
      checkWishlistStatus();
    }
  }, [id, user]);

  const checkWishlistStatus = async () => {
    if (user) {
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        const wishlist = userDoc.data().wishlist || [];
        setIsInWishlist(wishlist.some((item) => item.id === parseInt(id)));
      }
    }
  };

  const toggleWishlist = async () => {
    if (!user) {
      alert('Vui lòng đăng nhập để sử dụng tính năng này!');
      return;
    }

    const productData = {
      id: parseInt(id),
      name: product.name,
      image_url: product.image,
      category: [product.category],
      price: product.price,
    };

    try {
      const userRef = doc(db, 'users', user.uid);
      if (isInWishlist) {
        await updateDoc(userRef, {
          wishlist: arrayRemove(productData),
        });
        setIsInWishlist(false);
      } else {
        await updateDoc(userRef, {
          wishlist: arrayUnion(productData),
        }, { merge: true });
        setIsInWishlist(true);
      }
    } catch (error) {
      console.error('Lỗi khi cập nhật wishlist: ', error);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const getAvailabilityColor = (availability) => {
    switch (availability) {
      case 'Có sẵn': return 'success';
      case 'Còn ít': return 'warning';
      case 'Hết hàng': return 'error';
      default: return 'default';
    }
  };

  if (loading) {
    return (
      <Container sx={{ py: 10, textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!product) {
    return (
      <Container sx={{ py: 10, textAlign: 'center' }}>
        <Typography variant="h5" color="text.secondary">
          Sản phẩm không tồn tại.
        </Typography>
        <Button
          variant="contained"
          startIcon={<ArrowBack />}
          onClick={() => navigate('/library')}
          sx={{ mt: 2 }}
        >
          Quay lại
        </Button>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 5 }}>
      <Button
        variant="outlined"
        startIcon={<ArrowBack />}
        onClick={() => navigate('/library')}
        sx={{ mb: 4, color: '#667eea', borderColor: '#667eea', '&:hover': { borderColor: '#4a5fc1', backgroundColor: 'rgba(102, 126, 234, 0.1)' } }}
      >
        Quay lại
      </Button>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 2, boxShadow: 3, height: '100%' }}>
            <CardMedia
              component="img"
              height="400"
              image={product.image}
              alt={product.name}
              sx={{
                transition: 'transform 0.3s',
                '&:hover': { transform: 'scale(1.05)' },
              }}
            />
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3, borderRadius: 2, boxShadow: 3, height: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h4" fontWeight="bold">
                {product.name}
              </Typography>
              <IconButton onClick={toggleWishlist} color={isInWishlist ? 'error' : 'default'}>
                {isInWishlist ? <Favorite /> : <FavoriteBorder />}
              </IconButton>
            </Box>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Thương hiệu: {product.manufacturer}
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Rating value={product.rating} readOnly precision={0.1} />
              <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                ({product.reviews} đánh giá)
              </Typography>
            </Box>
            <Typography variant="h5" color="primary" fontWeight="bold" sx={{ mb: 1 }}>
              {formatPrice(product.price)}/ngày
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2, textDecoration: 'line-through' }}>
              Giá mua: {formatPrice(product.originalPrice)}
            </Typography>
            <Chip
              label={product.availability}
              color={getAvailabilityColor(product.availability)}
              sx={{ mb: 2 }}
            />

            <Divider sx={{ my: 2 }} />

            <Typography variant="body1" paragraph>
              {product.description}
            </Typography>

            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Thông số kỹ thuật
            </Typography>
            <Box sx={{ mb: 2 }}>
              {Object.entries(product.specifications).map(([key, value]) => (
                <Typography key={key} variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  <strong>{key}:</strong> {value}
                </Typography>
              ))}
            </Box>

            <Button
              variant="contained"
              color="primary"
              startIcon={<ShoppingCart />}
              fullWidth
              sx={{ py: 1.5, fontSize: '1rem', borderRadius: 2 }}
              disabled={product.availability === 'Hết hàng'}
            >
              {product.availability === 'Hết hàng' ? 'Hết hàng' : 'Thuê ngay'}
            </Button>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetailScreen;