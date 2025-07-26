import { useQuery } from "@apollo/client";
import { REVIEWS_QUERY } from "../graphql/reviews.js";
import { Link } from "react-router-dom";

function Reviews() {
  const { data, loading, error } = useQuery(REVIEWS_QUERY);

  if (loading) return "Loading...";
  if (error)   return <pre>{error.message}</pre>;

  return (
    <ul>
      {data.reviews.map((r) => {
        const date = new Date(r.createdAt).toLocaleDateString();
        return (
          <li key={r.reviewID}>
            <Link to={`/review/${r.reviewID}`}>
              Review #{r.reviewID}: {r.rating}★ — "{r.comment}" by {r.customer.userName} on {date}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default Reviews;
