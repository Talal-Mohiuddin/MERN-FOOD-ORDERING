import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { URL } from "../URL";
const StoreContext = createContext();

const ContextProvider = ({ children }) => {
  const [foodlist, setFoodlist] = useState();
  const [cartItem, setcartItem] = useState({});
  const [user, setuser] = useState(null);

  const { data } = useQuery({
    queryKey: ["foodlist"],
    queryFn: async () => {
      const { data } = await axios.get(`${URL}/api/food/listfood`, {
        withCredentials: true,
      });
      setFoodlist(data.foods);
      return data;
    },
  });

  async function addToCart(itemId) {
    if (cartItem[itemId]) {
      setcartItem({ ...cartItem, [itemId]: cartItem[itemId] + 1 });
    } else {
      setcartItem({ ...cartItem, [itemId]: 1 });
    }
    if (user) {
      await axios
        .post(
          `${URL}/api/cart/addtocart`,
          {
            itemId: itemId,
          },
          {
            withCredentials: true,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          toast.success(res.data.message);
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    }
  }

  async function removeFromCart(itemId) {
    if (!cartItem[itemId]) {
      return;
    } else {
      setcartItem({ ...cartItem, [itemId]: cartItem[itemId] - 1 });
    }
    if (user) {
      await axios
        .post(
          `${URL}/api/cart/removefromcart`,
          {
            itemId: itemId,
          },
          {
            withCredentials: true,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          toast.success(res.data.message);
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    }
  }

  const getcart = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const { data } = await axios.get(`${URL}/api/cart/getcart`, {
        withCredentials: true,
      });
      setcartItem(data.cartData);
      return data;
    },
  });

  function cartTotal() {
    let total = 0;
    for (let key in cartItem) {
      if (cartItem[key] > 0) {
        let iteminfo = foodlist?.find((item) => item._id === key);
        total += iteminfo.price * cartItem[key];
      }
    }
    return total;
  }

  return (
    <StoreContext.Provider
      value={{
        foodlist,
        removeFromCart,
        addToCart,
        cartItem,
        setcartItem,
        cartTotal,
        user,
        setuser,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

const useStore = () => {
  return useContext(StoreContext);
};

export { ContextProvider, useStore };
