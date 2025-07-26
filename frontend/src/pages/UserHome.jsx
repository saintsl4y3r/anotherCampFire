import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia,
  Container,
  IconButton,
  Chip,
  Rating,
  Paper,
  Divider
} from '@mui/material';
import {
  Category,
  ShoppingCart,
  LocalShipping,
  RateReview,
  ArrowForward,
  TrendingUp,
  Verified,
  LocalOffer
} from '@mui/icons-material';

const UserHome = () => {
  // Sample data - trong thực tế sẽ fetch từ API
  const [categories] = useState([
    { id: 1, name: 'Lều cắm trại', icon: '🏕️', count: 45 },
    { id: 2, name: 'Túi ngủ', icon: '🛏️', count: 32 },
    { id: 3, name: 'Bếp dã ngoại', icon: '🔥', count: 28 },
    { id: 4, name: 'Đèn & Chiếu sáng', icon: '💡', count: 56 },
  ]);

  const [featuredProducts] = useState([
    { 
      id: 1, 
      name: 'Lều 4 người Coleman', 
      price: '150.000đ/ngày',
      rating: 4.5,
      reviews: 23,
      image: 'https://via.placeholder.com/300x200?text=Lều+Coleman',
      hot: true
    },
    { 
      id: 2, 
      name: 'Túi ngủ Naturehike', 
      price: '80.000đ/ngày',
      rating: 4.8,
      reviews: 45,
      image: 'https://via.placeholder.com/300x200?text=Túi+ngủ'
    },
    { 
      id: 3, 
      name: 'Bếp gas mini Campingmoon', 
      price: '50.000đ/ngày',
      rating: 4.3,
      reviews: 12,
      image: 'https://via.placeholder.com/300x200?text=Bếp+gas'
    },
    { 
      id: 4, 
      name: 'Đèn pin siêu sáng', 
      price: '30.000đ/ngày',
      rating: 4.6,
      reviews: 34,
      image: 'https://via.placeholder.com/300x200?text=Đèn+pin',
      hot: true
    },
  ]);

  const [manufacturers] = useState([
    { id: 1, name: 'Coleman', logo: '🏔️', products: 23 },
    { id: 2, name: 'Naturehike', logo: '🌲', products: 45 },
    { id: 3, name: 'Campingmoon', logo: '🌙', products: 18 },
    { id: 4, name: 'Kovea', logo: '⛺', products: 32 },
  ]);

  const [recentReviews] = useState([
    { 
      id: 1, 
      userName: 'Nguyễn Văn A', 
      product: 'Lều 4 người Coleman',
      rating: 5,
      comment: 'Lều rất tốt, chống thấm nước hiệu quả!'
    },
    { 
      id: 2, 
      userName: 'Trần Thị B', 
      product: 'Túi ngủ Naturehike',
      rating: 4,
      comment: 'Ấm áp và nhẹ, rất phù hợp cho chuyến đi dài.'
    },
  ]);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5' }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: 8,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h2" fontWeight="bold" gutterBottom>
                🏕️ CampFire
              </Typography>
              <Typography variant="h5" sx={{ mb: 3, opacity: 0.9 }}>
                Thuê thiết bị cắm trại chất lượng cao
              </Typography>
              <Typography variant="body1" sx={{ mb: 4 }}>
                Khám phá thiên nhiên cùng những thiết bị cắm trại hiện đại. 
                An toàn - Tiện lợi - Giá cả hợp lý
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button 
                  variant="contained" 
                  size="large"
                  sx={{ 
                    bgcolor: 'white', 
                    color: '#667eea',
                    '&:hover': { bgcolor: '#f0f0f0' }
                  }}
                  endIcon={<ArrowForward />}
                >
                  Khám phá ngay
                </Button>
                <Button 
                  variant="outlined" 
                  size="large"
                  sx={{ 
                    borderColor: 'white', 
                    color: 'white',
                    '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' }
                  }}
                >
                  Hướng dẫn
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  fontSize: '200px',
                  textAlign: 'center',
                  opacity: 0.3,
                  animation: 'float 3s ease-in-out infinite',
                  '@keyframes float': {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' }
                  }
                }}
              >
                ⛺
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Stats Section */}
      <Container sx={{ mt: -4, position: 'relative', zIndex: 1 }}>
        <Grid container spacing={3}>
          {[
            { label: 'Sản phẩm', value: '500+', icon: <ShoppingCart /> },
            { label: 'Khách hàng', value: '2000+', icon: <Verified /> },
            { label: 'Đánh giá 5⭐', value: '95%', icon: <RateReview /> },
            { label: 'Giao hàng nhanh', value: '24h', icon: <LocalShipping /> },
          ].map((stat, index) => (
            <Grid item xs={6} md={3} key={index}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  textAlign: 'center',
                  background: 'white',
                  borderRadius: 2,
                  transition: 'transform 0.3s',
                  '&:hover': { transform: 'translateY(-5px)' }
                }}
              >
                <Box sx={{ color: '#667eea', mb: 1 }}>{stat.icon}</Box>
                <Typography variant="h4" fontWeight="bold" color="#333">
                  {stat.value}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {stat.label}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Categories Section */}
      <Container sx={{ mt: 8 }}>
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            <Category sx={{ mr: 1, verticalAlign: 'middle' }} />
            Danh mục sản phẩm
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Chọn thiết bị phù hợp với nhu cầu của bạn
          </Typography>
        </Box>
        <Grid container spacing={3}>
          {categories.map((category) => (
            <Grid item xs={6} md={3} key={category.id}>
              <Card 
                sx={{ 
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  '&:hover': { 
                    transform: 'translateY(-5px)',
                    boxShadow: 3
                  }
                }}
              >
                <CardContent sx={{ textAlign: 'center', py: 4 }}>
                  <Typography variant="h1" sx={{ mb: 2 }}>
                    {category.icon}
                  </Typography>
                  <Typography variant="h6" fontWeight="bold">
                    {category.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {category.count} sản phẩm
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Featured Products Section */}
      <Container sx={{ mt: 8 }}>
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              <TrendingUp sx={{ mr: 1, verticalAlign: 'middle' }} />
              Sản phẩm nổi bật
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Được thuê nhiều nhất trong tuần
            </Typography>
          </Box>
          <Button endIcon={<ArrowForward />}>
            Xem tất cả
          </Button>
        </Box>
        <Grid container spacing={3}>
          {featuredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={3} key={product.id}>
              <Card 
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  '&:hover': { boxShadow: 3 }
                }}
              >
                {product.hot && (
                  <Chip 
                    label="HOT" 
                    color="error" 
                    size="small"
                    sx={{ 
                      position: 'absolute', 
                      top: 10, 
                      right: 10, 
                      zIndex: 1 
                    }}
                  />
                )}
                <CardMedia
                  component="img"
                  height="200"
                  image={product.image}
                  alt={product.name}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom>
                    {product.name}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Rating value={product.rating} readOnly size="small" />
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                      ({product.reviews})
                    </Typography>
                  </Box>
                  <Typography variant="h6" color="primary" fontWeight="bold">
                    {product.price}
                  </Typography>
                </CardContent>
                <Box sx={{ p: 2 }}>
                  <Button variant="contained" fullWidth>
                    Thuê ngay
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Manufacturers Section */}
      <Container sx={{ mt: 8, mb: 4 }}>
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            <Verified sx={{ mr: 1, verticalAlign: 'middle' }} />
            Thương hiệu uy tín
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Hợp tác với các thương hiệu hàng đầu
          </Typography>
        </Box>
        <Grid container spacing={3}>
          {manufacturers.map((brand) => (
            <Grid item xs={6} md={3} key={brand.id}>
              <Paper
                sx={{
                  p: 3,
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  '&:hover': { 
                    transform: 'scale(1.05)',
                    boxShadow: 2
                  }
                }}
              >
                <Typography variant="h1" sx={{ mb: 2 }}>
                  {brand.logo}
                </Typography>
                <Typography variant="h6" fontWeight="bold">
                  {brand.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {brand.products} sản phẩm
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Reviews Section */}
      <Container sx={{ mt: 8, mb: 8 }}>
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            <RateReview sx={{ mr: 1, verticalAlign: 'middle' }} />
            Đánh giá từ khách hàng
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Ý kiến thực tế từ những người đã trải nghiệm
          </Typography>
        </Box>
        <Grid container spacing={3}>
          {recentReviews.map((review) => (
            <Grid item xs={12} md={6} key={review.id}>
              <Paper sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6">{review.userName}</Typography>
                  <Rating value={review.rating} readOnly size="small" />
                </Box>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Sản phẩm: {review.product}
                </Typography>
                <Typography variant="body1">
                  "{review.comment}"
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: 6,
          textAlign: 'center'
        }}
      >
        <Container>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Sẵn sàng cho chuyến phiêu lưu tiếp theo?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            Đăng ký ngay để nhận ưu đãi 20% cho lần thuê đầu tiên
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Button 
              variant="contained" 
              size="large"
              sx={{ 
                bgcolor: 'white', 
                color: '#667eea',
                '&:hover': { bgcolor: '#f0f0f0' }
              }}
              startIcon={<LocalOffer />}
            >
              Đăng ký ngay
            </Button>
            <Button 
              variant="outlined" 
              size="large"
              sx={{ 
                borderColor: 'white', 
                color: 'white',
                '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' }
              }}
            >
              Tìm hiểu thêm
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default UserHome;