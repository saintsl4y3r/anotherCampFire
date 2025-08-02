import React, { useContext, useState } from 'react';
import {
  Container, Typography, Grid, Card, CardMedia, CardContent,
  CardActions, Button, IconButton, Chip, Snackbar, Alert, Stack
} from '@mui/material';
import { Delete, ShoppingCart, ArrowUpward, ArrowDownward } from '@mui/icons-material';
import { WishlistContext } from '../components/WishlistContext';

const WishlistScreen = () => {
  const { wishlist, removeFromWishlist, moveUp, moveDown } = useContext(WishlistContext);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const showSnackbar = (msg, severity = 'success') => setSnackbar({ open: true, message: msg, severity });
  const closeSnackbar = () => setSnackbar(prev => ({ ...prev, open: false }));

  const addToCart = (item) => {
    removeFromWishlist(item.id);
    showSnackbar(`Đã thêm "${item.name}" vào giỏ và xóa khỏi yêu thích`);
  };

  return (
    <>
      <Container sx={{ py: 5 }}>
        <Typography variant="h4" gutterBottom>💖 Danh sách yêu thích</Typography>
        {wishlist.length === 0 ? (
          <Typography>Danh sách rỗng</Typography>
        ) : (
          <Grid container spacing={3}>
            {wishlist.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={item.id}>
                <Card>
                  <CardMedia component="img" height="180" image={item.image_url} />
                  <CardContent>
                    <Typography variant="h6" gutterBottom>{item.name}</Typography>
                    <Typography color="primary">{item.price.toLocaleString()}đ</Typography>
                    <div>{item.category?.map((cat, i) => <Chip key={i} label={cat} size="small" sx={{ mr: 0.5 }} />)}</div>
                  </CardContent>
                  <CardActions sx={{ justifyContent: 'space-between', px: 2 }}>
                    <Stack direction="row" spacing={1}>
                      <IconButton size="small" onClick={() => moveUp(index)}><ArrowUpward /></IconButton>
                      <IconButton size="small" onClick={() => moveDown(index)}><ArrowDownward /></IconButton>
                    </Stack>
                    <Button size="small" startIcon={<ShoppingCart />} onClick={() => addToCart(item)}>Thêm giỏ</Button>
                    <IconButton color="error" onClick={() => removeFromWishlist(item.id)}><Delete /></IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={closeSnackbar}>
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </>
  );
};

export default WishlistScreen;
