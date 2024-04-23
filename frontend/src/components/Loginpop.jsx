import React, { useState } from "react";
import { assets } from "../assets/frontend_assets/assets";

const Loginpop = ({ setshowLogin }) => {
  const [currentState, setcurrentState] = useState("Sign Up");
  return (
    <div className="absolute z-10 w-full h-full bg-[#00000090] grid">
      <form
        style={{ animation: "fadeIn 0.5s" }}
        className="place-self-center w-[max(23vw,330px)] text-[#808080] bg-white flex flex-col gap-[25px] py-[25px] px-[30px] text-[14px] rounded-[8px] "
      >
        <div className="flex justify-between items-center text-[black] text-xl font-bold">
          <h2>{currentState}</h2>
          <img
            className="w-[16px] cursor-pointer"
            onClick={() => setshowLogin((prev) => !prev)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="flex flex-col gap-[20px]">
          {currentState === "Sign Up" && (
            <>
              <label htmlFor="name">Name</label>
              <input
                className="outline-none border border-solid border-[#c9c9c9] p-[10px] rounded-[4px]"
                type="text"
                id="name"
                required
              />
            </>
          )}

          <label htmlFor="email">Email</label>
          <input
            className="outline-none border border-solid border-[#c9c9c9] p-[10px] rounded-[4px]"
            type="email"
            id="email"
            required
          />
          <label htmlFor="password">Password</label>
          <input
            className="outline-none border border-solid border-[#c9c9c9] p-[10px] rounded-[4px]"
            type="password"
            id="password"
            required
          />
        </div>
        <button className="border-none p-[10px] rounded-[4px] text-white bg-[tomato] text-[15px] cursor-pointer">
          {currentState === "Sign Up" ? "Create Account" : "Login"}
        </button>
        <div className="flex items-center gap-[8px] mt-[-15px]">
          <input type="checkbox" required />
          <p> I agree with the Policy</p>
        </div>
        {currentState === "Login" && (
          <p>
            Create a new account
            <span
              className="text-[tomato] font-[500] cursor-pointer"
              onClick={() => setcurrentState("Sign Up")}
            >
              {" "}
              Click here
            </span>
          </p>
        )}
        {currentState === "Sign Up" && (
          <p>
            Already have an account
            <span
              className="text-[tomato] font-[500] cursor-pointer"
              onClick={() => setcurrentState("Login")}
            >
              {" "}
              Login here
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default Loginpop;
