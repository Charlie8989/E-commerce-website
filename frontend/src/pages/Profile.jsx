import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";

const Profile = () => {
  const { backendURL, token, userProfile, navigate, currency } =
    useContext(ShopContext);
  const [orders, setOrders] = useState([]);
  const [avatarBroken, setAvatarBroken] = useState(false);

  const profileImage = userProfile?.profilePic;
  const displayName = userProfile?.name || "Trendora shopper";
  const email = userProfile?.email || "No email added";
  const coupons = userProfile?.coupons || [];
  const activeCoupons = coupons.filter(
    (coupon) => new Date(coupon.expiresAt) > new Date()
  );
  const expiredCoupons = coupons.filter(
    (coupon) => new Date(coupon.expiresAt) <= new Date()
  );

  const loadOrders = async () => {
    try {
      if (!token) return;
      const response = await axios.post(
        backendURL + "/api/order/userorders",
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        setOrders(response.data.orders || []);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    loadOrders();
  }, [token]);

  useEffect(() => {
    setAvatarBroken(false);
  }, [profileImage]);

  const totalSpent = orders.reduce((sum, order) => sum + (order.amount || 0), 0);

  return (
    <div className="border-t pt-10 pb-16 px-4 sm:px-0 text-[#504B38]">
      <div className="text-2xl mb-8">
        <Title text1={"MY PROFILE"} />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
        <section className="border border-[#b7ad87] bg-[#fbf7df] rounded-sm p-6">
          <div className="flex items-center gap-5">
            <img
              src={!avatarBroken && profileImage ? profileImage : assets.profile_icon}
              onError={() => setAvatarBroken(true)}
              alt="profile"
              className="w-20 h-20 rounded-full object-cover border border-[#b7ad87] bg-white p-1"
            />
            <div>
              <p className="prata-regular text-2xl">{displayName}</p>
              <p className="text-sm text-[#6c654d] mt-1">{email}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mt-8 text-center">
            <div className="border border-[#d6cfad] py-4 bg-[#F8F3D9]">
              <p className="text-xl font-medium">{orders.length}</p>
              <p className="text-xs text-[#6c654d]">Orders</p>
            </div>
            <div className="border border-[#d6cfad] py-4 bg-[#F8F3D9]">
              <p className="text-xl font-medium">{currency}{totalSpent}</p>
              <p className="text-xs text-[#6c654d]">Spent</p>
            </div>
            <div className="border border-[#d6cfad] py-4 bg-[#F8F3D9]">
              <p className="text-xl font-medium">{activeCoupons.length}</p>
              <p className="text-xs text-[#6c654d]">Coupons</p>
            </div>
          </div>
        </section>

        <section className="border border-[#b7ad87] bg-[#fbf7df] rounded-sm p-6">
          <div className="flex items-center justify-between gap-4 mb-5">
            <p className="prata-regular text-2xl">Recent Orders</p>
            <button
              onClick={() => navigate("/orders")}
              className="bg-[#504B38] text-[#F8F3D9] px-5 py-2 text-sm rounded-sm"
            >
              VIEW ALL
            </button>
          </div>

          <div className="flex flex-col gap-3">
            {orders.slice(0, 3).map((order) => (
              <div
                key={order._id}
                className="flex items-center justify-between gap-4 border-t border-[#d6cfad] pt-3 text-sm"
              >
                <div>
                  <p className="font-medium">{order.items?.[0]?.name || "Order"}</p>
                  <p className="text-[#6c654d]">
                    {new Date(order.date).toDateString()} - {order.paymentMethod}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{currency}{order.amount}</p>
                  <p className="text-[#6c654d]">{order.status || "Order Placed"}</p>
                </div>
              </div>
            ))}

            {orders.length === 0 && (
              <div className="border-t border-[#d6cfad] pt-5 text-sm text-[#6c654d]">
                No orders yet. Your next favorite piece can start here.
              </div>
            )}
          </div>
        </section>

        <section className="border border-[#b7ad87] bg-[#fbf7df] rounded-sm p-6 lg:col-span-2">
          <div className="flex items-center justify-between gap-4 mb-5">
            <p className="prata-regular text-2xl">Available Coupons</p>
            <button
              onClick={() => navigate("/place-order")}
              className="border border-[#504B38] text-[#504B38] px-5 py-2 text-sm rounded-sm hover:bg-[#504B38] hover:text-[#F8F3D9] transition-colors"
            >
              USE AT CHECKOUT
            </button>
          </div>

          {activeCoupons.length > 0 ? (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {activeCoupons.map((coupon) => (
                <div
                  key={coupon.code}
                  className="border border-[#d6cfad] bg-[#F8F3D9] p-4 rounded-sm"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-medium tracking-wide">{coupon.code}</p>
                    <span className="text-xs border border-[#504B38] px-2 py-1">
                      20% OFF
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-[#6c654d]">
                    Valid till {new Date(coupon.expiresAt).toDateString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="border-t border-[#d6cfad] pt-5 text-sm text-[#6c654d]">
              No active coupons yet. Subscribe to get your next Trendora code.
            </p>
          )}

          {expiredCoupons.length > 0 && (
            <div className="mt-5 border-t border-[#d6cfad] pt-4">
              <p className="text-sm font-medium mb-3">Expired Coupons</p>
              <div className="flex flex-wrap gap-2">
                {expiredCoupons.map((coupon) => (
                  <span
                    key={coupon.code}
                    className="text-xs border border-[#d6cfad] text-[#8a8263] px-3 py-2"
                  >
                    {coupon.code}
                  </span>
                ))}
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Profile;
