// src/components/Review.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import {
  REVIEW_QUERY as REVIEW_BY_ID,
  CREATE_REVIEW,
  UPDATE_REVIEW,
  DELETE_REVIEW,
} from "../graphql/reviews.js";

function Review() {
  const { id } = useParams();
  const reviewID = parseInt(id, 10);
  const navigate = useNavigate();

  // 1) Fetch this review
  const {
    data,
    loading,
    error,
    refetch,
  } = useQuery(REVIEW_BY_ID, {
    variables: { reviewID },
    fetchPolicy: "network-only",
  });

  // 2) Mutations
  const [createReview] = useMutation(CREATE_REVIEW, {
    onCompleted: () => {
      setNewCustomerID("");
      setNewProductID("");
      setNewRating("");
      setNewComment("");
      alert("Review created.");
    },
    onError: (err) => alert(err.message),
  });
  const [updateReview] = useMutation(UPDATE_REVIEW, {
    onCompleted: () => {
      alert("Review updated.");
      refetch();
    },
    onError: (err) => alert(err.message),
  });
  const [deleteReview] = useMutation(DELETE_REVIEW, {
    onCompleted: () => {
      alert("Review deleted.");
      navigate("/reviews");
    },
    onError: (err) => alert(err.message),
  });

  // 3) Local state
  const [editCustomerID, setEditCustomerID] = useState("");
  const [editProductID, setEditProductID] = useState("");
  const [editRating, setEditRating] = useState("");
  const [editComment, setEditComment] = useState("");

  const [newCustomerID, setNewCustomerID] = useState("");
  const [newProductID, setNewProductID] = useState("");
  const [newRating, setNewRating] = useState("");
  const [newComment, setNewComment] = useState("");

  // initialize edit form when data loads
  useEffect(() => {
    if (data?.review) {
      setEditCustomerID(data.review.customer.userID);
      setEditProductID(data.review.product.productID);
      setEditRating(data.review.rating);
      setEditComment(data.review.comment || "");
    }
  }, [data]);

  // 4) Handlers
  const handleUpdate = () => {
    updateReview({
      variables: {
        reviewID,
        input: {
          customerID: parseInt(editCustomerID, 10),
          productID: parseInt(editProductID, 10),
          rating: parseInt(editRating, 10),
          comment: editComment,
        },
      },
    });
  };

  const handleDelete = () => {
    if (window.confirm("Xác nhận xóa review này?")) {
      deleteReview({ variables: { reviewID } });
    }
  };

  const handleCreate = () => {
    createReview({
      variables: {
        input: {
          customerID: parseInt(newCustomerID, 10),
          productID: parseInt(newProductID, 10),
          rating: parseInt(newRating, 10),
          comment: newComment,
        },
      },
    });
  };

  // 5) Render
  if (loading) return "Loading...";
  if (error) return <pre>{error.message}</pre>;

  const r = data.review;
  const date = new Date(r.createdAt).toLocaleString();

  return (
    <div>
      <h2>Review #{r.reviewID}</h2>
      <p>
        <strong>Customer:</strong>{" "}
        <Link to={`/user/${r.customer.userID}`}>
          {r.customer.userName}
        </Link>
      </p>
      <p>
        <strong>Product:</strong>{" "}
        <Link to={`/product/${r.product.productID}`}>
          {r.product.productName}
        </Link>
      </p>
      <p>
        <strong>Rating:</strong> {r.rating}★
      </p>
      <p>
        <strong>Comment:</strong> {r.comment || "—"}
      </p>
      <p>
        <strong>Created At:</strong> {date}
      </p>

      {/* UPDATE form */}
      <div style={{ margin: "1.5rem 0" }}>
        <h3>Cập nhật Review</h3>
        <label>
          Customer ID:{" "}
          <input
            type="number"
            value={editCustomerID}
            onChange={(e) => setEditCustomerID(e.target.value)}
          />
        </label>
        <br />
        <label>
          Product ID:{" "}
          <input
            type="number"
            value={editProductID}
            onChange={(e) => setEditProductID(e.target.value)}
          />
        </label>
        <br />
        <label>
          Rating:{" "}
          <input
            type="number"
            min="1"
            max="5"
            value={editRating}
            onChange={(e) => setEditRating(e.target.value)}
          />
        </label>
        <br />
        <label>
          Comment:{" "}
          <textarea
            value={editComment}
            onChange={(e) => setEditComment(e.target.value)}
          />
        </label>
        <br />
        <button onClick={handleUpdate}>Lưu thay đổi</button>
        <button onClick={handleDelete} style={{ marginLeft: "0.5rem" }}>
          Xóa Review
        </button>
      </div>

      {/* CREATE new form */}
      <div style={{ marginTop: "2rem" }}>
        <h3>Tạo mới Review</h3>
        <label>
          Customer ID:{" "}
          <input
            type="number"
            value={newCustomerID}
            onChange={(e) => setNewCustomerID(e.target.value)}
          />
        </label>
        <br />
        <label>
          Product ID:{" "}
          <input
            type="number"
            value={newProductID}
            onChange={(e) => setNewProductID(e.target.value)}
          />
        </label>
        <br />
        <label>
          Rating:{" "}
          <input
            type="number"
            min="1"
            max="5"
            value={newRating}
            onChange={(e) => setNewRating(e.target.value)}
          />
        </label>
        <br />
        <label>
          Comment:{" "}
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
        </label>
        <br />
        <button onClick={handleCreate}>Tạo Review</button>
      </div>
    </div>
  );
}

export default Review;
