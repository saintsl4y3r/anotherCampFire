import React from 'react';
import { Box, Typography, Button, Container, Paper } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useNavigate } from 'react-router-dom';

const OrderSuccessScreen = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper elevation={4} sx={{ p: 5, textAlign: 'center' }}>
        <CheckCircleOutlineIcon color="success" sx={{ fontSize: 70, mb: 2 }} />
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Thanh toán thành công!
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={3}>
          Cảm ơn bạn đã đặt mua dụng cụ cắm trại tại CampFire. Đơn hàng của bạn đang được xử lý.
        </Typography>

        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/library')}
          sx={{ mr: 2 }}
        >
          📚 Xem thư viện
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => navigate('/user')}
        >
          🔙 Quay về trang chính
        </Button>
      </Paper>
    </Container>
  );
};

export default OrderSuccessScreen;
