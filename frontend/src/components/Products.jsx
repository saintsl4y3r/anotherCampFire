import { useQuery } from "@apollo/client";
import { PRODUCTS_QUERY } from "../graphql/products.js";
import { Link } from "react-router-dom";

function Products() {
  const { data, loading, error } = useQuery(PRODUCTS_QUERY);

  if (loading) return "Loading...";
  if (error)   return <pre>{error.message}</pre>;

  return (
    <ul>
      {data.products.map((p) => (
        <li key={p.productID}>
          <Link to={`/product/${p.productID}`}>
            {p.productName} — ${p.price.toFixed(2)}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default Products;
