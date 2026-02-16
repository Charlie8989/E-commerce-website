import {
  User,
  Mail,
  Phone,
  MapPin,
  Package,
  Heart,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";

const Item = ({ icon: Icon, label, danger, onClick }) => (
  <div
    onClick={onClick}
    className={`flex items-center justify-between p-4 rounded-xl border transition cursor-pointer ${
      danger
        ? "border-red-200 hover:bg-red-50 text-red-600"
        : "hover:bg-gray-50"
    }`}
  >
    <div className="flex items-center gap-3">
      <Icon size={18} />
      <span className="font-medium">{label}</span>
    </div>
    {!danger && <ChevronRight size={18} className="text-gray-400" />}
  </div>
);

const Profile = () => {
  const { user, saveUserPhone } = useContext(ShopContext);
  const [editing, setEditing] = useState(false);
  const [phone, setPhone] = useState(user?.phone || "");

  // console.log(user);

  return (
    <div className="min-h-[80vh] bg-[#fdf8e6] flex justify-center py-16 px-4">
      <div className="w-full max-w-3xl bg-[#fdf4d19d] rounded-3xl shadow-xl p-8">
        <div className="flex items-center gap-5 mb-8">
          <div className="w-20 h-20 rounded-full bg-black text-white flex items-center justify-center">
            <User size={32} />
            <img
              src={user?.photoURL}
              className="rounded-full border-[#e7cf78] border-3"
              alt="user photo"
            />
          </div>
          <div>
            <h1 className="text-2xl font-semibold">{user?.displayName}</h1>
            <p className="text-gray-500">{user?.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="p-5 rounded-2xl bg-gray-50">
            <h3 className="text-sm font-semibold text-gray-500 mb-4">
              PERSONAL INFO
            </h3>
            <div className="space-y-3">
              <Item icon={Mail} label={user?.email || "Add Email"} />
              <Item
                icon={Phone}
                label={
                  editing ? (
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e?.target?.value)}
                      onBlur={() => saveUserPhone()}
                      autoFocus
                      className="border-b outline-none bg-transparent w-40"
                      placeholder="Enter phone"
                    />
                  ) : (
                    user?.phone || "Add phone number"
                  )
                }
                onClick={() => !editing && setEditing(true)}
              />

              <Item icon={MapPin} label="Ayodhya, Uttar Pradesh" />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-gray-50">
            <h3 className="text-sm font-semibold text-gray-500 mb-4">
              ACCOUNT
            </h3>
            <div className="space-y-3">
              <Item icon={Package} label="My Orders" />
              <Item icon={Heart} label="Wishlist" />
              <Item icon={LogOut} label="Logout" danger />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
