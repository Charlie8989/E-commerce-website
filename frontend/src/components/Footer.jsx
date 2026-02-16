import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div>
      <div className="px-4 pb-10 sm:px-0 flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 mt-5 sm:mt-30 ">
        <div>
          <img src={assets.logo} className="mb-3 w-50" />
          <p className="text-justify w-full md:w-2/3 text-[#504B38]">
          At Trendora, we bring you handpicked fashion and lifestyle products curated with care. Shop with confidence, style with ease — because you deserve the best.
          </p>
        </div>
        <div className="mt-4">
          <p className="font-semibold text-[#504B38]">COMPANY</p>
          <ul className="font-light flex flex-col gap-1 text-[#504B38]">
            <li>Home</li>
            <li>Contact</li>
            <li>About</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="mt-4">
          <p className="font-semibold text-[#504B38]"> GET IN TOUCH</p>
          <ul className="font-light flex flex-col gap-1 text-[#504B38]">
            <li>+1-212-444-657</li>
            <li>contact@trendora.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="text-[#504B38] text-center py-5 text-sm">
        Code by CHARLIE ❤️
      </p>
    </div>
  );
};

export default Footer;
