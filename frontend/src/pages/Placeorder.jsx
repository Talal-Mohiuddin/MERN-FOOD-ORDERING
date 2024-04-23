import React from "react";
import { useStore } from "../context/storeContext";

const Placeorder = () => {
  const { cartTotal } = useStore();
  return (
    <form className="flex items-start justify-between gap-[50px] mt-[100px]">
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
          />
        </div>

        <input
          className="mb-[15px] w-full p-[10px] border border-solid border-[#c5c5c5] rounded-[4px] outline-[tomato]"
          type="email"
          id="email"
          placeholder="email"
        />

        <input
          className="mb-[15px] w-full p-[10px] border border-solid border-[#c5c5c5] rounded-[4px] outline-[tomato]"
          type="text"
          id="address"
          placeholder="address"
        />
        <div className="flex gap-[10px]">
          <input
            className="mb-[15px] w-full p-[10px] border border-solid border-[#c5c5c5] rounded-[4px] outline-[tomato]"
            type="text"
            id="city"
            placeholder="city"
          />

          <input
            className="mb-[15px] w-full p-[10px] border border-solid border-[#c5c5c5] rounded-[4px] outline-[tomato]"
            type="text"
            id="state"
            placeholder="state"
          />
        </div>
        <div className="flex gap-[10px]">
          <input
            className="mb-[15px] w-full p-[10px] border border-solid border-[#c5c5c5] rounded-[4px] outline-[tomato]"
            type="text"
            id="zipcode"
            placeholder="Zip code"
          />

          <input
            className="mb-[15px] w-full p-[10px] border border-solid border-[#c5c5c5] rounded-[4px] outline-[tomato]"
            type="text"
            id="country"
            placeholder="country"
          />
        </div>

        <input
          className="mb-[15px] w-full p-[10px] border border-solid border-[#c5c5c5] rounded-[4px] outline-[tomato]"
          type="text"
          id="phone"
          placeholder="phone"
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
          <button className="border-none bg-[tomato]       w-[max(15vs,200px)] text-white py-[12px] cursor-pointer mt-[30px] rounded-[12px] ">
            Proceed to Payment
          </button>
        </div>
      </div>
    </form>
  );
};

export default Placeorder;
