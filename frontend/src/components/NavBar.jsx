import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const NavBar = () => {
  const [visible, setVisible] = useState(false);
  const { setShowSearch, navigate, token, setToken, setcartItems, user } =
    useContext(ShopContext);
  const logOut = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setcartItems({});
  };
  const { getcartCount } = useContext(ShopContext);
  return (
    <div>
      <div className="font-medium flex items-center justify-between py-5 px-5 backdrop-blur-md">
        <Link to={"/"}>
          <img src={assets.logo} className="w-34 h-auto" alt="" />
        </Link>
        <ul className="hidden sm:flex text-sm gap-5 text-gray-700">
          <NavLink to="/" className="flex-col items-center flex gap-1">
            <p className="text-[#504B38]">Home</p>
            <hr className="w-2/4 h-[1.5px] bg-gray-700 border-none hidden" />
          </NavLink>
          <NavLink
            to="/collection"
            className="flex-col items-center flex gap-1"
          >
            <p className="text-[#504B38]">Collections</p>
            <hr className="w-2/4 h-[1.5px] bg-gray-700 border-none hidden" />
          </NavLink>

          <NavLink to="/about" className="flex-col items-center flex gap-1">
            <p className="text-[#504B38]">About</p>
            <hr className="w-2/4 h-[1.5px] bg-gray-700 border-none hidden" />
          </NavLink>
          <NavLink to="/contact" className="flex-col items-center flex gap-1">
            <p className="text-[#504B38]">Contact</p>
            <hr className="w-2/4 h-[1.5px] bg-gray-700 border-none hidden" />
          </NavLink>
        </ul>
        <div className="flex items-center gap-6">
          <img
            onClick={() => setShowSearch(true)}
            src={assets.search_icon}
            className="w-5 cursor-pointer"
            alt=""
          />
          {token ? (
            <div className="group relative">
              <img
                onClick={() => (token ? null : navigate("/login"))}
                src={token ? user?.photoURL : assets.profile_icon}
                alt="profile"
                className={
                  token
                    ? "w-8 h-8 rounded-full border border-gray-300"
                    : "w-5 cursor-pointer"
                }
              />
              {token && (
                <div className="group-hover:block hidden absolute dropdown-menu pt-4 right-0">
                  <div className="flex flex-col w-36 bg-slate-100 py-3 px-5 text-gray-500 rounded-xl gap-2">
                    <p className="hover:text-black cursor-pointer">
                      My Profile
                    </p>
                    <hr className="rounded-xl" />
                    <p
                      className="hover:text-black cursor-pointer"
                      onClick={() => navigate("/orders")}
                    >
                      Orders
                    </p>
                    <hr className="rounded-xl" />
                    <p
                      onClick={logOut}
                      className="hover:text-red-600 cursor-pointer"
                    >
                      Log Out
                    </p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="group relative">
              <img
                onClick={() => (token ? null : navigate("/login"))}
                src={assets.profile_icon}
                className="w-5 cursor-pointer"
                alt=""
              />
              {token && (
                <div className="group-hover:block hidden absolute dropdown-menu pt-4 right-0">
                  <div className="flex flex-col w-36 bg-slate-100 py-3 px-5 text-gray-500 rounded-xl gap-2">
                    <p className="hover:text-black cursor-pointer">
                      My Profile
                    </p>
                    <hr className="rounded-xl" />
                    <p
                      className="hover:text-black cursor-pointer"
                      onClick={() => navigate("/orders")}
                    >
                      Orders
                    </p>
                    <hr className="rounded-xl" />
                    <p
                      onClick={logOut}
                      className="hover:text-red-600 cursor-pointer"
                    >
                      Log Out
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {token && (
            <Link to="/cart" className="relative">
              <img
                src={assets.cart_icon}
                className="w-5 cursor-pointer"
                alt=""
              />
              <p className="text-white text-xs bg-red-600 rounded-full absolute w-4 text-center leading-4 aspect-square right-[-7px] top-[-3px]">
                {getcartCount()}
              </p>
            </Link>
          )}
          <img
            onClick={() => setVisible(true)}
            src={assets.menu_icon}
            className="w-5 cursor-pointer sm:hidden"
            alt=""
          />
        </div>
        {/* menu for small screen */}
        <div
          className={`fixed top-0 left-0 h-full bg-white z-50 transition-all duration-300 ${
            visible
              ? "w-full opacity-100 pointer-events-auto"
              : "w-0 opacity-0 pointer-events-none"
          }`}
        >
          <div className="flex flex-col text-gray-600">
            <div
              onClick={() => setVisible(false)}
              className="gap-4 flex items-center p-3"
            >
              <img
                src={assets.dropdown_icon}
                className="cursor-pointer rotate-180 h-4"
                alt=""
              />
              <p className="cursor-pointer font-semibold">Back</p>
            </div>
            <NavLink
              onClick={() => setVisible(false)}
              to="/"
              className="py-2 pl-6 border-b-1 border-t-1 bg-white border-gray-400"
            >
              Home
            </NavLink>
            <NavLink
              onClick={() => setVisible(false)}
              to="/collection"
              className="bg-white py-2 pl-6 border-b-1 border-gray-400"
            >
              Collections
            </NavLink>
            <NavLink
              onClick={() => setVisible(false)}
              to="/contact"
              className="bg-white py-2 pl-6 border-b-1 border-gray-400"
            >
              Contact
            </NavLink>
            <NavLink
              onClick={() => setVisible(false)}
              to="/about"
              className="bg-white py-2 pl-6 border-b-1 border-gray-400"
            >
              About
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
