import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import SearchBar from "./components/SearchBar";
import ScrollToTop from "./components/ScrollToTop";

const Home = lazy(() => import("./pages/Home"));
const Collection = lazy(() => import("./pages/Collection"));
const About = lazy(() => import("./pages/About"));
const Cart = lazy(() => import("./pages/Cart"));
const Contact = lazy(() => import("./pages/Contact"));
const Login = lazy(() => import("./pages/Login"));
const Order = lazy(() => import("./pages/Order"));
const PlaceOrder = lazy(() => import("./pages/PlaceOrder"));
const Products = lazy(() => import("./pages/Products"));
const Verify = lazy(() => import("./pages/Verify"));
const Profile = lazy(() => import("./pages/Profile"));

const App = () => {
  return (
    <div className="px:4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] bg-[#F8F3D9] ">
      <ToastContainer />
      <NavBar />
      <SearchBar />
      <ScrollToTop />
      <Suspense
        fallback={
          <div className="min-h-[50vh] flex items-center justify-center text-[#504B38]">
            Loading...
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/orders" element={<Order />} />
          <Route path="/place-order" element={<PlaceOrder />} />
          <Route path="/product/:productId" element={<Products />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Suspense>
      <Footer />
    </div>
  );
};

export default App;
