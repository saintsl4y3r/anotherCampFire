import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Tooltip,
  Rating,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const ReviewsScreen = () => {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      user: 'Võ Huỳnh Thái Bảo',
      product: 'Lều cắm trại Naturehike',
      comment: 'Lều rất chắc chắn và dễ dựng!',
      rating: 5,
    },
    {
      id: 2,
      user: 'Cao Sỹ Siêu',
      product: 'Đèn pin siêu sáng',
      comment: 'Ánh sáng mạnh, dùng được lâu',
      rating: 4,
    },
    {
      id: 3,
      user: 'Phạm Phước Minh Hiếu',
      product: 'Bếp gas mini dã ngoại',
      comment: 'Nấu hơi lâu nhưng tiện lợi',
      rating: 3,
    },
  ]);

  const handleDelete = (id) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Quản lý Đánh Giá 📝
      </Typography>

      <Paper elevation={2}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Người dùng</strong></TableCell>
              <TableCell><strong>Sản phẩm</strong></TableCell>
              <TableCell><strong>Đánh giá</strong></TableCell>
              <TableCell><strong>Rating</strong></TableCell>
              <TableCell align="right"><strong>Hành động</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reviews.map((review) => (
              <TableRow key={review.id}>
                <TableCell>{review.user}</TableCell>
                <TableCell>{review.product}</TableCell>
                <TableCell>{review.comment}</TableCell>
                <TableCell>
                  <Rating value={review.rating} readOnly />
                </TableCell>
                <TableCell align="right">
                  <Tooltip title="Xóa đánh giá">
                    <IconButton onClick={() => handleDelete(review.id)} color="error">
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default ReviewsScreen;
