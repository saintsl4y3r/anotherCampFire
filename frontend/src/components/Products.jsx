import { useQuery } from "@apollo/client";
import { PRODUCTS_QUERY } from "../graphql/products.js";

function Products() {
  const { data, loading, error } = useQuery(PRODUCTS_QUERY);

  if (loading) return "Loading...";
  if (error)   return <pre>{error.message}</pre>;

  return (
    <ul>
      {data.products.map((product) => (
        <li key={product.productID}>
          {product.productName} — ${product.price}
        </li>
      ))}
    </ul>
  );
}

export default Products;
