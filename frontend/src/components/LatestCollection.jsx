import React, { useEffect, useState, useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItems from "./ProductItems";

const LatestCollection = () => {
  const { products, getProductsData, loading } = useContext(ShopContext);

  const [latestproducts, setlatestproducts] = useState([]);

  // Fetch products if not already loaded
  useEffect(() => {
    if (products.length === 0) {
      getProductsData();
    }
  }, [products, getProductsData]);

  // Pick top 10 products
  useEffect(() => {
    setlatestproducts(products.slice(0, 10));
  }, [products]);

  return (
    <div className="my-10">
      <div className="text-center">
        <Title text1="LATEST COLLECTION" />
        <p className="mb-10 text-md noto-regular text-[#61615e] font-medium text-center">
          Step into elegance with our latest arrivals — where every piece tells
          a story of style and grace.
        </p>
      </div>

      {/* Rendering products */}
        <div className="grid grid-cols-2 mx-7 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
          {latestproducts.map((item) => (
            <ProductItems
              key={item._id}
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
