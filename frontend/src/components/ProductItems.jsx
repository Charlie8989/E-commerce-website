import { useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const ProductItems = ({
  id,
  image = [],
  name,
  price,
  sizes = [],
  showActions = false,
}) => {
  const { currency, addToCart } = useContext(ShopContext);
  const defaultSize = sizes[0];
  const imageUrl = image?.[0]?.includes("/upload/")
    ? image[0].replace("/upload/", "/upload/f_auto,q_auto,w_600/")
    : image?.[0];

  return (
    <div className="my-3 text-[#504B38]">
      <Link className="cursor-pointer" to={`/product/${id}`}>
        <div className="overflow-hidden rounded-2xl bg-[#eee9d0] aspect-[3/4]">
          <img
            className="h-full w-full object-cover hover:scale-110 transition-transform duration-300 rounded-2xl"
            src={imageUrl}
            loading="lazy"
            decoding="async"
            alt={name}
          />
        </div>
        <p className="pt-3 pb-1 text-sm">{name}</p>
        <p className="text-sm font-medium">
          {currency}
          {price}
        </p>
      </Link>
      {showActions && (
        <div className="mt-3 text-[11px] sm:text-xs">
          <button
            type="button"
            onClick={() => addToCart(id, defaultSize)}
            className="w-full border border-[#504B38] text-[#504B38] py-2 px-2 rounded-sm hover:bg-[#504B38] hover:text-[#F8F3D9] transition-colors"
          >
            ADD TO CART
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductItems;
