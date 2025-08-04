import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { backendURL, currency } from "../App";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const fetchAllOrders = async () => {
    if (!token) {
      return null;
    }

    try {
      const response = await axios.post(
        backendURL + "/api/order/list",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.success) {
        setOrders(response.data.orders.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const statusHandler = async (event, orderId) => {
  try {
    const response = await axios.post(
      backendURL + "/api/order/status",
      {
        orderId,
        status: event.target.value,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    if (response.data.success) {
      await fetchAllOrders(); 
      toast.success("Order status updated");
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
    console.log(error.message);
    toast.error("Failed to update status");
  }
};


  useEffect(() => {
    fetchAllOrders();
  }, [token]);
  return (
    <div>
      <h3 className="text-2xl font-bold mb-6 text-gray-800">Order Page</h3>
      <div>
        {orders.map((order, index) => {
          return (
            <div
              key={index}
              className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-5 items-start border-2 border-gray-300 rounded-xl shadow-sm p-5 md:p-8 my-4 bg-[#F8F3D9] hover:shadow-md transition-shadow duration-300"
            >
              <img
                src={assets.parcel_icon}
                alt=""
                className="w-10 h-10 mx-auto"
              />

              <div className="space-y-2">
                <div className="font-medium text-sm sm:text-base">
                  {order.items.map((item, index) => (
                    <p key={index}>
                      {item.name} x {item.quantity}{" "}
                      <span className="text-gray-500">({item.size})</span>
                      {index !== order.items.length - 1 && ","}
                    </p>
                  ))}
                </div>
                <p className="font-semibold mt-3">
                  {order.address.firstName} {order.address.lastName}
                </p>
                <div className="text-gray-500 text-sm leading-tight">
                  <p>{order.address.street}</p>
                  <p>
                    {order.address.city}, {order.address.state},{" "}
                    {order.address.country}, {order.address.zipcode}
                  </p>
                  <p>📞 {order.address.phone}</p>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <p>
                  🛒 Items:{" "}
                  <span className="font-semibold">{order.items.length}</span>
                </p>
                <p>
                  💳 Method:{" "}
                  <span className="font-semibold">{order.paymentMethod}</span>
                </p>
                <p>
                  ✅ Payment:{" "}
                  <span
                    className={`font-semibold ${
                      order.payment ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    {order.payment ? "Done" : "Pending"}
                  </span>
                </p>
                <p>📅 Date: {new Date(order.date).toLocaleDateString()}</p>
              </div>

              <div className="text-lg font-bold text-green-600">
                {currency}
                {order.amount}
              </div>

              <div>
                <select
                  onChange={(event)=>statusHandler(event,order._id)}
                  value={order.status}
                  className="p-2 border border-gray-300 rounded-md text-sm"
                >
                  <option value="Order Placed">Order Placed</option>
                  <option value="Packing">Packing</option>
                  <option value="Shipping">Shipping</option>
                  <option value="Out For Delivery">Out For Delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
