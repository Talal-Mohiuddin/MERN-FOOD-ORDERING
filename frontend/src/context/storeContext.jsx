import React, { createContext, useContext, useEffect, useState } from "react";
import { food_list } from "../assets/frontend_assets/assets";

const StoreContext = createContext();

const ContextProvider = ({ children }) => {
  const [foodlist, setFoodlist] = useState(food_list);
  const [cartItem, setcartItem] = useState({});

  function addToCart(itemId) {
    if (cartItem[itemId]) {
      setcartItem({ ...cartItem, [itemId]: cartItem[itemId] + 1 });
    } else {
      setcartItem({ ...cartItem, [itemId]: 1 });
    }
  }

  function removeFromCart(itemId) {
    if (!cartItem[itemId]) {
      return;
    } else {
      setcartItem({ ...cartItem, [itemId]: cartItem[itemId] - 1 });
    }
  }

  return (
    <StoreContext.Provider
      value={{ foodlist, removeFromCart, addToCart, cartItem, setcartItem }}
    >
      {children}
    </StoreContext.Provider>
  );
};

const useStore = () => {
  return useContext(StoreContext);
};

export { ContextProvider, useStore };
