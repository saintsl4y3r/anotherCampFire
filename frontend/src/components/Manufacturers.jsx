import { useQuery } from "@apollo/client";
import { MANUFACTURERS_QUERY } from "../graphql/manufacturers.js";
import { Link } from "react-router-dom";

function Manufacturers() {
  const { data, loading, error } = useQuery(MANUFACTURERS_QUERY);

  if (loading) return "Loading...";
  if (error)   return <pre>{error.message}</pre>;

  return (
    <ul>
      {data.manufacturers.map((m) => (
        <li key={m.manuID}>
          <Link to={`/manufacturer/${m.manuID}`}>{m.manuName}</Link>
        </li>
      ))}
    </ul>
  );
}

export default Manufacturers;
