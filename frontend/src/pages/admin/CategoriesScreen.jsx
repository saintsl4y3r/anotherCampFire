import React, { useState, useEffect } from 'react';
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
import { Delete, Edit, Save, Close } from '@mui/icons-material';
import { useQuery, useMutation } from '@apollo/client';
import {
  CATEGORIES_QUERY,
  CREATE_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY
} from '../../graphql/categories.js';

const CategoriesScreen = () => {
  // 1) Query all categories
  const { data, loading, error, refetch } = useQuery(CATEGORIES_QUERY);

  // 2) State cho form thêm mới
  const [newName, setNewName] = useState('');

  // 3) State cho form chỉnh sửa
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState('');

  // 4) Mutations
  const [createCategory] = useMutation(CREATE_CATEGORY, {
    onCompleted: () => {
      setNewName('');
      refetch();
    },
  });
  const [updateCategory] = useMutation(UPDATE_CATEGORY, {
    onCompleted: () => {
      setEditingId(null);
      setEditingName('');
      refetch();
    },
  });
  const [deleteCategory] = useMutation(DELETE_CATEGORY, {
    onCompleted: () => refetch(),
  });

  // 5) Handlers
  const handleAdd = () => {
    const name = newName.trim();
    if (!name) return;
    createCategory({ variables: { input: { categoryName: name } } });
  };

  const startEdit = (cat) => {
    setEditingId(cat.categoryID);
    setEditingName(cat.categoryName);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingName('');
  };

  const handleUpdate = () => {
    const name = editingName.trim();
    if (!name) return;
    updateCategory({
      variables: {
        categoryID: editingId,
        input: { categoryName: name }
      }
    });
  };

  const handleDelete = (id) => {
    if (window.confirm('Xác nhận xóa danh mục này?')) {
      deleteCategory({ variables: { categoryID: id } });
    }
  };

  // 6) Render loading / error
  if (loading) return <Typography>Loading...</Typography>;
  if (error)   return <Typography color="error">{error.message}</Typography>;

  const categories = data.categories;

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Quản lý Danh mục
      </Typography>

      {/* Thêm mới */}
      <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6">Thêm danh mục mới</Typography>
        <Box display="flex" mt={2}>
          <TextField
            fullWidth
            label="Tên danh mục"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <Button
            onClick={handleAdd}
            variant="contained"
            sx={{ ml: 2 }}
          >
            Thêm
          </Button>
        </Box>
      </Paper>

      {/* Danh sách */}
      <Paper elevation={2} sx={{ p: 2 }}>
        <Typography variant="h6">Danh sách danh mục</Typography>
        <List>
          {categories.map((cat, idx) => (
            <React.Fragment key={cat.categoryID}>
              <ListItem
                secondaryAction={
                  editingId === cat.categoryID ? (
                    <>
                      <IconButton edge="end" onClick={handleUpdate}>
                        <Save />
                      </IconButton>
                      <IconButton edge="end" onClick={cancelEdit}>
                        <Close />
                      </IconButton>
                    </>
                  ) : (
                    <>
                      <IconButton edge="end" onClick={() => startEdit(cat)}>
                        <Edit />
                      </IconButton>
                      <IconButton edge="end" onClick={() => handleDelete(cat.categoryID)}>
                        <Delete />
                      </IconButton>
                    </>
                  )
                }
              >
                {editingId === cat.categoryID ? (
                  <TextField
                    fullWidth
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                  />
                ) : (
                  <ListItemText primary={cat.categoryName} />
                )}
              </ListItem>
              {idx !== categories.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default CategoriesScreen;
