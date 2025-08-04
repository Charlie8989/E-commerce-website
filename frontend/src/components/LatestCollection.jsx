import React, { useEffect } from "react";
import { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItems from "./ProductItems";
import axios from "axios";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  
  
  // console.log(products)
  const [latestproducts, setlatestproducts] = useState([]);
  useEffect(() => {
    setlatestproducts(products.slice(0, 10));
  }, [products]);
  // const backendURL = import.meta.env.VITE_BACKEND_URL;

//  useEffect(() => {
//   const fetchProducts = async () => {
//     try {
//       const res = await axios.get(`${backendURL}/product/list`);
//       console.log(res.data.products);
//     } catch (err) {
//       console.error("🔥 Axios error:", err.message);
//       console.log(err.response?.data); // more info if available
//     }
//   };

//   fetchProducts();
// }, []);



  return (
    <div className="my-10">
      <div className=" text-center">
      
        <Title text1={"LATEST COLLECTION"} />
        <p className="mb-10 text-md noto-regular text-[#61615e] font-medium text-center">
          Step into elegance with our latest arrivals — where every piece tells
          a story of style and grace.
        </p>
      </div>
      {/* rendering products */}
      <div className="grid grid-cols-2 mx-7 mx sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {latestproducts.map((item, index) => (
          <ProductItems
            key={index}
            id={item._id}
            image={item.image}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default LatestCollection;
