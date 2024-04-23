import React, { useState } from "react";
import { assets } from "../assets/frontend_assets/assets";
import { Link } from "react-router-dom";
import { useStore } from "../context/storeContext";

const Navbar = ({ setshowLogin }) => {
  const [menu, setmenu] = useState("home");
  const { cartTotal } = useStore();
  return (
    <div className=" py-[20px] px-0 flex  justify-between items-center">
      <Link to="/">
        <img src={assets.logo} className="w-[140px] sm:w-[150px]" alt="" />
      </Link>
      <ul className="hidden  sm:flex list-none gap-[20px] text-[#49557e] text-[17px]  sm:text-[18px]">
        <Link
          to="/"
          onClick={() => setmenu("home")}
          className={`${
            menu === "home"
              ? "pb-[2px] border-b-2 border-solid border-[#49557e]"
              : ""
          } cursor-pointer `}
        >
          Home
        </Link>
        <a
          href="#explore-menu"
          onClick={() => setmenu("menu")}
          className={`${
            menu === "menu"
              ? "pb-[2px] border-b-2 border-solid border-[#49557e]"
              : ""
          } cursor-pointer `}
        >
          Menu
        </a>
        <a
          href="#footer"
          onClick={() => setmenu("contact-us")}
          className={`${
            menu === "contact-us"
              ? "pb-[2px] border-b-2 border-solid border-[#49557e]"
              : ""
          } cursor-pointer `}
        >
          Contact us
        </a>
      </ul>
      <div className="flex items-center gap-[30px] sm:gap-[40px]">
        <img className="w-[20px] sm:w-auto" src={assets.search_icon} alt="" />
        <div className="relative">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="" />
          </Link>
          <div
            className={`${
              cartTotal() === 0
                ? ""
                : "absolute min-w-[10px] min-h-[10px] bg-[tomato] rounded-[5px] top-[-8px] right-[-8px]"
            }`}
          ></div>
        </div>
        <button
          onClick={() => setshowLogin((prev) => !prev)}
          className="bg-transparent text-[14px] sm:text-[16px] text-[#49557e] border border-solid border-[tomato] py-[7px] px-[20px] sm:py-[10px] sm:px-[30px] rounded-[50px] cursor-pointer hover:bg-[#fff4f2] duration-150  "
        >
          Sign in
        </button>
      </div>
    </div>
  );
};

export default Navbar;
