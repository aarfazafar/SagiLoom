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
import About from "./Components/About/About";
import ProductPage from "./Components/Product/ProductPage";
import Wishlist from "./Components/WishList/Wishlist";
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
      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/*" element={<Layout />} />
        <Route path="/productinfo/:productId" element={<ProductOverview />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/about" element={<About />} />
        {/* <Route path="/productpage" element={<ProductPage />} /> */}
        <Route
          path="/productpage/:categoryId?/:sectionId?/:itemName?"
          element={<ProductPage />}
        />
        <Route
          path="/admin/*"
          element={
            <ProtectedRouteForAdmin>
              <DashBoard />
            </ProtectedRouteForAdmin>
          }
        />
        <Route path="/wishlist" element={<Wishlist/>}/>
      </Routes>
      <Toaster />
    </MyState>
  );
}

export default App;
