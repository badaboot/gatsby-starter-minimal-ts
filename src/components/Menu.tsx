import * as React from "react";
import { Link } from "gatsby";

export const Menu = () => {
  return (
    <p className="menu">
      <Link to="/" activeStyle={{ textDecoration: "none" }}>
        Home
      </Link>
      <Link to="/all" activeStyle={{ textDecoration: "none" }}>
        Comics
      </Link>
      <Link to="/blog" activeStyle={{ textDecoration: "none" }}>
        Blog
      </Link>
      <Link to="/about" activeStyle={{ textDecoration: "none" }}>
        About
      </Link>
    </p>
  );
};
