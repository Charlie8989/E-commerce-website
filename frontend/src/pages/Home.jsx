import React from "react";
import Hero from "../components/Hero";
import LatestCollection from "../components/LatestCollection";
import OurPolicy from "../components/OurPolicy";
import Newsletter from "../components/Newsletter";

const Home = () => {
  return (
    <div>
      <Hero />
      <LatestCollection/>
      <OurPolicy/>
      <Newsletter/>
    </div>
  );
};

export default Home;
