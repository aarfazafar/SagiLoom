import React from "react";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import { useContext } from "react";
import myContext from "../../context/myContext";
export const Layout = ({ children }) => {
  const context = useContext(myContext);
  const { getAllProducts } = context;
  return (
    <div>
      <NavBar data={getAllProducts} />
      <div className="main-content min-h-screen">{children}</div>
      <Footer/>
    </div>
  );
};
