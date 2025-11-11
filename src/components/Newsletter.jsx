import React from "react";
import { toast, ToastContainer } from "react-toastify";
import { ShopContext } from "../context/ShopContext";
import { useContext } from "react";
import { useState } from "react";
import { Loader } from "lucide-react";

const Newsletter = () => {
  const [loading, setLoading] = useState(false);
  const { sendDiscountEmail } = useContext(ShopContext);

  const OnSubmitHandler = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;

    if (!email) {
      toast.error("Enter Email....");
      return;
    }

    try {
      setLoading(true);
      await sendDiscountEmail(email);
      toast.success("Discount email sent!");
    } catch (error) {
      toast.error("Failed to send email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="text-center mt-20">
        <div className="mt-5 text-xl text-[#504B38]">
          Subscribe Now And Get 20% Off
        </div>
        <p className="text-md text-[#504B38]">
          Join our community and enjoy exclusive deals. Limited-time offer only
          for new members!
        </p>
        <form onSubmit={OnSubmitHandler} className="flex w-full justify-center items-center">
          <input
            type="email"
            name="email"
            className="text-[#504B38] outline-none bg-transparent border-1 border-[#504B38] p-3 rounded-md mx-2 my-5"
            placeholder="Enter Your Email"
          />
          <button
          disabled={loading}
            className={`p-3 rounded-md m-2 bg-[#383528] hover:bg-[#504B38] flex flex-row gap-2 items-center text-[#F8F3D9] transition-all ${
    loading ? "opacity-50 cursor-not-allowed" : "opacity-100"
  }`}
            type="submit"
          >
            {loading ? <Loader className="w-5 animate-spin" /> : ""}
            SUBMIT
          </button>
          <ToastContainer />
        </form>
      </div>
    </div>
  );
};

export default Newsletter;
