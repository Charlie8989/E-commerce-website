import React from "react";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import Newsletter from '../components/Newsletter'

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT US"} />
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          className="w-full md:max-w-[450px] rounded-md border-1 border-gray-300"
          src={assets.about_img}
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>We are a passionate team dedicated to delivering excellence in everything we do. With a strong belief in quality, we strive to ensure customer satisfaction and long-lasting trust, every single time.</p>
          <p>We continuously improve through feedback and innovation. Our commitment to consistency, creativity, and transparency sets us apart in today's competitive environment.</p>
          <b className="text-gray-800 ">Our Mission</b>
          <p>Our mission is to make your experience unforgettable by offering reliable solutions with a personal touch. We aim to simplify your life with our expert services and unwavering support at every step.</p>
        </div>
      </div>
      <div className="text-xl py-4 ">
        <Title text1={'WHY CHOOSE US'}/>
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border border-gray-400 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assuarence</b>
          <p className="text-gray-500">We always ensure top-tier quality in every product or service we provide. Every detail is checked thoroughly before reaching you.</p>
        </div>
        <div className="border border-gray-400 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience</b>
          <p className="text-gray-500">Our services are designed to fit into your lifestyle effortlessly. From browsing to delivery, we keep it smooth and simple.</p>
        </div>
        <div className="border border-gray-400 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service</b>
          <p className="text-gray-500">We care about your needs. Our support team is always ready to assist with kindness, patience, and quick solutions.</p>
        </div>
      </div>
      <Newsletter/>
    </div>
  );
};

export default About;
