import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Paper
} from '@mui/material';

const PaymentScreen = () => {
  const [method, setMethod] = useState('card');
  const [form, setForm] = useState({
    cardNumber: '',
    cardHolder: '',
    expiry: '',
    cvv: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePayment = () => {
    alert('Thanh toán thành công! 🎉');
    // Chuyển hướng tới trang thành công hoặc Library
  };

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          💳 Thanh toán đơn hàng
        </Typography>

        <FormLabel component="legend" sx={{ mt: 2 }}>
          Phương thức thanh toán
        </FormLabel>
        <RadioGroup
          row
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        >
          <FormControlLabel value="card" control={<Radio />} label="Thẻ tín dụng" />
          <FormControlLabel value="momo" control={<Radio />} label="Momo" />
          <FormControlLabel value="bank" control={<Radio />} label="Chuyển khoản" />
        </RadioGroup>

        {method === 'card' && (
          <Grid container spacing={2} mt={1}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Số thẻ"
                name="cardNumber"
                value={form.cardNumber}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Tên chủ thẻ"
                name="cardHolder"
                value={form.cardHolder}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Hết hạn (MM/YY)"
                name="expiry"
                value={form.expiry}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="CVV"
                name="cvv"
                value={form.cvv}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        )}

        <Button
          fullWidth
          variant="contained"
          color="primary"
          size="large"
          sx={{ mt: 4 }}
          onClick={handlePayment}
        >
          Xác nhận thanh toán
        </Button>
      </Paper>
    </Container>
  );
};

export default PaymentScreen;
