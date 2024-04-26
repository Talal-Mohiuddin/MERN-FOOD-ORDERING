import React, { useState } from "react";
import { assets } from "../assets/admin_assets/assets";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useStore } from "../context/storeContext";

const Sidebar = () => {
  const [active, setactive] = useState();
  const navigate = useNavigate();
  const { user, setuser } = useStore();

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const {data} = await axios.get(
        "http://localhost:3000/api/user/admin-logout",
        { withCredentials: true }
      );

      return data;
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
    onSuccess: (data) => {
      toast.success(data.message);
      localStorage.removeItem("admin");
      setuser(null);
      navigate("/dashboard");
    },
  });

  const handlelogout = () => {
    logoutMutation.mutate();
  };

  return (
    <div className="w-[18%] min-h-[100vh] border-[1.5px] border-solid border-[#a9a9a9] border-t-0 text-[max(1vw,10px)]">
      <div className="pt-[50px] pl-[20%] flex flex-col gap-[20px]">
        <Link
          to="/addproduct"
          onClick={() => setactive("addproduct")}
          style={{ borderRadius: "3px 0px 0px 3px" }}
          className={`"flex items-center gap-[12px] border border-solid border-r-0 border-[#a9a9a9] py-[8px] px-[10px] cursor-pointer" ${
            active === "addproduct" ? "bg-[#fff0ed] border-[tomato]" : ""
          } `}
        >
          <img src={assets.add_icon} alt="" />
          <p className="hidden sm:inline">Add Items</p>
        </Link>
        <Link
          to="/list"
          onClick={() => setactive("list")}
          style={{ borderRadius: "3px 0px 0px 3px" }}
          className={`"flex items-center gap-[12px] border border-solid border-r-0 border-[#a9a9a9] py-[8px] px-[10px] cursor-pointer" ${
            active === "list" ? "bg-[#fff0ed] border-[tomato]" : ""
          } `}
        >
          <img src={assets.order_icon} alt="" />
          <p className="hidden sm:inline">List Items</p>
        </Link>
        <Link
          to="/orders"
          onClick={() => setactive("orders")}
          style={{ borderRadius: "3px 0px 0px 3px" }}
          className={`"flex items-center gap-[12px] border border-solid border-r-0 border-[#a9a9a9] py-[8px] px-[10px] cursor-pointer" ${
            active === "orders" ? "bg-[#fff0ed] border-[tomato]" : ""
          } `}
        >
          <img src={assets.order_icon} alt="" />
          <p className="hidden sm:inline">Orders</p>
        </Link>
        <div
          onClick={handlelogout}
          style={{ borderRadius: "3px 0px 0px 3px" }}
          className={`"flex items-center gap-[12px] border border-solid border-r-0 border-[#a9a9a9] py-[8px] px-[10px] cursor-pointer cursor-pointer"`}
        >
          <img className="w-[55px] ml-[-10px]" src={assets.logout} alt="" />
          <p className="hidden sm:inline">Logout</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
