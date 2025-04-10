import * as React from "react";

interface HeaderProps {
  siteTitle: string;
  textAlign?: "left" | "right" | "center";
}

const Header: React.FC<HeaderProps> = ({
  siteTitle = "",
  textAlign = "left",
}) => (
  <header>
    <h1>{siteTitle}</h1>
  </header>
);

export default Header;
