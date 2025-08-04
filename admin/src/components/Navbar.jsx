import React from "react";
import { assets } from "../assets/assets";

const Navbar = ({setToken}) => {
  return (
    <div className="flex items-center py-2 px-[4%] justify-between">
      <img src={assets.logo} className="w-[max(10%,80px)]" alt="" />
      <button onClick={()=>setToken('')} className="hover:bg-[#504B38] border hover:text-white px-4 py-2 rounded-sm transition-all duration-300">
        LogOut
      </button>
    </div>
  );
};

export default Navbar;
