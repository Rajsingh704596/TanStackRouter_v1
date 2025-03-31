import { useNavigate } from "@tanstack/react-router";

const NotFound = () => {
  const navigate = useNavigate(); // Alternative of Link
  return (
    <div>
      <h1>Page Not found</h1>
      <button onClick={() => navigate({ to: "/" })}>Go to Home page</button>
    </div>
  );
};

export default NotFound;
