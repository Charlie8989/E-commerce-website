import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const ProductItems = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);
  return (
    <Link className="text-[#504B38] cursor-pointer" to={`/product/${id}`}>
      <div className="my-3">
        <div className="overflow-hidden">
          <img
            className="hover:scale-110 rounded-2xl"
            src={image[0]}
            loading="lazy"
            alt=""
          />
        </div>
        <p className="pt-3 pb-1 text-sm">{name}</p>
        <p className="text-sm font-medium">
          {currency}
          {price}
        </p>
      </div>
    </Link>
  );
};

export default ProductItems;
