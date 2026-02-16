import React, { useContext, useState, useEffect } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const NavBar = () => {
  const {
    notifications,
    getUserNotifications,
    setShowSearch,
    navigate,
    token,
    setToken,
    setcartItems,
    user,
    userFetchdb
  } = useContext(ShopContext);

  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [notification, setNotification] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === "/";
  const isCollection = location.pathname === "/collection";
  const email = user?.email;

  const showNotification = () => {
    if (notification) setNotification(false);
    else setNotification(true);
  };

  useEffect(() => {
    userFetchdb();
  }, []);

  useEffect(() => {
    getUserNotifications(token, email);
  }, []);

  const emojiRandomizer = () => {
    const emojis = ["❤️", "🎉", "💫", "🔥", "😎", "✨", "🚀"];
    return emojis[Math.floor(Math.random() * emojis.length)];
  };

  const logOut = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setcartItems({});
  };
  // console.log("from context",user);

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
          {isHome && (
            <div onClick={showNotification}>
              {notification && token && (
                <div className="absolute top-15 right-20 sm:right-30 flex max-w-[70vw] sm:max-w-[48vw] flex-col items-center text-xs font-light p-4 backdrop-blur-xs bg-white/50 border-white border-2 rounded-md">
                  <div className="my-2 flex gap-2 border-b-1 border-black/30">
                    {emojiRandomizer()}
                    {notifications?.map((n, i) => (
                      <p key={i}>{n}</p>
                    ))}
                  </div>
                </div>
              )}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19 12.59V10c0-3.22-2.18-5.93-5.14-6.74C13.57 2.52 12.85 2 12 2s-1.56.52-1.86 1.26C7.18 4.08 5 6.79 5 10v2.59L3.29 14.3a1 1 0 0 0-.29.71v2c0 .55.45 1 1 1h16c.55 0 1-.45 1-1v-2c0-.27-.11-.52-.29-.71zM19 16H5v-.59l1.71-1.71a1 1 0 0 0 .29-.71v-3c0-2.76 2.24-5 5-5s5 2.24 5 5v3c0 .27.11.52.29.71L19 15.41zM14.82 20H9.18c.41 1.17 1.51 2 2.82 2s2.41-.83 2.82-2"></path>
              </svg>
            </div>
          )}
          {isCollection && (
            <img
              onClick={() => setShowSearch(true)}
              src={assets.search_icon}
              className="w-5 cursor-pointer"
              alt=""
            />
          )}
          {token ? (
            <div className="relative cursor-pointer">
              <img
                onClick={() => setOpen((prev) => !prev)}
                src={user ? user?.photoURL : assets.profile_icon}
                alt="profile"
                className={
                  user
                    ? "w-8 h-8 rounded-full border border-gray-300"
                    : "w-5 cursor-pointer"
                }
              />
              {open && (
                <div className="absolute dropdown-menu pt-4 right-0 z-50">
                  <div className="flex flex-col w-36 bg-slate-100 py-3 px-5 text-gray-500 rounded-xl gap-2 shadow-lg">
                    <NavLink
                      className="hover:text-black cursor-pointer"
                      onClick={() => setOpen(false)}
                      to="/profile"
                    >
                      My Profile
                    </NavLink>
                    <hr className="rounded-xl" />
                    <p
                      className="hover:text-black cursor-pointer"
                      onClick={() => setOpen(false)}
                      to="/orders"
                    >
                      Orders
                    </p>
                    <hr className="rounded-xl" />
                    <p
                      onClick={() => {
                        logOut();
                        setOpen(false);
                      }}
                      className="hover:text-red-600 cursor-pointer"
                    >
                      Log Out
                    </p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="relative">
              <img
                onClick={() => navigate("/login")}
                src={assets.profile_icon}
                className="w-5 cursor-pointer"
                alt="profile"
              />
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
