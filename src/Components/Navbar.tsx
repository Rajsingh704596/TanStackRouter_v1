import { Link } from "@tanstack/react-router";

const Navbar = () => {
  return (
    <div>
      <Link to="/" activeProps={{ className: "font-bold" }}>
        Home
      </Link>
      <Link to="/about" activeProps={{ className: "font-bold" }}>
        About
      </Link>
      <Link to="/users" activeProps={{ className: "font-bold" }}>
        Users
      </Link>
    </div>
  );
};

export default Navbar;
