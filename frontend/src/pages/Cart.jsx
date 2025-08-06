import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";

const Cart = () => {
  const { cartItems, currency, products, navigate, updateQuantity } =
    useContext(ShopContext);

  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const productId in cartItems) {
        const sizes = cartItems[productId];
        for (const size in sizes) {
          if (sizes[size] > 0) {
            tempData.push({
              _id: productId,
              size: size,
              quantity: sizes[size],
            });
          }
        }
      }
      setCartData(tempData);
    }
  }, [products, cartItems]);

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1={"YOUR CART"} />
      </div>

      {cartData.map((item, index) => {
        const productData = products.find(
          (product) => product._id === item._id
        );

        // Safely skip if no product found
        if (!productData) {
          console.warn("No product found for ID:", item._id);
          return null;
        }

        return (
          <div
            key={index}
            className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
          >
            <div className="flex items-start gap-6">
              {productData.image?.[0] && (
                <img
                  src={productData.image[0]}
                  className="w-16 sm:w-20"
                  alt="product"
                />
              )}

              <div>
                <p className="text-xs sm:text-lg font-medium">
                  {productData.name}
                </p>
                <div className="flex items-center gap-5 mt-2">
                  <p>
                    {currency}
                    {productData.price}
                  </p>
                  <p className="px-2 sm:px-3 sm:py-1 border bg-gray-200 rounded-md">
                    {item.size}
                  </p>
                </div>
              </div>
            </div>

            <input
              onChange={(e) =>
                e.target.value === "" || e.target.value === "0"
                  ? null
                  : updateQuantity(item._id, item.size, Number(e.target.value))
              }
              type="number"
              className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
              min={1}
              defaultValue={item.quantity}
            />

            <img
              onClick={() => updateQuantity(item._id, item.size, 0)}
              src={assets.bin_icon}
              className="w-4 mr-4 sm:w-5 cursor-pointer"
              alt="delete"
            />
          </div>
        );
      })}

      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-end">
            <button
              className="bg-black cursor-pointer text-white text-sm my-8 px-8 py-3"
              onClick={() => navigate("/place-order")}
            >
              PROCEED TO FUCK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
