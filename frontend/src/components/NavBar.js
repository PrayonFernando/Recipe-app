import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => (
  <nav>
    <Link to="/">Login</Link> |<Link to="/register">Register</Link> |
    <Link to="/home">Home</Link> |<Link to="/favorites">Favorites</Link>
  </nav>
);

export default NavBar;
