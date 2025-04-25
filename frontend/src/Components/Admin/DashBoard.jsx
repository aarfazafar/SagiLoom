import React from "react";
import { Route, Routes } from "react-router-dom";
import AddProduct from "./AddProduct";
import { Dash } from "./Dash";
import { Layout } from "./Layout";
import ProductList from "../Product/ProductList";
import AddBestseller from "./AddBestsellers";
import Bestsellers from "./BestSellers";
import CustomerDetails from "./CustomerDetails";

export const DashBoard = () => {
  return (
    <Layout>
      <div>
        <Routes>
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/productlist" element={<ProductList />} />
          <Route path="/addbestseller" element= {<AddBestseller/>}/>
          <Route path="/bestsellers" element= {<Bestsellers/>}/>
          <Route path= "/customers" element= {<CustomerDetails/>}/>
        </Routes>
      </div>
    </Layout>
  );
};
