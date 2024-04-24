import React from "react";
import { assets } from "../assets/admin_assets/assets";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-[18%] min-h-[100vh] border-[1.5px] border-solid border-[#a9a9a9] border-t-0 text-[max(1vw,10px)]">
      <div className="pt-[50px] pl-[20%] flex flex-col gap-[20px]">
        <NavLink
          to="/addproduct"
          style={{ borderRadius: "3px 0px 0px 3px" }}
          className="flex items-center gap-[12px] border border-solid border-r-0 border-[#a9a9a9] py-[8px] px-[10px] cursor-pointer "
        >
          <img src={assets.add_icon} alt="" />
          <p className="hidden sm:inline">Add Items</p>
        </NavLink>
        <NavLink
          to="/list"
          style={{ borderRadius: "3px 0px 0px 3px" }}
          className="flex items-center gap-[12px] border border-solid border-r-0 border-[#a9a9a9] py-[8px] px-[10px] cursor-pointer "
        >
          <img src={assets.order_icon} alt="" />
          <p className="hidden sm:inline">List Items</p>
        </NavLink>
        <NavLink
          to="/orders"
          style={{ borderRadius: "3px 0px 0px 3px" }}
          className="flex items-center gap-[12px] border border-solid border-r-0 border-[#a9a9a9] py-[8px] px-[10px] cursor-pointer "
        >
          <img src={assets.order_icon} alt="" />
          <p className="hidden sm:inline">Orders</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
