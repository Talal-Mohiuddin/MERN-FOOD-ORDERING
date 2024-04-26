import React, { useEffect, useState } from "react";
import { useStore } from "../context/storeContext";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { URL } from "../URL";

const Placeorder = () => {
  const { cartTotal, foodlist, cartItem, user } = useStore();
  const [data, setdata] = useState({
    name: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });
  const navigate = useNavigate();

  function handleChnage(e) {
    setdata({ ...data, [e.target.id]: e.target.value });
  }

  const orderMutation = useMutation({
    mutationFn: async (orderData) => {
      const { data } = await axios.post(
        `${URL}/api/order/place`,
        orderData,
        {
          withCredentials: true,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return data;
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
    onSuccess: (data) => {
      window.location.replace(data.session_url);
    },
  });

  function placeOrder(e) {
    e.preventDefault();
    if (
      !data.name ||
      !data.email ||
      !data.street ||
      !data.city ||
      !data.state ||
      !data.zipcode ||
      !data.country ||
      !data.phone
    ) {
      toast.error("Please fill all the fields");
    }
    let orderItems = [];
    foodlist.forEach((food) => {
      if (cartItem[food._id] > 0) {
        let itemInfo = food;
        itemInfo["quantity"] = cartItem[food._id];
        orderItems.push(itemInfo);
      }
    });
    let orderData = {
      address: data,
      items: orderItems,
      amount: cartTotal() + 2,
    };
    orderMutation.mutate(orderData);
  }

  useEffect(() => {
    if (!user || cartTotal() === 0) {
      navigate("/cart");
    }
  }, []);

  return (
    <form
      onSubmit={placeOrder}
      className="flex items-start justify-between gap-[50px] mt-[100px]"
    >
      <div className="w-full max-w-[max(30%,500px)]">
        <p className="text-[30px] font-[600] mb-[50px]">
          Delievery Information
        </p>
        <div>
          <input
            className="mb-[15px] w-full p-[10px] border border-solid border-[#c5c5c5] rounded-[4px] outline-[tomato]"
            type="text"
            id="name"
            placeholder="name"
            onChange={handleChnage}
            value={data.name}
          />
        </div>

        <input
          className="mb-[15px] w-full p-[10px] border border-solid border-[#c5c5c5] rounded-[4px] outline-[tomato]"
          type="email"
          id="email"
          placeholder="email"
          onChange={handleChnage}
          value={data.email}
        />

        <input
          className="mb-[15px] w-full p-[10px] border border-solid border-[#c5c5c5] rounded-[4px] outline-[tomato]"
          type="text"
          id="street"
          placeholder="street"
          onChange={handleChnage}
          value={data.street}
        />
        <div className="flex gap-[10px]">
          <input
            className="mb-[15px] w-full p-[10px] border border-solid border-[#c5c5c5] rounded-[4px] outline-[tomato]"
            type="text"
            id="city"
            placeholder="city"
            onChange={handleChnage}
            value={data.city}
          />

          <input
            className="mb-[15px] w-full p-[10px] border border-solid border-[#c5c5c5] rounded-[4px] outline-[tomato]"
            type="text"
            id="state"
            placeholder="state"
            onChange={handleChnage}
            value={data.state}
          />
        </div>
        <div className="flex gap-[10px]">
          <input
            className="mb-[15px] w-full p-[10px] border border-solid border-[#c5c5c5] rounded-[4px] outline-[tomato]"
            type="text"
            id="zipcode"
            placeholder="Zip code"
            onChange={handleChnage}
            value={data.zipcode}
          />

          <input
            className="mb-[15px] w-full p-[10px] border border-solid border-[#c5c5c5] rounded-[4px] outline-[tomato]"
            type="text"
            id="country"
            placeholder="country"
            onChange={handleChnage}
            value={data.country}
          />
        </div>

        <input
          className="mb-[15px] w-full p-[10px] border border-solid border-[#c5c5c5] rounded-[4px] outline-[tomato]"
          type="text"
          id="phone"
          placeholder="phone"
          onChange={handleChnage}
          value={data.phone}
        />
      </div>
      <div className="w-full max-w-[max(40%,500px)]">
        <div className="flex-1 flex flex-col gap-[20px]">
          <h2>Cart Total</h2>
          <div>
            <div className="flex justify-between text-[#555]">
              <p>Subtotal</p>
              <p>${cartTotal()}</p>
            </div>
            <hr className="my-[10px]" />
            <div className="flex justify-between text-[#555]">
              <p>Delivery fee</p>
              {cartTotal() > 0 ? <p>${2}</p> : <p>0</p>}
            </div>
            <hr className="my-[10px]" />
            <div className="flex justify-between text-[#555]">
              <b>Total</b>
              {cartTotal() > 0 ? <b>${cartTotal() + 2}</b> : <b>0</b>}
            </div>
          </div>
          <button
            type="submit"
            className="border-none bg-[tomato]   w-[max(15vs,200px)] text-white py-[12px] cursor-pointer mt-[30px] rounded-[12px] "
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </form>
  );
};

export default Placeorder;
