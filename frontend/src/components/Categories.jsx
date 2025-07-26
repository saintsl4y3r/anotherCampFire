import { useQuery } from "@apollo/client";
import { CATEGORIES_QUERY } from "../graphql/categories.js";

function Categories() {
  const { data, loading, error } = useQuery(CATEGORIES_QUERY);

  if (loading) return "Loading...";
  if (error) return <pre>{error.message}</pre>;

  return (
    <ul>
      {data.categories.map((category) => (
        <li key={category._id}>{category.name}</li>
      ))}
    </ul>
  );
}

export default Categories;