import React from "react";
import { assets } from "../assets/assets";

const Hero = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-between py-5">
      {/* left side */}
      <div className="py-4  flex justify-center items-center sm:flex-row border-gray-400">
        <div>
          <div className="text-[#504B38] w-full flex items-center gap-2 sm:w-1/2">
            <p className="w-20 lg:w-8 border rounded-4xl border-black"></p>
            <p className="font-medium prata-regular text-[13px] lg:text-lg">OUR BESTSELLERS</p>
          </div>
          <h1 className=" text-[#504B38] font-medium prata-regular leading-relaxed sm:py-3 lg:text-5xl text-4xl">
            LATEST ARRIVALS
          </h1>
          <div className="text-[#504B38] w-full flex items-center gap-2 sm:w-1/2">
            <p className="font-medium prata-regular text-[13px] lg:text-lg">SHOP NOW</p>
            <p className="w-20 lg:w-8 border rounded-4xl border-black"></p>
          </div>
        </div>
      </div>

      {/* right side */}
      <div className="px-5 sm:px-0 w-full sm:w-1/2 ">
        <img
          src={assets.hero_2}
          className="rounded-xl sm:rounded-2xl w-full h-auto object-cover"
          alt=""
        />
      </div>
    </div>
  );
};

export default Hero;
