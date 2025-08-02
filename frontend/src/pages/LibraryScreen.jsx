import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Grid, Card, CardMedia, CardContent,
  Button, Container
} from '@mui/material';
import { getAuth } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const LibraryScreen = () => {
  const [libraryItems, setLibraryItems] = useState([]);
  const user = getAuth().currentUser;

  useEffect(() => {
    const fetchLibrary = async () => {
      if (!user) return;
      const q = query(
        collection(db, 'purchased_items'),
        where('userId', '==', user.uid)
      );
      const snapshot = await getDocs(q);
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setLibraryItems(items);
    };

    fetchLibrary();
  }, [user]);

  return (
    <Container sx={{ py: 5 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        🎒 Thư viện dụng cụ của bạn
      </Typography>
      <Grid container spacing={3}>
        {libraryItems.length === 0 ? (
          <Typography variant="body1">Bạn chưa có sản phẩm nào.</Typography>
        ) : (
          libraryItems.map(item => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card sx={{ height: '100%' }}>
                <CardMedia
                  component="img"
                  height="180"
                  image={item.image_url}
                  alt={item.name}
                />
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">
                    {item.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.category?.join(', ') || 'Không rõ danh mục'}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Giá: {item.price}₫
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Ngày mua: {item.purchase_date}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
};

export default LibraryScreen;
