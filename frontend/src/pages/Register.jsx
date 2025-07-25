import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  Alert
} from '@mui/material';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, email, password, confirmPassword } = formData;

    if (!username || !email || !password || !confirmPassword) {
      return setError('Vui lòng điền đầy đủ thông tin.');
    }

    if (password !== confirmPassword) {
      return setError('Mật khẩu không khớp.');
    }

    // TODO: call API hoặc lưu localStorage
    console.log('Đăng ký thành công:', formData);
    navigate('/login');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
      }}
    >
      <Paper elevation={8} sx={{ padding: 5, borderRadius: 4, maxWidth: 500, width: '100%' }}>
        <Typography variant="h4" gutterBottom align="center" fontWeight="bold">
          Đăng ký tài khoản
        </Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Tên người dùng"
            name="username"
            value={formData.username}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Mật khẩu"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Xác nhận mật khẩu"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            sx={{ mb: 3 }}
          />
          <Button type="submit" variant="contained" fullWidth size="large">
            Đăng ký
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Register;
