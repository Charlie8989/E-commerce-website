import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// import { products } from "../assets/assets"; //BECAUSE NOW WE ARE GETTING PRODUCT FROM API ADMIN PORTAL
import { toast } from "react-toastify";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 10;
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const [search, setSearch] = useState("");
  const [showsearch, setShowSearch] = useState(false);
  const [cartItems, setcartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const productCacheKey = "trendoraProductsCache";

  const addToCart = async (itemId, size) => {
    let cartData = structuredClone(cartItems);

    if (!size) {
      toast.error("Select Product Size");
      return;
    }

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    setcartItems(cartData);

    if (token) {
      try {
        await axios.post(
          backendURL + "/api/cart/add",
          { itemId, size },
          { headers: { token } }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }

      // await axios
      //   .post(
      //     backendURL + "/api/cart/add",
      //     { itemId, size, userId },
      //     { headers: { token } }
      //   )
      //   .then((res) => {
      //     console.log("✅ Cart API response:", res.data);
      //   })
      //   .catch((err) => {
      //     console.error("❌ Cart API error:", err.message);
      //   });
    }
  };

  useEffect(() => {
    // console.log(cartItems);
  }, [cartItems]);

  const getcartCount = () => {
    let totalCounts = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCounts += cartItems[items][item];
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    return totalCounts;
  };

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;

    setcartItems(cartData);

    if (token) {
      try {
        await axios.post(
          backendURL + "/api/cart/update",
          { itemId, size, quantity },
          { headers: { token } }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      if (!itemInfo) continue;
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0)
          totalAmount += itemInfo.price * cartItems[items][item];
      }
    }
    return totalAmount;
  };

  const getProductsData = async () => {
    try {
      const cachedProducts = sessionStorage.getItem(productCacheKey);
      if (cachedProducts) {
        const { products: cachedData, savedAt } = JSON.parse(cachedProducts);
        if (Date.now() - savedAt < 5 * 60 * 1000) {
          setProducts(cachedData);
        }
      }

      setLoading(true);
      const response = await axios.get(backendURL + "/api/product/list");
      // console.log(response.data)
      if (response.data.success) {
        setProducts(response.data.products);
        sessionStorage.setItem(
          productCacheKey,
          JSON.stringify({ products: response.data.products, savedAt: Date.now() })
        );
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const buyNow = (itemId, size) => {
    if (!token) {
      toast.error("Please login to buy this product");
      navigate("/login");
      return;
    }

    if (!size) {
      toast.error("Select Product Size");
      return;
    }

    setcartItems({ [itemId]: { [size]: 1 } });
    navigate("/place-order");
  };

  const sendDiscountEmail = async (email) => {
    const response = await axios.post(
      backendURL + "/api/email/discount",
      { email }
    );
    return response.data;
  };

  const getUserCart = async (token) => {
    try {
      const response = await axios.post(
        backendURL + "/api/cart/get",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setcartItems(response.data.cartData);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getUserProfile = async (token) => {
    try {
      const response = await axios.post(
        backendURL + "/api/user/profile",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setUserProfile(response.data.user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) {
      getUserCart(token);
      getUserProfile(token);
    } else {
      setUserProfile(null);
    }
  }, [token]);

  useEffect(() => {
    getProductsData();
  }, []);

  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      getUserCart(localStorage.getItem("token"));
      getUserProfile(localStorage.getItem("token"));
    }
  }, []);

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showsearch,
    setShowSearch,
    cartItems,
    setcartItems,
    addToCart,
    buyNow,
    getcartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendURL,
    token,
    setToken,
    getProductsData,
    loading,
    userProfile,
    sendDiscountEmail,
  };
  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};
export default ShopContextProvider;
