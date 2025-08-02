import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Divider,
  AppBar,
  Toolbar,
  Badge,
  Menu,
  MenuItem,
  Avatar
} from '@mui/material';
import {
  Category,
  ShoppingCart,
  LocalShipping,
  RateReview,
  ArrowForward,
  TrendingUp,
  Verified,
  LocalOffer,
  FavoriteOutlined,
  Person,
  LibraryBooks,
  Payment,
  CheckCircle
} from '@mui/icons-material';

const UserHome = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [cartItemsCount] = useState(3);
  const [wishlistCount] = useState(5);

  // Product data
  const [products] = useState([
  {
    id: 1,
    name: "Lều Coleman Instant Cabin 8",
    category: "Lều",
    manufacturer: "Coleman",
    price: 4500000,
    stock: 15,
    description: "Lều gia đình 8 người, dựng trong 60 giây với công nghệ Pre-Attached Poles",
    specifications: {
      capacity: "8 người",
      dimensions: "4.3m x 2.4m x 1.8m",
      weight: "18.5kg",
      material: "Polyester 75D, chống thấm nước"
    },
    images: ["tent1.jpg", "tent1_2.jpg"],
    status: "active",
    createdDate: "2024-01-15",
    rating: 4.5,
    reviews: 32,
    availability: "Có sẵn",
    image: "tent1.jpg",
    hot: true,
    originalPrice: 7000000
  },
  {
    id: 2,
    name: "Túi ngủ Marmot Trestles Elite Eco 20",
    category: "Túi ngủ",
    manufacturer: "Marmot",
    price: 2800000,
    stock: 8,
    description: "Túi ngủ mùa đông với lớp lót SpiraFil Eco làm từ chai nhựa tái chế",
    specifications: {
      temperature: "-6°C đến 4°C",
      dimensions: "203cm x 81cm",
      weight: "1.36kg",
      material: "Nylon Pertex Quantum, SpiraFil Eco"
    },
    images: ["sleeping_bag1.jpg"],
    status: "active",
    createdDate: "2024-02-10",
    rating: 4.7,
    reviews: 18,
    availability: "Còn ít",
    image: "sleeping_bag1.jpg",
    hot: false,
    originalPrice: 4200000
  },
  {
    id: 3,
    name: "Bếp gas MSR PocketRocket 2",
    category: "Bếp dã ngoại",
    manufacturer: "MSR",
    price: 1200000,
    stock: 25,
    description: "Bếp gas siêu nhẹ, nhỏ gọn với khả năng đun sôi nước cực nhanh",
    specifications: {
      power: "8200 BTU/h",
      weight: "73g",
      dimensions: "10.4cm x 5.3cm x 8.5cm",
      fuel: "Gas canister tiêu chuẩn"
    },
    images: ["stove1.jpg", "stove1_2.jpg"],
    status: "active",
    createdDate: "2024-01-20",
    rating: 4.8,
    reviews: 45,
    availability: "Có sẵn",
    image: "stove1.jpg",
    hot: true,
    originalPrice: 2000000
  },
  {
    id: 4,
    name: "Ba lô Osprey Atmos AG 65",
    category: "Ba lô",
    manufacturer: "Osprey",
    price: 6500000,
    stock: 12,
    description: "Ba lô trekking cao cấp với hệ thống lưng thông khí Anti-Gravity",
    specifications: {
      capacity: "65 lít",
      weight: "2.1kg",
      dimensions: "81cm x 36cm x 33cm",
      material: "Nylon 210D, 420HD Nylon Packcloth"
    },
    images: ["backpack1.jpg"],
    status: "active",
    createdDate: "2024-01-05",
    rating: 4.9,
    reviews: 67,
    availability: "Có sẵn",
    image: "backpack1.jpg",
    hot: true,
    originalPrice: 8500000
  },
  {
    id: 5,
    name: "Đèn pin Fenix PD36R",
    category: "Đèn pin",
    manufacturer: "Fenix",
    price: 2100000,
    stock: 30,
    description: "Đèn pin LED sạc USB-C với độ sáng lên đến 1600 lumens",
    specifications: {
      brightness: "1600 lumens",
      battery: "Li-ion 5000mAh",
      runtime: "200 giờ (chế độ tiết kiệm)",
      waterproof: "IP68"
    },
    images: ["flashlight1.jpg"],
    status: "active",
    createdDate: "2024-02-01",
    rating: 4.6,
    reviews: 28,
    availability: "Có sẵn",
    image: "flashlight1.jpg",
    hot: false,
    originalPrice: 3000000
  },
  {
    id: 6,
    name: "Bàn ghế dã ngoại ALPS Mountaineering",
    category: "Nội thất",
    manufacturer: "ALPS Mountaineering",
    price: 3200000,
    stock: 6,
    description: "Bộ bàn ghế gấp gọn cho 4 người, chất liệu nhôm siêu nhẹ",
    specifications: {
      capacity: "4 người",
      weight: "4.8kg",
      material: "Khung nhôm, mặt bàn melamine",
      dimensions: "120cm x 70cm x 70cm"
    },
    images: ["table_set1.jpg"],
    status: "active",
    createdDate: "2024-01-25",
    rating: 4.3,
    reviews: 15,
    availability: "Còn ít",
    image: "table_set1.jpg",
    hot: false,
    originalPrice: 4500000
  },
  {
    id: 7,
    name: "Giày trekking Salomon X Ultra 3 GTX",
    category: "Giày dép",
    manufacturer: "Salomon",
    price: 3800000,
    stock: 20,
    description: "Giày trekking với công nghệ Gore-Tex chống nước và đế Contagrip",
    specifications: {
      sizes: "39-46",
      weight: "375g (size 42)",
      material: "Synthetic, Gore-Tex",
      sole: "Contagrip MA"
    },
    images: ["shoes1.jpg"],
    status: "active",
    createdDate: "2024-02-05",
    rating: 4.7,
    reviews: 52,
    availability: "Có sẵn",
    image: "shoes1.jpg",
    hot: true,
    originalPrice: 4800000
  },
  {
    id: 8,
    name: "Áo khoác Patagonia Houdini",
    category: "Quần áo",
    manufacturer: "Patagonia",
    price: 2500000,
    stock: 18,
    description: "Áo khoác siêu nhẹ chống gió và nước, có thể gấp gọn trong túi riêng",
    specifications: {
      weight: "102g",
      material: "15-denier Ripstop Nylon",
      sizes: "XS-XXL",
      packable: "Có thể gấp vào túi áo"
    },
    images: ["jacket1.jpg"],
    status: "active",
    createdDate: "2024-01-30",
    rating: 4.4,
    reviews: 38,
    availability: "Có sẵn",
    image: "jacket1.jpg",
    hot: false,
    originalPrice: 3500000
  },
  {
    id: 9,
    name: "Máy lọc nước LifeStraw Personal",
    category: "Dụng cụ",
    manufacturer: "LifeStraw",
    price: 650000,
    stock: 40,
    description: "Ống hút lọc nước cá nhân, loại bỏ 99.9999% vi khuẩn và ký sinh trúng",
    specifications: {
      capacity: "4000 lít",
      weight: "57g",
      length: "22.5cm",
      filtration: "0.2 micron"
    },
    images: ["water_filter1.jpg"],
    status: "active",
    createdDate: "2024-02-12",
    rating: 4.5,
    reviews: 23,
    availability: "Có sẵn",
    image: "water_filter1.jpg",
    hot: false,
    originalPrice: 1000000
  },
  {
    id: 10,
    name: "Hammock ENO DoubleNest",
    category: "Võng",
    manufacturer: "ENO",
    price: 1800000,
    stock: 14,
    description: "Võng du lịch cho 2 người, chất liệu nylon parachute siêu bền",
    specifications: {
      capacity: "180kg",
      weight: "532g",
      dimensions: "2.9m x 1.9m",
      material: "70D High Tenacity Nylon Taffeta"
    },
    images: ["hammock1.jpg"],
    status: "active",
    createdDate: "2024-01-18",
    rating: 4.6,
    reviews: 31,
    availability: "Còn ít",
    image: "hammock1.jpg",
    hot: false,
    originalPrice: 2700000
  }
]);


  // Navigation handlers
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNavigateToCart = () => {
    navigate('/cart');
  };

  const handleNavigateToWishlist = () => {
    navigate('/wishlist');
  };

  const handleNavigateToProfile = () => {
    navigate('/profile');
    handleProfileMenuClose();
  };

  const handleNavigateToLibrary = () => {
    navigate('/library');
  };

  const handleNavigateToUsers = () => {
    navigate('/users');
  };

  const handleNavigateToPayment = () => {
    navigate('/payment');
  };

  const handleNavigateToOrderSuccess = () => {
    navigate('/order-success');
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleCategoryClick = (categorySlug) => {
    navigate(`/category/${categorySlug}`);
  };

  const handleRentProduct = (productId) => {
    navigate(`/product/${productId}`);
  };

  // Featured products
  const featuredProducts = products
    .filter(p => p.hot || p.rating >= 4.5)
    .slice(0, 8);

  // Categories
  const [categories] = useState([
    // ... (categories data remains unchanged)
  ]);

  // Manufacturers
  const manufacturers = [...new Set(products.map(p => p.manufacturer))].map((brand, index) => ({
    id: index + 1,
    name: brand,
    logo: ['🏔️', '🌲', '🌙', '⛺', '🔥', '🎯', '⭐', '🚀'][index] || '🏕️',
    products: products.filter(p => p.manufacturer === brand).length
  }));

  // Recent reviews
  const [recentReviews] = useState([
    // ... (recent reviews data remains unchanged)
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
      {/* Navigation Bar */}
      <AppBar position="sticky" sx={{ bgcolor: '#667eea' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            🏕️ CampFire
          </Typography>
          
          <IconButton 
            color="inherit" 
            onClick={handleNavigateToLibrary}
            sx={{ mr: 1 }}
          >
            <LibraryBooks />
          </IconButton>
          
          <IconButton 
            color="inherit" 
            onClick={handleNavigateToUsers}
            sx={{ mr: 1 }}
          >
            <Person />
          </IconButton>
          
          <IconButton 
            color="inherit" 
            onClick={handleNavigateToWishlist}
            sx={{ mr: 1 }}
          >
            <Badge badgeContent={wishlistCount} color="error">
              <FavoriteOutlined />
            </Badge>
          </IconButton>
          
          <IconButton 
            color="inherit" 
            onClick={handleNavigateToCart}
            sx={{ mr: 1 }}
          >
            <Badge badgeContent={cartItemsCount} color="error">
              <ShoppingCart />
            </Badge>
          </IconButton>
          
          <IconButton 
            color="inherit" 
            onClick={handleNavigateToPayment}
            sx={{ mr: 1 }}
          >
            <Payment />
          </IconButton>
          
          <IconButton 
            color="inherit" 
            onClick={handleNavigateToOrderSuccess}
            sx={{ mr: 1 }}
          >
            <CheckCircle />
          </IconButton>
          
          <IconButton
            color="inherit"
            onClick={handleProfileMenuOpen}
          >
            <Avatar sx={{ width: 32, height: 32, bgcolor: 'rgba(255,255,255,0.2)' }}>
              U
            </Avatar>
          </IconButton>
          
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleProfileMenuClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem onClick={handleNavigateToProfile}>
              <Person sx={{ mr: 2 }} />
              Hồ sơ cá nhân
            </MenuItem>
            <MenuItem onClick={handleNavigateToLibrary}>
              <LibraryBooks sx={{ mr: 2 }} />
              Thư viện
            </MenuItem>
            <MenuItem onClick={handleNavigateToCart}>
              <ShoppingCart sx={{ mr: 2 }} />
              Giỏ hàng ({cartItemsCount})
            </MenuItem>
            <MenuItem onClick={handleNavigateToWishlist}>
              <FavoriteOutlined sx={{ mr: 2 }} />
              Danh sách yêu thích ({wishlistCount})
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

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
                  onClick={() => navigate('/library')}
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
                onClick={() => handleCategoryClick(category.slug)}
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
          <Button endIcon={<ArrowForward />} onClick={() => navigate('/library')}>
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
                  cursor: 'pointer',
                  '&:hover': { boxShadow: 3 }
                }}
                onClick={() => handleProductClick(product.id)}
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
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRentProduct(product.id);
                    }}
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
              <Card 
                sx={{ 
                  textAlign: 'center', 
                  py: 3,
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  '&:hover': { 
                    transform: 'translateY(-5px)',
                    boxShadow: 3
                  }
                }}
                onClick={() => navigate(`/brand/${brand.name.toLowerCase().replace(/\s/g, '-')}`)}
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
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Recent Reviews Section */}
      <Container sx={{ mt: 8, mb: 8 }}>
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            <RateReview sx={{ mr: 1, verticalAlign: 'middle' }} />
            Đánh giá gần đây
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Ý kiến từ những khách hàng đã trải nghiệm
          </Typography>
        </Box>
        <Grid container spacing={3}>
          {recentReviews.map((review) => (
            <Grid item xs={12} md={6} key={review.id}>
              <Card sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ mr: 2 }}>{review.userName.charAt(0)}</Avatar>
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {review.userName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {review.date}
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {review.product}
                </Typography>
                <Rating value={review.rating} readOnly size="small" />
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {review.comment}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default UserHome;