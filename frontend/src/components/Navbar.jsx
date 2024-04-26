import React, { useState } from "react";
import { assets } from "../assets/frontend_assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "../context/storeContext";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { URL } from "../URL";

const Navbar = ({ setshowLogin }) => {
  const [menu, setmenu] = useState("home");
  const { user, setuser } = useStore();
  const { cartTotal } = useStore();
  const navigate = useNavigate();

  const mutationLogout = useMutation({
    mutationFn: async () => {
      const { data } = await axios.get(`${URL}/api/user/logout`, {
        withCredentials: true,
      });
      return data;
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
    onSuccess: (data) => {
      toast.success(data.message);
      setuser(null);
      localStorage.removeItem("user");
    },
  });

  function handleLogout() {
    mutationLogout.mutate();
  }

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
        {!user ? (
          <button
            onClick={() => setshowLogin((prev) => !prev)}
            className="bg-transparent text-[14px] sm:text-[16px] text-[#49557e] border border-solid border-[tomato] py-[7px] px-[20px] sm:py-[10px] sm:px-[30px] rounded-[50px] cursor-pointer hover:bg-[#fff4f2] duration-150"
          >
            Sign in
          </button>
        ) : (
          <div className="relative group ">
            <img src={assets.profile_icon} alt="" />
            <ul
              className="absolute hidden right-0 z-10
            group-hover:flex flex-col gap-[10px] bg-[#fff2ef] py-[12px] px-[15px] rounded-[5px] 
            border border-solid border-[tomato] outline-2 outline-solid outline-white min-w-[150px]
            "
            >
              <li
                onClick={() => navigate("/myorders")}
                className="flex items-center gap-[10px] cursor-pointer hover:text-[tomato]"
              >
                <img className="w-[20px]" src={assets.bag_icon} alt="" />
                <p>Orders</p>
              </li>
              <hr />
              <li
                onClick={handleLogout}
                className="flex items-center gap-[10px] cursor-pointer hover:text-[tomato]"
              >
                <img className="w-[20px]" src={assets.logout_icon} alt="" />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
