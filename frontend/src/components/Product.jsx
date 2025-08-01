import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { PRODUCT_QUERY as PRODUCT_BY_ID } from "../graphql/products.js";

function Product() {
  const { id } = useParams();
  const { data, loading, error } = useQuery(PRODUCT_BY_ID, {
    variables: { productID: parseInt(id, 10) },
  });

  if (loading) return "Loading...";
  if (error)   return <pre>{error.message}</pre>;

  const p = data.product;
  return (
    <div>
      <h2>{p.productName} (ID: {p.productID})</h2>
      <p>Price: ${p.price.toFixed(2)}</p>
      <p>
        Category: {p.category.categoryName} (
        <a href={`/category/${p.category.categoryID}`}>
          {p.category.categoryID}
        </a>
        )
      </p>
      <p>
        Manufacturer: {p.manufacturer.manuName} (
        <a href={`/manufacturer/${p.manufacturer.manuID}`}>
          {p.manufacturer.manuID}
        </a>
        )
      </p>
    </div>
  );
}

export default Product;
