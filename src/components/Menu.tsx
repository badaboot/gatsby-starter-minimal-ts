import * as React from "react";
import { Link } from "gatsby";

export const Menu = () => {
  return (
    <p className="menu">
      <Link to="/">Home</Link>
      <Link to="/all">All</Link>
    </p>
  );
};
