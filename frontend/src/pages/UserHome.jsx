import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const UserHome = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #c2e9fb 0%, #a1c4fd 100%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        padding: 4,
      }}
    >
      <Typography variant="h3" gutterBottom color="#333" fontWeight="bold">
        👋 Xin chào User!
      </Typography>
      <Typography variant="h6" align="center" sx={{ maxWidth: 600, color: '#444' }}>
        Chào mừng bạn đến với CampFire – nền tảng thuê thiết bị cắm trại tiện lợi. Hãy khám phá các sản phẩm phù hợp với hành trình khám phá thiên nhiên của bạn!
      </Typography>
      <Button variant="contained" size="large" sx={{ mt: 4 }}>
        Khám phá sản phẩm
      </Button>
    </Box>
  );
};

export default UserHome;
