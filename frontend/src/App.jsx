import { Route, Routes } from "react-router-dom";
import "./App.css";
import Lenis from "lenis";
import Home from "./Components/Home/Home";
import { useEffect } from "react";
import ProductOverview from "./Components/Product/ProductOverview";
import { NoPage } from "./Components/noPage/NoPage";
import ScrollTop from "./ScrollTop/ScrollTop";
import Login from "./Components/auth/Login";
import Signup from "./Components/auth/Signup";
import { Toaster } from "react-hot-toast";
import MyState from "./context/mystate";
import { ProtectedRouteForAdmin } from "./protectedRoutes/ProtectedRoute.forAdmin";
import { DashBoard } from "./Components/Admin/DashBoard";
import { Layout } from "./Layout";
import ProductList from "./Components/Product/ProductList";

function App() {
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  });

  return (
    <MyState className="w-screen">
      <ScrollTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/*" element={<Layout/>} />
        <Route path="/productinfo" element={<ProductOverview />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<ProductList />} />
        <Route
          path="/admin/*"
          element={
            <ProtectedRouteForAdmin>
              <DashBoard />
            </ProtectedRouteForAdmin>
          }
        />
      </Routes>
      <Toaster />
    </MyState>
  );
}

export default App;
