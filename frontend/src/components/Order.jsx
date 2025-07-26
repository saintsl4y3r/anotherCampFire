import { useParams, Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { ORDER_QUERY as ORDER_BY_ID } from "../graphql/orders.js";

function Order() {
  const { id } = useParams();
  const { data, loading, error } = useQuery(ORDER_BY_ID, {
    variables: { orderID: parseInt(id, 10) },
  });

  if (loading) return "Loading...";
  if (error)   return <pre>{error.message}</pre>;

  const o = data.order;
  const date = new Date(o.orderDate).toLocaleDateString();
  return (
    <div>
      <h2>Order #{o.orderID}</h2>
      <p>Date: {date}</p>
      <p>Total Amount: ${o.totalAmount.toFixed(2)}</p>
      <h3>Details</h3>
      <ul>
        {o.details.map((d) => (
          <li key={d.detailID}>
            <Link to={`/detail/${d.detailID}`}>
              {d.quantity}× {d.product.productName} @ ${d.price.toFixed(2)}
            </Link>
          </li>
        ))}
      </ul>
      <p>
        Customer:{" "}
        <Link to={`/user/${o.customer.userID}`}>
          {o.customer.userName}
        </Link>
      </p>
    </div>
  );
}

export default Order;
