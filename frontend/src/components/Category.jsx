// src/components/Category.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import {
  CATEGORY_BY_ID,
  CREATE_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
} from "../graphql/categories.js";

function Category() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, loading, error, refetch } = useQuery(CATEGORY_BY_ID, {
    variables: { id },
    fetchPolicy: "network-only",
  });

  const [createCategory] = useMutation(CREATE_CATEGORY, {
    onCompleted: () => {
      setNewName("");
      alert("Đã tạo danh mục mới.");
    },
    onError: (err) => alert(err.message),
  });
  const [updateCategory] = useMutation(UPDATE_CATEGORY, {
    onCompleted: () => {
      alert("Đã cập nhật danh mục.");
      refetch();
    },
    onError: (err) => alert(err.message),
  });
  const [deleteCategory] = useMutation(DELETE_CATEGORY, {
    onCompleted: () => {
      alert("Đã xóa danh mục.");
      navigate("/admin/categories");
    },
    onError: (err) => alert(err.message),
  });

  const [newName, setNewName] = useState("");
  const [editName, setEditName] = useState("");

  useEffect(() => {
    if (data?.category) {
      setEditName(data.category.categoryName);
    }
  }, [data]);

  const handleCreate = () => {
    const name = newName.trim();
    if (!name) return;
    createCategory({ variables: { input: { categoryName: name } } });
  };

  const handleUpdate = () => {
    const name = editName.trim();
    if (!name) return;
    updateCategory({ variables: { id, input: { categoryName: name } } });
  };

  const handleDelete = () => {
    if (window.confirm("Xác nhận xóa danh mục này?")) {
      deleteCategory({ variables: { id } });
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error)   return <pre>{error.message}</pre>;

  const cat = data.category;

  return (
    <div>
      <h2>
        Danh mục: {cat.categoryName} (ID: {cat._id})
      </h2>

      {/* UPDATE form */}
      <section style={{ marginBottom: 24 }}>
        <h3>Cập nhật danh mục</h3>
        <input
          type="text"
          value={editName}
          onChange={(e) => setEditName(e.target.value)}
        />
        <button onClick={handleUpdate}>Lưu thay đổi</button>
        <button onClick={handleDelete} style={{ marginLeft: 8 }}>
          Xóa danh mục
        </button>
      </section>

      {/* CREATE new */}
      <section>
        <h3>Tạo mới danh mục</h3>
        <input
          type="text"
          placeholder="Tên danh mục mới"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <button onClick={handleCreate}>Tạo</button>
      </section>
    </div>
  );
}

export default Category;
