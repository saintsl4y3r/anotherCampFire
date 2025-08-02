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
  IconButton,
  Box,
} from '@mui/material';
import { getAuth } from 'firebase/auth';
import { collection, getDocs, deleteDoc, doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../firebase';
import { ShoppingCart, Delete } from '@mui/icons-material';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

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

  const addToCart = async (item) => {
    try {
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        cart: arrayUnion(item),
      }, { merge: true });
      await removeFromWishlist(item.id); // Xóa khỏi wishlist sau khi thêm vào giỏ hàng
    } catch (error) {
      console.error('Lỗi khi thêm vào giỏ hàng: ', error);
    }
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(wishlistItems);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setWishlistItems(items);
    // Lưu thứ tự mới vào Firestore (cần cập nhật logic lưu trữ, ví dụ: thêm trường order)
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
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="wishlist">
            {(provided) => (
              <Grid
                container
                spacing={3}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {wishlistItems.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided) => (
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
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
                              color="primary"
                              startIcon={<ShoppingCart />}
                              onClick={() => addToCart(item)}
                            >
                              Thêm vào giỏ hàng
                            </Button>
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => removeFromWishlist(item.id)}
                            >
                              <Delete />
                            </IconButton>
                          </CardActions>
                        </Card>
                      </Grid>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </Grid>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </Container>
  );
};

export default WishlistScreen;