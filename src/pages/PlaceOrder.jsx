import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const {
    navigate,
    backendURL,
    token,
    cartItems,
    getCartAmount,
    setcartItems,
    delivery_fee,
    products,
  } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onchangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;  
      setFormData((data) => ({ ...data, [name]: value }));
  };

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_TEST_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Order Payment",
      description: "Order Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        console.log(response);
        try {
          const { data } = await axios.post(
            backendURL + "/api/order/verifyRazorpay",
            response,
            { headers: { token } }
          );
          if (data.success) {
            navigate("/orders");
            setcartItems({});
          }
          else{
            navigate("/cart");
          }
        } catch (error) {
          console.log(error);
          toast.error(error.message);
        }
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const onSubmithandler = async (e) => {
    e.preventDefault();
    if(formData.phone.length!=10){
        toast.error("Please Enter 10 Digits Phone Number")
    }
    try {
      let orderItems = [];

      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );
            if (itemInfo) {
              (itemInfo.size = item),
                (itemInfo.quantity = cartItems[items][item]);
              orderItems.push(itemInfo);
            }
          }
        }
      }
      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };

      switch (method) {
        case "cod":
          const response = await axios.post(
            backendURL + "/api/order/place",
            orderData,
            { headers: { token } }
          );
          if (response.data.success) {
            setcartItems({});
            navigate("/orders");
          } else {
            toast.error(response.data.message);
          }

          break;

        case "stripe":
          const responseStripe = await axios.post(
            backendURL + "/api/order/stripe",
            orderData,
            { headers: { token } }
          );
          if (responseStripe.data.success) {
            const { session_url } = responseStripe.data;
            window.location.replace(session_url);
          } else {
            // console.log(responseStripe.data.message)
            toast.error(responseStripe.data.message);
          }
          break;

        case "razorpay":
          const responseRazorpay = await axios.post(
            backendURL + "/api/order/razorpay",
            orderData,
            { headers: { token } }
          );
          if (responseRazorpay.data.success) {
            initPay(responseRazorpay.data.order);
          }
          break;

        default:
          break;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={onSubmithandler}
      className="px-10 sm:px-0 flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t"
    >
      {/* left side */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="tet-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY INFORMATION"} />
        </div>
        <div className="flex gap-3">
          <input
            required
            onChange={onchangeHandler}
            name="firstName"
            value={formData.firstName}
            type="text"
            className="outline-none border border-gray-300 rounded py-1.5 px-3.5 w-full "
            placeholder="First Name"
          />
          <input
            required
            onChange={onchangeHandler}
            name="lastName"
            value={formData.lastName}
            type="text"
            className="outline-none border border-gray-300 rounded py-1.5 px-3.5 w-full "
            placeholder="Last Name"
          />
        </div>
        <input
          required
          onChange={onchangeHandler}
          name="email"
          value={formData.email}
          type="email"
          className="outline-none border border-gray-300 rounded py-1.5 px-3.5 w-full "
          placeholder="Email Address"
        />
        <input
          required
          onChange={onchangeHandler}
          name="street"
          value={formData.street}
          type="text"
          className="outline-none border border-gray-300 rounded py-1.5 px-3.5 w-full "
          placeholder="Street"
        />{" "}
        <div className="flex gap-3">
          <input
            required
            onChange={onchangeHandler}
            name="city"
            value={formData.city}
            type="text"
            className="outline-none border border-gray-300 rounded py-1.5 px-3.5 w-full "
            placeholder="City"
          />
          <input
            required
            onChange={onchangeHandler}
            name="state"
            value={formData.state}
            type="text"
            className="outline-none border border-gray-300 rounded py-1.5 px-3.5 w-full "
            placeholder="State"
          />
        </div>
        <div className="flex gap-3">
          <input
            required
            onChange={onchangeHandler}
            name="zipcode"
            value={formData.zipcode}
            type="Number"
            className="outline-none border border-gray-300 rounded py-1.5 px-3.5 w-full "
            placeholder="ZIP Code"
          />
          <input
            required
            onChange={onchangeHandler}
            name="country"
            value={formData.country}
            type="text"
            className="outline-none border border-gray-300 rounded py-1.5 px-3.5 w-full "
            placeholder="Country"
          />
        </div>
        <input
          required
          onChange={onchangeHandler}
          name="phone"
          value={formData.phone}
          type="Number"
          className="outline-none border border-gray-300 rounded py-1.5 px-3.5 w-full "
          placeholder="Phone"
        />
      </div>
      {/* right side  */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12">
          <Title text1={"PAYMENT METHOD"} />
          <div className="flex gap-3 flex-col lg:flex-row">
            <div
              onClick={() => setMethod("stripe")}
              className="flex items-center gap-3 border border-gray-300 p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border border-gray-400 rounded-full  ${
                  method === "stripe" ? "bg-green-400" : ""
                }`}
              ></p>
              <img src={assets.stripe_logo} className="h-5 mx-4" alt="" />
            </div>
            <div
              onClick={() => setMethod("razorpay")}
              className="flex items-center gap-3 border border-gray-300 p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border border-gray-400 rounded-full  ${
                  method === "razorpay" ? "bg-green-400" : ""
                }`}
              ></p>
              <img src={assets.razorpay_logo} className="h-5 mx-4" alt="" />
            </div>
            <div
              onClick={() => setMethod("cod")}
              className="flex items-center gap-3 border border-gray-300 p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border border-gray-400 rounded-full  ${
                  method === "cod" ? "bg-green-400" : ""
                }`}
              ></p>
              <p className="text-gray-500 text-sm font-medium mx-4">
                CASH ON DELIVERY
              </p>
            </div>
          </div>
          <div className="w-full text-end mt-8">
            <button
              type="submit"
              className="bg-black text-white px-16 py-3 text-sm"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
