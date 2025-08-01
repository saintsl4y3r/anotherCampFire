// src/components/Category.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import {
  CATEGORY_QUERY as CATEGORY_BY_ID,
  CREATE_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
} from "../graphql/categories.js";

function Category() {
  const { id } = useParams();
  const categoryID = parseInt(id, 10);
  const navigate = useNavigate();

  // 1) Load this category
  const { data, loading, error, refetch } = useQuery(CATEGORY_BY_ID, {
    variables: { categoryID },
    fetchPolicy: "network-only",
  });

  // 2) Set up mutations
  const [createCategory] = useMutation(CREATE_CATEGORY, {
    onCompleted: () => {
      setNewName("");
      alert("Category created.");
    },
    onError: (err) => alert(err.message),
  });
  const [updateCategory] = useMutation(UPDATE_CATEGORY, {
    onCompleted: () => {
      alert("Category updated.");
      refetch();
    },
    onError: (err) => alert(err.message),
  });
  const [deleteCategory] = useMutation(DELETE_CATEGORY, {
    onCompleted: () => {
      alert("Category deleted.");
      navigate("/categories");
    },
    onError: (err) => alert(err.message),
  });

  // 3) Local state for forms
  const [newName, setNewName] = useState("");
  const [editName, setEditName] = useState("");

  // when data loads, initialize editName
  useEffect(() => {
    if (data?.category) {
      setEditName(data.category.categoryName);
    }
  }, [data]);

  // 4) Handlers
  const handleCreate = () => {
    if (!newName.trim()) return;
    createCategory({ variables: { input: { categoryName: newName } } });
  };

  const handleUpdate = () => {
    if (!editName.trim()) return;
    updateCategory({
      variables: { categoryID, input: { categoryName: editName } },
    });
  };

  const handleDelete = () => {
    if (window.confirm("Xác nhận xóa category này?")) {
      deleteCategory({ variables: { categoryID } });
    }
  };

  // 5) Render
  if (loading) return "Loading...";
  if (error) return <pre>{error.message}</pre>;

  const cat = data.category;

  return (
    <div>
      <h2>
        Category #{cat.categoryID}: {cat.categoryName}
      </h2>

      {/* UPDATE form */}
      <div style={{ marginBottom: "1rem" }}>
        <h3>Cập nhật category</h3>
        <input
          type="text"
          value={editName}
          onChange={(e) => setEditName(e.target.value)}
        />
        <button onClick={handleUpdate}>Lưu thay đổi</button>
        <button onClick={handleDelete} style={{ marginLeft: "0.5rem" }}>
          Xóa category
        </button>
      </div>

      {/* CREATE new */}
      <div style={{ marginTop: "2rem" }}>
        <h3>Tạo mới category</h3>
        <input
          type="text"
          placeholder="Tên category mới"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <button onClick={handleCreate}>Tạo</button>
      </div>
    </div>
  );
}

export default Category;
