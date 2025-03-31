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
      <Link
        to="/users"
        search={{ page: 2 }} // search object pass page 2
        activeProps={{ className: "font-bold" }}
      >
        Users
      </Link>
    </div>
  );
};

export default Navbar;
