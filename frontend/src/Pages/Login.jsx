import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import axios from "axios";
const Login = () => {
  const{token,setToken,navigate,backendUrl}=useContext(ShopContext)
  const [currState, setCurrState] = useState("Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

const onSubmitHandler = async (e) => {
  e.preventDefault();

  try {
    let response;

    if (currState === "Sign Up") {
      response = await axios.post(
        backendUrl + "/api/user/register",
        { name, email, password }
      );
    } else {
      response = await axios.post(
        backendUrl + "/api/user/login",
        { email, password }
      );
    }

    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);

      //  use backend message
      toast.success(response.data.message);

      navigate("/");
    }

  } catch (e) {
    //  show backend error message
    toast.error(e.response?.data?.message || "Server error ");
  }
};







  return (
    <section className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-purple-100 to-slate-100">
      
      <div className="w-[90%] max-w-md bg-white shadow-2xl rounded-2xl p-8">
        
        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-6">
          {currState === "Reset" ? "Reset Password" : currState}
        </h2>

        <form onSubmit={onSubmitHandler} className="flex flex-col gap-4">
          
          {/* Name (Sign Up only) */}
          {currState === "Sign Up" && (
            <div>
              <label className="text-sm font-medium">Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full mt-1 px-3 py-2 rounded-lg bg-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>
          )}

          {/* Email (All states) */}
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 px-3 py-2 rounded-lg bg-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          {/* Password (Not in Reset) */}
          {currState !== "Reset" && (
            <div>
              <label className="text-sm font-medium">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-1 px-3 py-2 rounded-lg bg-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>
          )}

          {/* Button */}
          <button className="bg-purple-600 text-white py-2 rounded-lg mt-2 hover:bg-purple-700 transition">
            {currState === "Login" && "Login"}
            {currState === "Sign Up" && "Create Account"}
            {currState === "Reset" && "Send Reset Link"}
          </button>
        </form>

        {/* Forgot Password (only login) */}
        {currState === "Login" && (
          <p
            onClick={() => setCurrState("Reset")}
            className="text-sm text-right mt-2 text-purple-600 cursor-pointer"
          >
            Forgot Password?
          </p>
        )}

        {/* Toggle */}
        <p className="text-sm text-center mt-5">
          {currState === "Login" && (
            <>
              Don’t have an account?{" "}
              <span
                onClick={() => setCurrState("Sign Up")}
                className="text-purple-600 font-semibold cursor-pointer"
              >
                Sign Up
              </span>
            </>
          )}

          {currState === "Sign Up" && (
            <>
              Already have an account?{" "}
              <span
                onClick={() => setCurrState("Login")}
                className="text-purple-600 font-semibold cursor-pointer"
              >
                Login
              </span>
            </>
          )}

          {currState === "Reset" && (
            <>
              Remember your password?{" "}
              <span
                onClick={() => setCurrState("Login")}
                className="text-purple-600 font-semibold cursor-pointer"
              >
                Back to Login
              </span>
            </>
          )}
        </p>
      </div>
    </section>
  );
};

export default Login;