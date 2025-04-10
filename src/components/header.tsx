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
    <h1
      style={{
        textAlign: textAlign,
        marginBottom: "1.45rem",
        marginTop: "0.5rem",
      }}
    >
      {siteTitle}
    </h1>
  </header>
);

export default Header;
