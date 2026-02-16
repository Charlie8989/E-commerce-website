import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

// import { products } from "../assets/assets"; //BECAUSE NOW WE ARE GETTING PRODUCT FROM API ADMIN PORTAL
import { toast } from "react-toastify";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const { userId } = useParams();
  const currency = "$";
  const delivery_fee = 10;
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const [search, setSearch] = useState("");
  const [showsearch, setShowSearch] = useState(false);
  const [cartItems, setcartItems] = useState({});
  const [notifications, setNotifications] = useState([]);
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [profilepic, setprofilepic] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

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
          { itemId, size, userId },
          { headers: { token } },
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
          { headers: { token } },
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  //wow logic
  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0)
            totalAmount += itemInfo.price * cartItems[items][item];
        } catch (error) {}
      }
    }
    return totalAmount;
  };

  const getProductsData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(backendURL + "/api/product/list");
      // console.log(response.data)
      if (response.data.success) {
        setProducts(response.data.products);
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

  const userFetchdb = async (email) => {
    try {
      const res = await axios.post(backendURL + "/api/user/profile", { email });
      console.log("data from context", res.data);
      // setprofilepic(res.data.profilePic);
    } catch (err) {
      console.error("Error fetching user:", err);
    }
  };

  const sendDiscountEmail = async (email) => {
    try {
      const response = await axios.post(backendURL + "/api/email/discount", {
        email,
      });

      if (response.data.success) {
        setUser((prev) => ({
          ...prev,
          isSubscribed: true,
        }));

        toast.success("Subscribed! Check your email ");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const getUserCart = async (token, email) => {
    try {
      const response = await axios.post(
        backendURL + "/api/cart/get",
        { email },
        { headers: { token } },
      );
      if (response.data.success) {
        setcartItems(response.data.cartData);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getUserNotifications = async (token) => {
    try {
      const response = await axios.post(
        backendURL + "/api/user/notification",
        { email },
        { headers: { token } },
      );
      if (response.data.success) {
        setNotifications(response.data.notifications);
      }
      // console.log(response.data);
    } catch (error) {
      console.log(error);
      // toast.error(error.message);
    }
  };

  const saveUserPhone = async ( phone) => {
    try {
      const response = await axios.post(
        backendURL + "/api/user/savePhone",
        { phone },
      );
      console.log(response.data);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  useEffect(() => {
    if (token) {
      getUserCart(token);
    }
  }, [token]);

  useEffect(() => {
    getProductsData();
  }, []);

  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      getUserCart(localStorage.getItem("token"));
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
    getcartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendURL,
    token,
    setToken,
    getProductsData,
    loading,
    user,
    sendDiscountEmail,
    getUserNotifications,
    notifications,
    userFetchdb,
    saveUserPhone
  };
  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};
export default ShopContextProvider;
