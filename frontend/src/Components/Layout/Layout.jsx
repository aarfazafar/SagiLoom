import React from "react";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
export const Layout = ({ children }) => {
  return (
    <div>
      <NavBar />
      <div className="main-content min-h-screen">{children}</div>
      <Footer/>
    </div>
  );
};
