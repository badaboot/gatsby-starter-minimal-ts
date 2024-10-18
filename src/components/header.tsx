import * as React from "react";

interface HeaderProps {
  siteTitle: string;
}

const Header: React.FC<HeaderProps> = ({ siteTitle = "" }) => (
  <header>
    <h1 style={{ marginBottom: "1.45rem" }}>{siteTitle}</h1>
  </header>
);

export default Header;
