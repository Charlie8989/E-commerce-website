import {
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
    <div className='text-center w-full text-2xl'>
      In Progress
    </div>
  )
}

export default Profile
