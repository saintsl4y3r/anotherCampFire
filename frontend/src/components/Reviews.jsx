import { useQuery } from "@apollo/client";
import { REVIEWS_QUERY } from "../graphql/reviews.js";

function Reviews() {
  const { data, loading, error } = useQuery(REVIEWS_QUERY);

  if (loading) return "Loading...";
  if (error)   return <pre>{error.message}</pre>;

  return (
    <ul>
      {data.reviews.map((r) => (
        <li key={r.reviewID}>
          Review #{r.reviewID}: {r.rating}★ — "{r.comment}" by {r.customer.userName} on {new Date(r.createdAt).toLocaleDateString()}
        </li>
      ))}
    </ul>
  );
}

export default Reviews;
