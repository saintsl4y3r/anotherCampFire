// src/components/Category.jsx
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { CATEGORY_QUERY as CATEGORY_BY_ID } from "../graphql/categories.js";

function Category() {
  const { id } = useParams();
  const { data, loading, error } = useQuery(CATEGORY_BY_ID, {
    variables: { categoryID: parseInt(id, 10) },
  });

  if (loading) return "Loading...";
  if (error)   return <pre>{error.message}</pre>;

  const cat = data.category;
  return (
    <div>
      <h2>
        {cat.categoryName} (ID: {cat.categoryID})
      </h2>
      <h3>Products in this category:</h3>
      {cat.products.length > 0 ? (
        <ul>
          {cat.products.map((p) => (
            <li key={p.productID}>
              <Link to={`/product/${p.productID}`}>
                {p.productName} — ${p.price.toFixed(2)}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
}

export default Category;
