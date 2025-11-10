import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";

const Hero = () => {
  const images = [
    assets.hero_1,
    assets.hero_2,
    assets.hero_3,
    assets.hero_4,
    assets.hero_5,
    assets.hero_6,
    assets.hero_7,
    assets.hero_8,
    assets.hero_9,
    assets.hero_10,
    assets.hero_11,
    assets.hero_12,
    assets.hero_13,
  ];

  const [loaded, setLoaded] = useState(false);
  const [currImage, setImage] = useState(images[0]);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("heroImageData"));
    const now = new Date().getTime();

    if (savedData && now - savedData.timestamp < 60 * 60 * 1000)
      setImage(savedData.image);
    else {
      const random = Math.floor(Math.random() * images.length);
      const newImage = images[random];
      setImage(newImage);
      localStorage.setItem(
        "heroImageData",
        JSON.stringify({ image: newImage, timestamp: now })
      );
    }
  }, []);

  return (
    <div className="flex flex-col sm:flex-row justify-between py-5">
      {/* left side */}
      <div className="py-4  flex justify-center items-center sm:flex-row border-gray-400">
        <div>
          <div className="text-[#504B38] w-full flex items-center gap-2 sm:w-1/2">
            <p className="w-20 lg:w-8 border rounded-4xl border-black"></p>
            <p className="font-medium prata-regular text-[13px] lg:text-lg">
              OUR BESTSELLERS
            </p>
          </div>
          <h1 className=" text-[#504B38] font-medium prata-regular leading-relaxed sm:py-3 lg:text-5xl text-4xl">
            LATEST ARRIVALS
          </h1>
          <div className="text-[#504B38] w-full flex items-center gap-2 sm:w-1/2">
            <p className="font-medium prata-regular text-[13px] lg:text-lg">
              SHOP NOW
            </p>
            <p className="w-20 lg:w-8 border rounded-4xl border-black"></p>
          </div>
        </div>
      </div>

      {/* right side */}
      <div className="px-5 sm:px-0 w-full sm:w-1/2">
        {!loaded && (
          <div className="w-full h-64 sm:h-80 bg-gray-300 animate-pulse rounded-xl sm:rounded-2xl"></div>
        )}

        <img
          src={currImage}
          alt=""
          loading="lazy"
          onLoad={() => setLoaded(true)}
          className={`rounded-xl sm:rounded-2xl w-full h-auto object-cover transition-opacity duration-500 ${
            loaded ? "opacity-100" : "opacity-0 absolute"
          }`}
        />
      </div>
    </div>
  );
};

export default Hero;
