import React from "react";
import SideBar from "./SideBar";

export const Layout = ({ children }) => {
  return (
    <div className="relative w-[100%] min-h-screen flex">
      <div className="fixed top-0  w-auto">

        <SideBar />
      </div>
      <div className="w-full md:flex-1 md:ml-64">{children}</div>
    </div>
  );
};
