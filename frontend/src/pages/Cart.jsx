import React from "react";
import { useStore } from "../context/storeContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { foodlist, removeFromCart, cartItem, cartTotal } = useStore();

  const navigate= useNavigate();
  return (
    <div className="mt-[100px]">
      <div className="cart-items">
        <div
          style={{ gridTemplateColumns: "1fr 1.5fr 1fr 1fr 1fr 0.5fr" }}
          className="grid items-center text-gray-800 text-[max(1vw,12px)] "
        >
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr className="h-[1px] bg-[#e2e2e2] border-none" />
        {foodlist.map((food, index) => {
          if (cartItem[food._id] > 0) {
            return (
              <>
                <div
                  key={index}
                  style={{ gridTemplateColumns: "1fr 1.5fr 1fr 1fr 1fr 0.5fr" }}
                  className="grid items-center text-[max(1vw,12px)] my-[10px] text-black "
                >
                  <img className="w-[50px]" src={food.image} alt={food.name} />
                  <p>{food.name}</p>
                  <p>${food.price}</p>
                  <p>{cartItem[food._id]}</p>
                  <p>{food.price * cartItem[food._id]}</p>
                  <button
                    className="cursor-pointer"
                    onClick={() => removeFromCart(food._id)}
                  >
                    X
                  </button>
                </div>
                <hr className="h-[1px] bg-[#e2e2e2]border-none" />
              </>
            );
          }
        })}
      </div>
      <div className="mt-[80px] flex flex-col-reverse  sm:flex-row justify-between gap-[max(12vw,20px)]">
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
          <button onClick={()=>{navigate('/order')}} className="border-none bg-[tomato] w-[max(15vs,200px)] text-white py-[12px] cursor-pointer rounded-[12px] ">
            Proceed to checkout
          </button>
        </div>
        <div className=" flex-1 justify-start  ">
          <div className="">
            <p className="text-[#555]">Enter Your Promo Code</p>
            <div className="mt-[10px] flex justify-between items-center bg-[#eaeaea]  rounded-[4px]">
              <input
                className="bg-transparent outline-none border-none pl-[10px]"
                type="text"
                placeholder="Promo Code"
              />
              <button className="w-[max(10vw,150px)] py-[12px] px-[5px] bg-black text-white rounded-[4px] border-none">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
