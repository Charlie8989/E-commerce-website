import React from "react";
import { assets } from "../assets/assets";

const OurPolicy = () => {
  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-around sm:gap-2 text-[#504B38] text-sm text-center py-2">
        <div>
          <img src={assets.exchange_icon} className="w-12 m-auto mb-5" alt="" />
          <p className="font-semibold">Easy Exchange Policy</p>
          <p className="text-[#6c6b65]">We Offer You Tension Free Exchange</p>
        </div>
        <div>
          <img src={assets.quality_icon} className="w-12 m-auto mb-5" alt="" />
          <p className="font-semibold">Better Quality</p>
          <p className="text-[#6c6b65]">We Provide Best Quality For You</p>
        </div>
        <div>
          <img src={assets.support_img} className="w-12 m-auto mb-5" alt="" />
          <p className="font-semibold">Return Policy</p>
          <p className="text-[#6c6b65]">We Have 7 Days Return Policy For You</p>
        </div>
      </div>
    </div>
  );
};

export default OurPolicy;
