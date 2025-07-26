import { useQuery } from "@apollo/client";
import { MANUFACTURERS_QUERY } from "../graphql/manufacturers.js";

function Manufacturers() {
  const { data, loading, error } = useQuery(MANUFACTURERS_QUERY);

  if (loading) return "Loading...";
  if (error)   return <pre>{error.message}</pre>;

  return (
    <ul>
      {data.manufacturers.map((m) => (
        <li key={m.manuID}>
          {m.manuName}
        </li>
      ))}
    </ul>
  );
}

export default Manufacturers;
