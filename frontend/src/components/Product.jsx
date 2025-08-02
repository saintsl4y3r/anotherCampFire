import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import {
  PRODUCT_QUERY,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
} from "../graphql/products.js";

import {
  Box, Typography, TextField, Button, Divider,
} from "@mui/material";
import { useState } from "react";

function Product() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, loading, error, refetch } = useQuery(PRODUCT_QUERY, {
    variables: { productID: parseInt(id, 10) },
  });

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(null);

  const [updateProduct] = useMutation(UPDATE_PRODUCT, {
    onCompleted: () => {
      refetch();
      setEditMode(false);
    },
  });

  const [deleteProduct] = useMutation(DELETE_PRODUCT, {
    onCompleted: () => {
      navigate("/admin/products"); // Redirect to product list
    },
  });

  if (loading) return "Loading...";
  if (error) return <pre>{error.message}</pre>;
  if (!data?.product) return <p>Không tìm thấy sản phẩm.</p>;

  const p = data.product;

  const handleEdit = () => {
    setFormData({
      productName: p.productName,
      price: p.price,
      stock: p.stock,
      categoryID: p.category.categoryID,
      manuID: p.manufacturer.manuID,
      description: p.description || "",
    });
    setEditMode(true);
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
    updateProduct({ variables: { productID: p.productID, input } });
  };

  const handleDelete = () => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      deleteProduct({ variables: { productID: p.productID } });
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Chi tiết sản phẩm
      </Typography>

      {editMode ? (
        <Box display="flex" flexDirection="column" gap={2} maxWidth={500}>
          <TextField
            label="Tên sản phẩm"
            value={formData.productName}
            onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
          />
          <TextField
            label="Giá"
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          />
          <TextField
            label="Kho"
            type="number"
            value={formData.stock}
            onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
          />
          <TextField
            label="Category ID"
            value={formData.categoryID}
            onChange={(e) => setFormData({ ...formData, categoryID: e.target.value })}
          />
          <TextField
            label="Manufacturer ID"
            value={formData.manuID}
            onChange={(e) => setFormData({ ...formData, manuID: e.target.value })}
          />
          <TextField
            label="Mô tả"
            multiline
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
          <Box display="flex" gap={2}>
            <Button variant="contained" onClick={handleSave}>Lưu</Button>
            <Button variant="outlined" onClick={() => setEditMode(false)}>Hủy</Button>
          </Box>
        </Box>
      ) : (
        <Box>
          <Typography variant="h6">{p.productName} (ID: {p.productID})</Typography>
          <Typography>Giá: {p.price.toLocaleString()}₫</Typography>
          <Typography>Kho: {p.stock}</Typography>
          <Typography>Mô tả: {p.description || "Không có"}</Typography>
          <Typography>
            Danh mục: {p.category.categoryName} (ID: {p.category.categoryID})
          </Typography>
          <Typography>
            NXB: {p.manufacturer.manuName} (ID: {p.manufacturer.manuID})
          </Typography>

          <Divider sx={{ my: 2 }} />
          <Typography variant="h6">Chi tiết</Typography>
          {p.details.length === 0 ? (
            <Typography>Không có.</Typography>
          ) : (
            <ul>
              {p.details.map((d) => (
                <li key={d.detailID}>{d.content}</li>
              ))}
            </ul>
          )}

          <Typography variant="h6" mt={2}>Đánh giá</Typography>
          {p.reviews.length === 0 ? (
            <Typography>Chưa có đánh giá.</Typography>
          ) : (
            <ul>
              {p.reviews.map((r) => (
                <li key={r.reviewID}>
                  ⭐ {r.rating}/5 – {r.comment}
                </li>
              ))}
            </ul>
          )}

          <Divider sx={{ my: 2 }} />
          <Box display="flex" gap={2}>
            <Button variant="outlined" onClick={handleEdit}>Chỉnh sửa</Button>
            <Button color="error" variant="contained" onClick={handleDelete}>Xóa</Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default Product;
