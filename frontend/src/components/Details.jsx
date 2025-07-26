import { useQuery } from "@apollo/client";
import { DETAILS_QUERY } from "../graphql/details.js";

function Details() {
  const { data, loading, error } = useQuery(DETAILS_QUERY);

  if (loading) return "Loading...";
  if (error)   return <pre>{error.message}</pre>;

  return (
    <ul>
      {data.details.map((d) => (
        <li key={d.detailID}>
          Detail #{d.detailID}: {d.quantity}× {d.product.productName} @ ${d.price} — in order #{d.order.orderID}
        </li>
      ))}
    </ul>
  );
}

export default Details;
