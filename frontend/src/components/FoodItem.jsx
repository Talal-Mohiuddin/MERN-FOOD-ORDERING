import React from "react";
import { assets } from "../assets/frontend_assets/assets";
import { useStore } from "../context/storeContext";

const FoodItem = ({ foodObj }) => {
  const { removeFromCart, addToCart, cartItem } = useStore();

  const { _id: id, name, image, price, description } = foodObj;
  return (
    <div
      style={{ animation: "fadeIn 1s" }}
      className="w-[100%] m-auto rounded-[15px] shadow-lg duration-300"
    >
      <div className="relative">
        <img className="w-full rounded-t-[15px]" src={image} alt={name} />
        {!cartItem[id] && (
          <img
            className="w-[35px] absolute bottom-[15px] right-[15px] cursor-pointer rounded-full"
            onClick={() => addToCart(id)}
            src={assets.add_icon_white}
          />
        )}
        {cartItem[id] > 0 && (
          <div className="absolute bottom-[15px] right-[15px] flex gap-[10px] items-center p-[6px] rounded-full bg-white">
            <img
              className="w-[30px]"
              onClick={() => removeFromCart(id)}
              src={assets.remove_icon_red}
              alt=""
            />
            <p>{cartItem[id]}</p>
            <img
              className="w-[30px]"
              onClick={() => addToCart(id)}
              src={assets.add_icon_green}
              alt=""
            />
          </div>
        )}
      </div>
      <div className="p-[20px] ">
        <div className="flex justify-between items-center mb-[10px]">
          <p className="text-[20px] font-[500]">{name}</p>
          <img className="w-[70px]" src={assets.rating_starts} alt="" />
        </div>
        <p className="text-[#676767] text-[12px]">{description}</p>
        <p className="text-[tomato] text-[22px] font-[500] my-[10px]">
          {price}
        </p>
      </div>
    </div>
  );
};

export default FoodItem;
