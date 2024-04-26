import React, { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { assets } from "../assets/frontend_assets/assets";

const Myorders = () => {
  const [data, setdata] = useState([]);

  const query = useQuery({
    queryKey: ["myorders"],
    queryFn: async () => {
      const { data } = await axios.get(
        "http://localhost:3000/api/order/userorders",
        {
          withCredentials: true,
        }
      );
      setdata(data.orders);
      return data;
    },
  });

  return (
    <div className="my-[50px]">
      <h2>My Orders</h2>
      <div className="flex flex-col gap-[20px] mt-[30px]">
        {data.map((order, index) => (
          <div
            key={index}
            className="grid items-center gap-[5px] sm:gap-[30px]  text-[14px] py-[10px] px-[20px] text-[#454545] border border-solid border-[tomato] grid-cols-3 md:grid-cols-6"
          >
            <img className="w-[50px]" src={assets.parcel_icon} alt="" />
            <p>
              {order.items.map((item, index) => {
                if (index === order.items.length - 1) {
                  return item.name + " x " + item.quantity;
                } else {
                  return item.name + " x " + item.quantity + " , ";
                }
              })}
            </p>
            <p>${order.amount}</p>
            <p>Items:{order.items.length}</p>
            <p>
              <span className="text-[tomato]">&#x25cf;</span>
              <b className="font-[500] text-[#454545]">{order.status}</b>
            </p>
            <button className="border-none py-[12px] rounded-[4px] bg-[#ffe1e1] cursor-pointer text-[#454545] text-[10px] sm:text-[14px] ">
              Track Order
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Myorders;
