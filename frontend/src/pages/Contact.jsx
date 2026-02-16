import React from "react";
import Title from "../components/Title";
import Newsletter from "../components/Newsletter";
import { assets } from "../assets/assets";

const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 border-t ">
        <Title text1={"CONTACT US"} />
      </div>
      <div className="my-10 flex flex-col justify-center md:flex-row gap-10">
        <img
          className="w-full md:max-w-[480px]  rounded-md border-1 border-gray-300"
          src={assets.contact_img}
          alt=""
        />
        <div className="flex flex-col justify-center items-start  gap-6">
          <p className="font-semibold text-xl text-gray-600">Our Store</p>
          <p className="text-gray-500">
            54709 William Station <br /> Suite 350,Washington,USA
          </p>
          <p className="text-gray-500">
            Tel:+1-212-444-657 <br /> Email:contact@trendora.com
          </p>
          <p className="font-semibold text-xl text-gray-600">
            Careers At Trendora
          </p>
          <p className="text-gray-500">
            Learn More About Our Team And Job Opening
          </p>
          <button className="rounded-md border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500">
            Explore Jobs
          </button>
        </div>
      </div>
      <Newsletter />
    </div>
  );
};

export default Contact;
