import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import {
  signInWithRedirect,
  getRedirectResult,
  signInWithPopup,
} from "firebase/auth";
import { auth, provider } from "../firebase";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const { token, setToken, navigate, backendURL } = useContext(ShopContext);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        // console.log("Redirect result:", result);
      })
      .catch((error) => console.error("Redirect error:", error));
  }, []);

 const googleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Send to backend
    const response = await axios.post(backendURL + "/api/user/google-login", {
      email: user.email,
      name: user.displayName,
      profilePic: user.photoURL,
    });

    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }

  } catch (err) {
    console.error("Popup error:", err);
  }
};


  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (currentState === "Sign Up") {
        const response = await axios.post(backendURL + "/api/user/register", {
          email,
          password,
          name,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(backendURL + "/api/user/login", {
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      console.error(error.message);
    }
  };

  useEffect(() => {
    if (token) navigate("/");
  }, [token]);

  return (
    <>
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
      >
        <div className="inline-flex items-center gap-3 mb-2 mt-10">
          <p className="prata-regular text-3xl">{currentState}</p>
          <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
        </div>
        {currentState === "Login" ? (
          ""
        ) : (
          <input
            type="text"
            className="outline-none w-full px-3 py-2 border border-gray-500 rounded-sm"
            placeholder="Name"
            required
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        )}
        <input
          type="email"
          className="outline-none w-full px-3 py-2 border border-gray-500 rounded-sm"
          placeholder="Email"
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          type="password"
          className="outline-none w-full px-3 py-2 border border-gray-500 rounded-sm"
          placeholder="Password"
          required
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <div className="w-full flex justify-between text-sm mt-[-8px]">
          <p className="cursor-pointer">Forgot Your Password?</p>
          {currentState === "Login" ? (
            <p
              className="cursor-pointer"
              onClick={() => setCurrentState("Sign Up")}
            >
              Create Account
            </p>
          ) : (
            <p
              className="cursor-pointer"
              onClick={() => setCurrentState("Login")}
            >
              Login Here
            </p>
          )}
        </div>
        <button className="bg-black text-white font-light px-8 py-2 mt-4 w-full rounded-sm">
          {currentState === "Login" ? "Sign In" : "Sign Up"}
        </button>
      </form>
      <div className="w-[90%] sm:max-w-96 m-auto mt-3 gap-4">
        <button
          onClick={googleLogin}
          className="flex justify-center items-center w-full px-8 py-2 border border-gray-300 rounded-sm shadow-sm sm:gap-3 bg-black text-white gap-2 sm:text-md text-sm font-light"
        >
          <img
            className="w-5 h-5"
            src="https://img.icons8.com/3d-fluency/94/google-logo.png"
            alt="google-logo"
          />

          <h3>Continue With Google</h3>
        </button>
      </div>
    </>
  );
};

export default Login;
