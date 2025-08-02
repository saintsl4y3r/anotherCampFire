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
  // Sản phẩm thực tế từ admin (chuyển đổi giá thành giá thuê theo ngày)
  const [products] = useState([
    {
      id: 1,
      name: "Lều Coleman Instant Cabin 8",
      category: "Lều",
      manufacturer: "Coleman",
      price: 450000, // Giá thuê mỗi ngày (10% giá gốc)
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
      status: "active",
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
      status: "active",
      rating: 4.7,
      reviews: 18,
      availability: "Còn ít"
    },
    {
      id: 3,
      name: "Bếp gas MSR PocketRocket 2",
      category: "Bếp dã ngoại",
      manufacturer: "MSR",
      price: 120000,
      originalPrice: 1200000,
      stock: 25,
      description: "Bếp gas siêu nhẹ, nhỏ gọn với khả năng đun sôi nước cực nhanh",
      specifications: {
        power: "8200 BTU/h",
        weight: "73g",
        dimensions: "10.4cm x 5.3cm x 8.5cm",
        fuel: "Gas canister tiêu chuẩn"
      },
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      status: "active",
      rating: 4.8,
      reviews: 45,
      hot: true,
      availability: "Có sẵn"
    },
    {
      id: 4,
      name: "Ba lô Osprey Atmos AG 65",
      category: "Ba lô",
      manufacturer: "Osprey",
      price: 650000,
      originalPrice: 6500000,
      stock: 12,
      description: "Ba lô trekking cao cấp với hệ thống lưng thông khí Anti-Gravity",
      specifications: {
        capacity: "65 lít",
        weight: "2.1kg",
        dimensions: "81cm x 36cm x 33cm",
        material: "Nylon 210D, 420HD Nylon Packcloth"
      },
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop",
      status: "active",
      rating: 4.9,
      reviews: 67,
      availability: "Có sẵn"
    },
    {
      id: 5,
      name: "Đèn pin Fenix PD36R",
      category: "Đèn pin",
      manufacturer: "Fenix",
      price: 210000,
      originalPrice: 2100000,
      stock: 30,
      description: "Đèn pin LED sạc USB-C với độ sáng lên đến 1600 lumens",
      specifications: {
        brightness: "1600 lumens",
        battery: "Li-ion 5000mAh",
        runtime: "200 giờ (chế độ tiết kiệm)",
        waterproof: "IP68"
      },
      image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop",
      status: "active",
      rating: 4.6,
      reviews: 28,
      hot: true,
      availability: "Có sẵn"
    },
    {
      id: 6,
      name: "Bàn ghế dã ngoại ALPS Mountaineering",
      category: "Nội thất",
      manufacturer: "ALPS Mountaineering",
      price: 320000,
      originalPrice: 3200000,
      stock: 6,
      description: "Bộ bàn ghế gấp gọn cho 4 người, chất liệu nhôm siêu nhẹ",
      specifications: {
        capacity: "4 người",
        weight: "4.8kg",
        material: "Khung nhôm, mặt bàn melamine",
        dimensions: "120cm x 70cm x 70cm"
      },
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop",
      status: "active",
      rating: 4.3,
      reviews: 15,
      availability: "Còn ít"
    },
    {
      id: 7,
      name: "Giày trekking Salomon X Ultra 3 GTX",
      category: "Giày dép",
      manufacturer: "Salomon",
      price: 380000,
      originalPrice: 3800000,
      stock: 20,
      description: "Giày trekking với công nghệ Gore-Tex chống nước và đế Contagrip",
      specifications: {
        sizes: "39-46",
        weight: "375g (size 42)",
        material: "Synthetic, Gore-Tex",
        sole: "Contagrip MA"
      },
      image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=300&fit=crop",
      status: "active",
      rating: 4.7,
      reviews: 52,
      availability: "Có sẵn"
    },
    {
      id: 8,
      name: "Áo khoác Patagonia Houdini",
      category: "Quần áo",
      manufacturer: "Patagonia",
      price: 250000,
      originalPrice: 2500000,
      stock: 18,
      description: "Áo khoác siêu nhẹ chống gió và nước, có thể gấp gọn trong túi riêng",
      specifications: {
        weight: "102g",
        material: "15-denier Ripstop Nylon",
        sizes: "XS-XXL",
        packable: "Có thể gấp vào túi áo"
      },
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop",
      status: "active",
      rating: 4.4,
      reviews: 38,
      availability: "Có sẵn"
    }
  ]);

  // Lấy sản phẩm nổi bật (top rated hoặc hot)
  const featuredProducts = products
    .filter(p => p.hot || p.rating >= 4.5)
    .slice(0, 8);

  // Lấy categories từ sản phẩm thực tế
  const [categories] = useState([
    { 
      id: 1, 
      name: 'Lều cắm trại', 
      icon: '🏕️', 
      count: products.filter(p => p.category === 'Lều').length,
      slug: 'leu'
    },
    { 
      id: 2, 
      name: 'Túi ngủ', 
      icon: '🛏️', 
      count: products.filter(p => p.category === 'Túi ngủ').length,
      slug: 'tui-ngu'
    },
    { 
      id: 3, 
      name: 'Bếp dã ngoại', 
      icon: '🔥', 
      count: products.filter(p => p.category === 'Bếp dã ngoại').length,
      slug: 'bep-da-ngoai'
    },
    { 
      id: 4, 
      name: 'Ba lô & Túi xách', 
      icon: '🎒', 
      count: products.filter(p => p.category === 'Ba lô').length,
      slug: 'ba-lo'
    },
    { 
      id: 5, 
      name: 'Đèn & Chiếu sáng', 
      icon: '💡', 
      count: products.filter(p => p.category === 'Đèn pin').length,
      slug: 'den-pin'
    },
    { 
      id: 6, 
      name: 'Quần áo outdoor', 
      icon: '👕', 
      count: products.filter(p => p.category === 'Quần áo').length,
      slug: 'quan-ao'
    },
    { 
      id: 7, 
      name: 'Giày dép', 
      icon: '👟', 
      count: products.filter(p => p.category === 'Giày dép').length,
      slug: 'giay-dep'
    },
    { 
      id: 8, 
      name: 'Nội thất cắm trại', 
      icon: '🪑', 
      count: products.filter(p => p.category === 'Nội thất').length,
      slug: 'noi-that'
    },
  ]);

  // Manufacturers từ sản phẩm thực tế
  const manufacturers = [...new Set(products.map(p => p.manufacturer))].map((brand, index) => ({
    id: index + 1,
    name: brand,
    logo: ['🏔️', '🌲', '🌙', '⛺', '🔥', '🎯', '⭐', '🚀'][index] || '🏕️',
    products: products.filter(p => p.manufacturer === brand).length
  }));

  const [recentReviews] = useState([
    { 
      id: 1, 
      userName: 'Nguyễn Văn Minh', 
      product: 'Lều Coleman Instant Cabin 8',
      rating: 5,
      comment: 'Lều rất tốt, setup cực nhanh! Gia đình 6 người ở vừa vặn, chống thấm nước hiệu quả trong cơn mưa to.',
      date: '2 ngày trước'
    },
    { 
      id: 2, 
      userName: 'Trần Thị Lan', 
      product: 'Túi ngủ Marmot Trestles Elite',
      rating: 5,
      comment: 'Túi ngủ ấm áp và nhẹ, rất phù hợp cho chuyến trekking Sa Pa. Chất lượng tuyệt vời!',
      date: '5 ngày trước'
    },
    { 
      id: 3, 
      userName: 'Lê Hoàng Nam', 
      product: 'Bếp gas MSR PocketRocket 2',
      rating: 5,
      comment: 'Bếp nhỏ gọn mà lửa rất mạnh, đun sôi nước cực nhanh. Đáng đồng tiền bát gạo!',
      date: '1 tuần trước'
    },
    { 
      id: 4, 
      userName: 'Phạm Thu Hà', 
      product: 'Ba lô Osprey Atmos AG 65',
      rating: 4,
      comment: 'Ba lô thoáng khí tốt, đi suốt ngày không bị đau lưng. Thiết kế rất thông minh.',
      date: '1 tuần trước'
    },
  ]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const getAvailabilityColor = (availability) => {
    switch(availability) {
      case 'Có sẵn': return 'success';
      case 'Còn ít': return 'warning';
      case 'Hết hàng': return 'error';
      default: return 'default';
    }
  };

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
                Khám phá thiên nhiên cùng những thiết bị cắm trại từ các thương hiệu uy tín như Coleman, Marmot, MSR. 
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
            { label: 'Sản phẩm', value: `${products.length}+`, icon: <ShoppingCart /> },
            { label: 'Khách hàng', value: '2000+', icon: <Verified /> },
            { label: 'Đánh giá 5⭐', value: `${Math.round((products.filter(p => p.rating >= 4.5).length / products.length) * 100)}%`, icon: <RateReview /> },
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
              Thiết bị chất lượng cao được thuê nhiều nhất
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
                <Chip 
                  label={product.availability}
                  color={getAvailabilityColor(product.availability)}
                  size="small"
                  sx={{ 
                    position: 'absolute', 
                    top: 10, 
                    left: 10, 
                    zIndex: 1 
                  }}
                />
                <CardMedia
                  component="img"
                  height="200"
                  image={product.image}
                  alt={product.name}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom sx={{ fontSize: '1rem' }}>
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {product.manufacturer}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontSize: '0.85rem' }}>
                    {product.description.length > 60 
                      ? `${product.description.substring(0, 60)}...` 
                      : product.description
                    }
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Rating value={product.rating} readOnly size="small" />
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                      ({product.reviews})
                    </Typography>
                  </Box>
                  <Box sx={{ mb: 1 }}>
                    <Typography variant="h6" color="primary" fontWeight="bold">
                      {formatPrice(product.price)}/ngày
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                      Giá mua: {formatPrice(product.originalPrice)}
                    </Typography>
                  </Box>
                  {/* Hiển thị một số thông số kỹ thuật */}
                  <Box sx={{ mt: 1 }}>
                    {Object.entries(product.specifications).slice(0, 2).map(([key, value]) => (
                      <Typography key={key} variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
                        <strong>{key}:</strong> {value}
                      </Typography>
                    ))}
                  </Box>
                </CardContent>
                <Box sx={{ p: 2 }}>
                  <Button 
                    variant="contained" 
                    fullWidth
                    disabled={product.availability === 'Hết hàng'}
                  >
                    {product.availability === 'Hết hàng' ? 'Hết hàng' : 'Thuê ngay'}
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
            Hợp tác với các thương hiệu hàng đầu thế giới
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
              <Paper sx={{ p: 3, height: '100%' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6">{review.userName}</Typography>
                  <Rating value={review.rating} readOnly size="small" />
                </Box>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Sản phẩm: <strong>{review.product}</strong>
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  "{review.comment}"
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {review.date}
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