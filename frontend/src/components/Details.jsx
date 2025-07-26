import { useQuery } from "@apollo/client";
import { DETAILS_QUERY } from "../graphql/details.js";
import { Link } from "react-router-dom";

function Details() {
  const { data, loading, error } = useQuery(DETAILS_QUERY);

  if (loading) return "Loading...";
  if (error)   return <pre>{error.message}</pre>;

  return (
    <ul>
      {data.details.map((d) => (
        <li key={d.detailID}>
          <Link to={`/detail/${d.detailID}`}>
            #{d.detailID}: {d.quantity}× {d.product.productName} @ ${d.price.toFixed(2)}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default Details;
