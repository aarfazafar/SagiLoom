import React from "react";
import { Route, Routes } from "react-router-dom";
import AddProduct from "./AddProduct";
import { Dash } from "./Dash";
import { Layout } from "./Layout";
import ProductList from "../Product/ProductList";
import AddBestseller from "./AddBestsellers";

export const DashBoard = () => {
  return (
    <Layout>
      <div>
        <Routes>
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/productlist" element={<ProductList />} />
          <Route path="/addbestseller" element= {<AddBestseller/>}/>
        </Routes>
      </div>
    </Layout>
  );
};
