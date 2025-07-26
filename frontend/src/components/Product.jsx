import { useParams, Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { MANUFACTURER_QUERY as MANUFACTURER_BY_ID } from "../graphql/manufacturers.js";

function Manufacturer() {
  const { id } = useParams();
  const { data, loading, error } = useQuery(MANUFACTURER_BY_ID, {
    variables: { manuID: parseInt(id, 10) },
  });

  if (loading) return "Loading...";
  if (error)   return <pre>{error.message}</pre>;

  const m = data.manufacturer;
  return (
    <div>
      <h2>{m.manuName} (ID: {m.manuID})</h2>
      <h3>Products</h3>
      <ul>
        {m.products.map((p) => (
          <li key={p.productID}>
            <Link to={`/product/${p.productID}`}>{p.productName}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Manufacturer;
