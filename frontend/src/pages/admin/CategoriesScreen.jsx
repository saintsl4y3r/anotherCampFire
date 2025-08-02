import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Divider
} from '@mui/material';
import { Delete } from '@mui/icons-material';

const CategoriesScreen = () => {
  const [categories, setCategories] = useState([
    'Lều',
    'Túi ngủ',
    'Bếp dã ngoại',
    'Ba lô',
    'Đèn pin',
  ]);
  const [newCategory, setNewCategory] = useState('');

  const handleAddCategory = () => {
    if (newCategory.trim() !== '') {
      setCategories([...categories, newCategory.trim()]);
      setNewCategory('');
    }
  };

  const handleDeleteCategory = (index) => {
    const updated = [...categories];
    updated.splice(index, 1);
    setCategories(updated);
  };

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Quản lý Danh mục
      </Typography>

      <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6">Thêm danh mục mới</Typography>
        <Box display="flex" mt={2}>
          <TextField
            fullWidth
            label="Tên danh mục"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <Button onClick={handleAddCategory} variant="contained" sx={{ ml: 2 }}>
            Thêm
          </Button>
        </Box>
      </Paper>

      <Paper elevation={2} sx={{ p: 2 }}>
        <Typography variant="h6">Danh sách danh mục</Typography>
        <List>
          {categories.map((cat, index) => (
            <React.Fragment key={index}>
              <ListItem
                secondaryAction={
                  <IconButton edge="end" onClick={() => handleDeleteCategory(index)}>
                    <Delete />
                  </IconButton>
                }
              >
                <ListItemText primary={cat} />
              </ListItem>
              {index !== categories.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default CategoriesScreen;
