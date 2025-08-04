import React from "react";
import { Route, Routes } from "react-router-dom";
import Collection from "./pages/Collection";
import Home from "./pages/home";
import About from "./pages/about";
import Cart from "./pages/cart";
import Contact from "./pages/contact";
import Login from "./pages/login";
import Order from "./pages/Order";
import PlaceOrder from "./pages/placeorder";
import Products from "./pages/products";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { ToastContainer, toast } from "react-toastify";
import SearchBar from "./components/SearchBar";
import Verify from "./pages/Verify";

const App = () => {
  return (
    <div className="px:4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] bg-[#F8F3D9] ">
      <ToastContainer />
      <NavBar />
      <SearchBar />
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
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
