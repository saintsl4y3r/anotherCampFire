import { useParams, Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { DETAIL_QUERY as DETAIL_BY_ID } from "../graphql/details.js";

function Detail() {
  const { id } = useParams();
  const { data, loading, error } = useQuery(DETAIL_BY_ID, {
    variables: { detailID: parseInt(id, 10) },
  });

  if (loading) return "Loading...";
  if (error)   return <pre>{error.message}</pre>;

  const d = data.detail;
  return (
    <div>
      <h2>Detail #{d.detailID}</h2>
      <p>
        Product:{" "}
        <Link to={`/product/${d.product.productID}`}>
          {d.product.productName}
        </Link>
      </p>
      <p>Quantity: {d.quantity}</p>
      <p>Price: ${d.price.toFixed(2)}</p>
      <p>
        Order:{" "}
        <Link to={`/order/${d.order.orderID}`}>
          #{d.order.orderID}
        </Link>
      </p>
    </div>
  );
}

export default Detail;
