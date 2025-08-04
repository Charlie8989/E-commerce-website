import React from "react";
import { toast, ToastContainer } from "react-toastify";

const Newsletter = () => {
  const OnSubmitHandler = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    if (!email) {
      toast.error("Enter Email....");
      return;
    }
  };

  return (
    <div>
      <div className="text-center mt-20">
        <div className="mt-5 text-xl text-[#504B38]">
          Subscribe Now And Get 20% Off
        </div>
        <p className="text-md text-[#504B38]">
          Join our community and enjoy exclusive deals. Limited-time offer only for new members!

        </p>
        <form onSubmit={OnSubmitHandler}>
          <input
            type="email"
            name="email"
            className="text-[#504B38] outline-none bg-transparent border-1 border-[#504B38] p-3 rounded-md mx-2 my-5"
            placeholder="Enter Your Email"
          />
          <button
            className="p-3 rounded-md m-2 bg-[#383528] hover:bg-[#504B38]  text-[#F8F3D9]"
            type="submit"
          >
            SUBMIT
          </button>
          <ToastContainer />
        </form>
      </div>
    </div>
  );
};

export default Newsletter;
