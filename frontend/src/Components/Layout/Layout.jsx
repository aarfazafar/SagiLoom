import React from "react";
import NavBar from "../NavBar/NavBar";
export const Layout = ({ children }) => {
  return (
    <div>
      <NavBar />
      <div className="main-content min-h-screen">{children}</div>
    </div>
  );
};
