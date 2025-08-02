import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
} from '@mui/material';
import { getAuth } from 'firebase/auth';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

const WishlistScreen = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      fetchWishlist();
    }
  }, [user]);

  const fetchWishlist = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'users', user.uid, 'wishlist'));
      const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setWishlistItems(items);
    } catch (error) {
      console.error('Lỗi khi lấy wishlist: ', error);
    }
  };

  const removeFromWishlist = async (itemId) => {
    try {
      await deleteDoc(doc(db, 'users', user.uid, 'wishlist', itemId));
      setWishlistItems((prev) => prev.filter((item) => item.id !== itemId));
    } catch (error) {
      console.error('Lỗi khi xoá khỏi wishlist: ', error);
    }
  };

  return (
    <Container sx={{ py: 5 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        💖 Danh sách yêu thích của bạn
      </Typography>

      {wishlistItems.length === 0 ? (
        <Typography variant="body1" color="text.secondary">
          Bạn chưa thêm sản phẩm nào vào danh sách yêu thích.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {wishlistItems.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={item.image_url}
                  alt={item.name}
                />
                <CardContent>
                  <Typography variant="h6">{item.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.category?.join(', ')}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    color="error"
                    onClick={() => removeFromWishlist(item.id)}
                  >
                    Xoá khỏi danh sách
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default WishlistScreen;
