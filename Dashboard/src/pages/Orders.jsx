import React, { useState } from "react";
import axios from "axios";
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { assets } from "../assets/admin_assets/assets";
import { URL } from "../URL";
const Orders = () => {
  const [orders, setorders] = useState([]);
  const [status, setstatus] = useState("Food Processing");

  const query = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const { data } = await axios.get(`${URL}/api/order/getOrders`, {
        withCredentials: true,
      });
      setorders(data.orders);
      return data;
    },
  });

  const { isLoading, isError, data, error } = query;

  const statusMutation = useMutation({
    mutationFn: async (orderId) => {
      const { data } = await axios.post(
        `${URL}/api/order/updatestatus`,
        { orderId, status },
        { withCredentials: true },
        { headers: { "Content-Type": "application/json" } }
      );
      return data;
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
    onSuccess: (data) => {
      toast.success(data.message);
      query.refetch();
    },
  });

  console.log(status);

  function handleChnage(e, id) {
    setstatus(e.target.value);
    statusMutation.mutate(id);
  }

  return (
    <div className="add max-w-[80%] mx-auto">
      <h3>All Orders</h3>
      <div className="list">
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error: {error.message}</p>}
        {orders &&
          orders.map((order) => (
            <div
              style={{ gridTemplateColumns: "1fr 2fr 1fr" }}
              className="grid text-[12px] md:grid-cols-5 m-[10px] sm:gap-[30px] items-start border border-solid py-[15px] px-[4px] border-[tomato] sm:mx-[20px] sm:my-[30px] sm:text-[14px] text-[#505050]"
              key={order._id}
            >
              <img
                className="w-[60px] sm:w-[80px]"
                src={assets.parcel_icon}
                alt=""
              />
              <div>
                <p className="font-[600]">
                  {order.items.map((item, index) => {
                    if (index === order.items.length - 1) {
                      return item.name + " x " + item.quantity;
                    } else {
                      return item.name + " x " + item.quantity + ", ";
                    }
                  })}
                </p>
                <p className="font-[600] mt-[30px] mb-[5px] ">
                  {order.address.name}
                </p>
                <div className="mb-[10px]">
                  <p>{order.address.street + ","}</p>
                  <p>
                    {order.address.city +
                      ", " +
                      order.address.state +
                      ", " +
                      order.address.country +
                      ", " +
                      order.address.zipcode}
                  </p>
                </div>
                <p>{order.address.phone}</p>
              </div>
              <p>Items: {order.items.length}</p>
              <p>${order.amount}</p>
              <select
                value={order.status}
                onChange={(e) => handleChnage(e, order._id)}
                className="bg-[#ffe8e4] border border-solid border-[tomato] w-[max(10vw,120px)] p-[5px] text-[12px] sm:p-[10px] outline-none "
              >
                <option value="Food Processing">Food Processing</option>
                <option value="Out for delievery">Out for delievery</option>
                <option value="Delievered">Delievered</option>
              </select>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Orders;
