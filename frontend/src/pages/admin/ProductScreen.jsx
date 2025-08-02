// src/pages/admin/ProductsScreen.jsx
import React, { useState, useEffect } from 'react';
import {
  Box, Typography, TextField, Button, Paper,
  IconButton, Grid, Divider
} from '@mui/material';
import { Delete, Edit, Save, Close } from '@mui/icons-material';
import { useQuery, useMutation } from '@apollo/client';
import {
  PRODUCTS_QUERY,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
} from '../../graphql/products.js';

const ProductsScreen = () => {
  // 1) Query all products
  const { data, loading, error, refetch } = useQuery(PRODUCTS_QUERY);

  // 2) Local state
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    productName: '',
    price: '',
    stock: '',
    categoryID: '',
    manuID: '',
    description: '',
  });

  // 3) Mutations
  const [createProduct] = useMutation(CREATE_PRODUCT, {
    onCompleted: () => {
      clearForm();
      refetch();
    },
  });
  const [updateProduct] = useMutation(UPDATE_PRODUCT, {
    onCompleted: () => {
      clearForm();
      refetch();
    },
  });
  const [deleteProduct] = useMutation(DELETE_PRODUCT, {
    onCompleted: () => refetch(),
  });

  // 4) Handlers
  const openAddForm = () => {
    setEditingProduct(null);
    setFormData({
      productName: '',
      price: '',
      stock: '',
      categoryID: '',
      manuID: '',
      description: '',
    });
    setShowForm(true);
  };

  const openEditForm = (p) => {
    setEditingProduct(p.productID);
    setFormData({
      productName: p.productName,
      price: p.price,
      stock: p.stock,
      categoryID: p.category.categoryID,
      manuID: p.manufacturer.manuID,
      description: p.description || '',
    });
    setShowForm(true);
  };

  const clearForm = () => {
    setEditingProduct(null);
    setFormData({
      productName: '',
      price: '',
      stock: '',
      categoryID: '',
      manuID: '',
      description: '',
    });
    setShowForm(false);
  };

  const handleSave = () => {
    const input = {
      productName: formData.productName,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock, 10),
      categoryID: parseInt(formData.categoryID, 10),
      manuID: parseInt(formData.manuID, 10),
      description: formData.description,
    };
    if (editingProduct) {
      updateProduct({ variables: { productID: editingProduct, input } });
    } else {
      createProduct({ variables: { input } });
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Xác nhận xóa sản phẩm này?')) {
      deleteProduct({ variables: { productID: id } });
    }
  };

  // 5) Render loading / error
  if (loading) return <Typography>Loading...</Typography>;
  if (error)   return <Typography color="error">{error.message}</Typography>;

  const products = data.products;

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5">Quản lý Sản phẩm</Typography>
        <Button variant="contained" onClick={openAddForm}>
          Thêm sản phẩm
        </Button>
      </Box>

      <Grid container spacing={2}>
        {products.map((p) => (
          <Grid item xs={12} md={6} key={p.productID}>
            <Paper sx={{ p: 2 }}>
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography variant="h6">{p.productName}</Typography>
                {editingProduct === p.productID ? (
                  <>
                    <IconButton onClick={handleSave}><Save /></IconButton>
                    <IconButton onClick={clearForm}><Close /></IconButton>
                  </>
                ) : (
                  <>
                    <IconButton onClick={() => openEditForm(p)}><Edit /></IconButton>
                    <IconButton onClick={() => handleDelete(p.productID)}><Delete /></IconButton>
                  </>
                )}
              </Box>
              {editingProduct === p.productID ? (
                <Box component="form" noValidate>
                  <TextField
                    fullWidth margin="dense" label="Tên" value={formData.productName}
                    onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                  />
                  <TextField
                    fullWidth margin="dense" label="Giá" type="number" value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  />
                  <TextField
                    fullWidth margin="dense" label="Kho" type="number" value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  />
                  <TextField
                    fullWidth margin="dense" label="Category ID" value={formData.categoryID}
                    onChange={(e) => setFormData({ ...formData, categoryID: e.target.value })}
                  />
                  <TextField
                    fullWidth margin="dense" label="Manufacturer ID" value={formData.manuID}
                    onChange={(e) => setFormData({ ...formData, manuID: e.target.value })}
                  />
                  <TextField
                    fullWidth margin="dense" label="Mô tả" multiline rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </Box>
              ) : (
                <>
                  <Typography>Giá: {p.price.toLocaleString()}₫</Typography>
                  <Typography>Kho: {p.stock}</Typography>
                  <Typography>Danh mục: {p.category.categoryName}</Typography>
                  <Typography>NXB: {p.manufacturer.manuName}</Typography>
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="body2">{p.description}</Typography>
                </>
              )}
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Form Modal */}
      {showForm && (
        <Paper sx={{ position: 'fixed', top: '20%', left: '50%', transform: 'translateX(-50%)',
                     width: 400, p: 2, zIndex: 1300 }}>
          <Typography variant="h6" mb={1}>
            {editingProduct ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm'}
          </Typography>
          <TextField
            fullWidth margin="dense" label="Tên" value={formData.productName}
            onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
          />
          <TextField
            fullWidth margin="dense" label="Giá" type="number" value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          />
          <TextField
            fullWidth margin="dense" label="Kho" type="number" value={formData.stock}
            onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
          />
          <TextField
            fullWidth margin="dense" label="Category ID" value={formData.categoryID}
            onChange={(e) => setFormData({ ...formData, categoryID: e.target.value })}
          />
          <TextField
            fullWidth margin="dense" label="Manufacturer ID" value={formData.manuID}
            onChange={(e) => setFormData({ ...formData, manuID: e.target.value })}
          />
          <TextField
            fullWidth margin="dense" label="Mô tả" multiline rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
          <Box mt={2} display="flex" justifyContent="flex-end" gap={1}>
            <Button onClick={clearForm} color="inherit">Hủy</Button>
            <Button onClick={handleSave} variant="contained">Lưu</Button>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default ProductsScreen;
