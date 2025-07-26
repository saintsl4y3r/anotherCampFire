import { Link } from "react-router-dom";

function NoPage() {
  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <h1>404 — Page Not Found</h1>
      <p>Sorry, we couldn’t find the page you’re looking for.</p>
      <Link to="/">Go back home</Link>
    </div>
  );
}

export default NoPage;