import React from "react";
import { Route, Routes } from "react-router-dom";
import AddProduct from "./AddProduct";
import { Dash } from "./Dash";
import { Layout } from "./Layout";
import ProductList from "../Product/ProductList";

export const DashBoard = () => {
  return (
    <Layout>
      <div>
        <Routes>
          <Route path="addproduct" element={<AddProduct />} />
          <Route path="/productlist" element={<ProductList />} />
        </Routes>
      </div>
    </Layout>
  );
};
