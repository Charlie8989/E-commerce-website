import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Order = () => {
  const { backendURL, token, currency } = useContext(ShopContext);

  const [orderData, setorderData] = useState([]);
  const [cancellingOrderId, setCancellingOrderId] = useState("");

  const loadorderData = async () => {
    try {
      if (!token) {
        return null;
      }

      const response = await axios.post(
        backendURL + "/api/order/userOrders",
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        let allordersItem = [];
        response.data.orders.map((order) => {
          order.items.map((item) => {
            item["status"] = order.status;
            item["orderId"] = order._id;
            item["payment"] = order.payment;
            item["paymentMethod"] = order.paymentMethod;
            item["date"] = order.date;
            allordersItem.push(item);
          });
        });
        setorderData(allordersItem.reverse());
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const cancelOrder = async (orderId) => {
    try {
      if (!orderId || cancellingOrderId) return;

      setCancellingOrderId(orderId);
      const response = await axios.post(
        backendURL + "/api/order/cancel",
        { orderId },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        await loadorderData();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setCancellingOrderId("");
    }
  };

  useEffect(() => {
    loadorderData();
  }, [token]);

  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1={"MY ORDERS"} />
      </div>
      <div>
        {orderData.map((item, index) => (
          <div
            key={index}
            className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            <div className="flex items-start gap-6 text-sm ">
              <img src={item.image[0]} className="w-16 sm:w-20" alt="" />
              <div>
                <p className="sm:text-base font-medium">{item.name}</p>
                <div className="flex items-center gap-3 mt-2 text-base text-gray-700">
                  <p>
                    {currency}
                    {item.price}
                  </p>
                  <p>{item.quantity}</p>
                  <p>{item.size}</p>
                </div>
                <p className="mt-2">
                  Date:
                  <span className="text-gray-500">
                    {" "+new Date(item.date).toDateString()}
                  </span>
                </p>
                 <p className="mt-2">
                  Payment:
                  <span className="text-gray-500">
                    {item.paymentMethod}
                  </span>
                </p>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-between">
              <div className="flex items-center gap-2">
                <p
                  className={`min-w-2 h-2 rounded-full ${
                    item.status === "Cancelled" ? "bg-red-500" : "bg-green-500"
                  }`}
                ></p>
                <p className="text-sm md:text-base">{item.status}</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                {["Order placed", "Processing"].includes(item.status) && (
                  <button
                    onClick={() => cancelOrder(item.orderId)}
                    disabled={cancellingOrderId === item.orderId}
                    className="border border-red-500 text-red-600 text-sm font-medium px-4 py-2 rounded-sm disabled:opacity-60"
                  >
                    {cancellingOrderId === item.orderId ? "Cancelling..." : "Cancel Order"}
                  </button>
                )}
                <button onClick={loadorderData} className="border text-sm font-medium px-4 py-2 rounded-sm">
                  Track Order
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;
