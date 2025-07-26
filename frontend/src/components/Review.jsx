import { useParams, Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { REVIEW_QUERY as REVIEW_BY_ID } from "../graphql/reviews.js";

function Review() {
  const { id } = useParams();
  const { data, loading, error } = useQuery(REVIEW_BY_ID, {
    variables: { reviewID: parseInt(id, 10) },
  });

  if (loading) return "Loading...";
  if (error)   return <pre>{error.message}</pre>;

  const r = data.review;
  const date = new Date(r.createdAt).toLocaleDateString();
  return (
    <div>
      <h2>Review #{r.reviewID}</h2>
      <p>Rating: {r.rating}★</p>
      <p>Comment: "{r.comment}"</p>
      <p>Date: {date}</p>
      <p>
        Customer:{" "}
        <Link to={`/user/${r.customer.userID}`}>
          {r.customer.userName}
        </Link>
      </p>
      <p>
        Product:{" "}
        <Link to={`/product/${r.product.productID}`}>
          {r.product.productName}
        </Link>
      </p>
    </div>
  );
}

export default Review;
