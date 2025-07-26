import { useQuery } from "@apollo/client";
import { ORDERS_QUERY } from "../graphql/orders.js";

function Orders() {
  const { data, loading, error } = useQuery(ORDERS_QUERY);

  if (loading) return "Loading...";
  if (error)   return <pre>{error.message}</pre>;

  return (
    <ul>
      {data.orders.map((o) => (
        <li key={o.orderID}>
          Order #{o.orderID} — {new Date(o.orderDate).toLocaleDateString()} — Total: ${o.totalAmount}
        </li>
      ))}
    </ul>
  );
}

export default Orders;
