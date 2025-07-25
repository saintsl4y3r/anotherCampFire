import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Typography, Box, Paper } from '@mui/material';

const StartPage = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
      }}
    >
      <Paper
        elevation={8}
        sx={{
          padding: 6,
          borderRadius: 4,
          textAlign: 'center',
          maxWidth: 600,
          width: '100%',
          backgroundColor: 'rgba(255,255,255,0.95)',
        }}
      >
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
          ⛺ CampFire
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom sx={{ color: '#555' }}>
          Nền tảng cho thuê thiết bị cắm trại – bền bỉ, tiện lợi, đáng tin cậy!
        </Typography>
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
          <Button
            component={Link}
            to="/login"
            variant="contained"
            size="large"
            sx={{
              paddingX: 4,
              fontWeight: 'bold',
              backgroundColor: '#4CAF50',
              '&:hover': { backgroundColor: '#388E3C' },
            }}
          >
            Đăng nhập
          </Button>
          <Button
            component={Link}
            to="/register"
            variant="outlined"
            size="large"
            sx={{
              paddingX: 4,
              fontWeight: 'bold',
              borderColor: '#4CAF50',
              color: '#4CAF50',
              '&:hover': {
                borderColor: '#388E3C',
                color: '#388E3C',
              },
            }}
          >
            Đăng ký
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default StartPage;
