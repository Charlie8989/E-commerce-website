import { useParams } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RealtedProducts from "../components/RealtedProducts";

const Products = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setproductData] = useState(false);
  const [image, setImage] = useState(" ");
  const [size, setSize] = useState("");

  const fetchProducts = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setImage(item.image[0]);
        setproductData(item);
        return null;
      }
    });
  };

  useEffect(
    (item) => {
      fetchProducts();
    },
    [productId,products]
  );

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        <div className="flex-1 flex flex-col-reverse gap-3  sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto  sm:overflow-y-auto  justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className="w-[24%] sm:w-full rounded-md sm:mb-3 flex-shrink-0 cursor-pointer"
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img
              src={image}
              className="rounded-md sm:rounded-xl w-full border border-gray-300 h-auto"
              alt=""
            />
          </div>
        </div>
        <div className="flex-1 sm:px-0 px-3">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            {" "}
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_dull_icon} alt="" className="w-3.5" />
            <p className="pl-2">{122}</p>
          </div>
          <p className="mt-5 text-3xl font-medium">
            {currency}
            {productData.price}
          </p>
          <p className="mt-5 text-gray-500 md:4/5">{productData.description}</p>
          <div className="flex flex-col my-8 gap-4">
            <p>Select Size</p>
            <div className="flex gap-2">
              {" "}
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  className={`border py-2 px-4 bg-gray-100 rounded-md cursor-pointer ${
                    item === size ? "border-orange-500" : "border-gray-200"
                  }`}
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={()=>addToCart(productData._id,size)}
            className="bg-black text-white px-8 py-3  text-sm mt-4 active:bg-gray-700"
          >
            ADD TO CART
          </button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original Product</p>
            <p>Cash On Delivery is Available on This Product </p>
            <p>Easy Return And Exchange Policy</p>
          </div>
        </div>
      </div>

      {/* description and review */}

      <div className="mt-20">
        <div className="flex ">
          <b className="border border-gray-300 px-5 py-3 text-sm">
            Description
          </b>
          <p className="border border-gray-300 px-5 py-3 text-sm">
            Reviews(122)
          </p>
        </div>
        <div className="flex flex-col gap-4 border border-gray-300 px-6 py-6 text-sm text-gray-500">
          <p>
            Our e-commerce website brings you a vast selection of products
            including fashion, electronics, beauty, and home essentials. We
            focus on delivering quality, value, and variety all in one place.
            With a clean interface and smooth navigation, shopping becomes
            effortless and fun. Explore categories, compare prices, and find
            amazing deals every day.
          </p>
          <p>
            We ensure a secure and convenient shopping experience with trusted
            payment options and easy return policies. Fast shipping, responsive
            customer support, and regular offers make us a reliable choice.
            Whether you're shopping from home or on the go, our platform keeps
            everything simple. Experience hassle-free online shopping like never
            before today!
          </p>
        </div>
      </div>

      {/* disply related product  */}
      <RealtedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Products;
