import { useQuery } from "@apollo/client";
import { ORDERS_QUERY } from "../graphql/orders.js";
import { Link } from "react-router-dom";

function Orders() {
  const { data, loading, error } = useQuery(ORDERS_QUERY);

  if (loading) return "Loading...";
  if (error)   return <pre>{error.message}</pre>;

  return (
    <ul>
      {data.orders.map((o) => {
        const date = new Date(o.orderDate).toLocaleDateString();
        return (
          <li key={o.orderID}>
            <Link to={`/order/${o.orderID}`}>
              Order #{o.orderID} — {date} — Total: ${o.totalAmount.toFixed(2)}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default Orders;
