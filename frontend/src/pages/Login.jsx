import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
  Link,
} from '@mui/material';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!email || !password) {
      setError('Vui lòng nhập đầy đủ thông tin');
      setOpen(true);
      return;
    }

    if (email === 'admin@campfire.com' && password === 'admin123') {
      navigate('/admin');
    } else if (email === 'user@campfire.com' && password === 'user123') {
      navigate('/user');
    } else {
      setError('Email hoặc mật khẩu không đúng');
      setOpen(true);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #9fbaa3, #7e9cd8)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 2,
      }}
    >
      <Card sx={{ width: 360, p: 3, boxShadow: 8, borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h4" align="center" gutterBottom>
            CampFire 🔐
          </Typography>
          <Typography align="center" sx={{ mb: 2 }}>
            Đăng nhập để bắt đầu chuyến phiêu lưu
          </Typography>

          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            type="password"
            label="Mật khẩu"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 2 }}
          />

          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleLogin}
            sx={{ mb: 2, textTransform: 'none' }}
          >
            Đăng nhập
          </Button>

          <Box textAlign="center">
            <Link component={RouterLink} to="/register" underline="hover" sx={{ mr: 2 }}>
              Đăng ký
            </Link>
            <Link component={RouterLink} to="/forgot-password" underline="hover">
              Quên mật khẩu?
            </Link>
          </Box>
        </CardContent>
      </Card>

      <Snackbar open={open} autoHideDuration={4000} onClose={() => setOpen(false)}>
        <Alert severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Login;
