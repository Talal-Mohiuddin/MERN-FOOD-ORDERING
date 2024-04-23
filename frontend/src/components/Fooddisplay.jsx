import React from "react";
import { useStore } from "../context/storeContext";
import FoodItem from "./FoodItem";

const Fooddisplay = ({ category }) => {
  const { foodlist } = useStore();

  return (
    <div className="mt-[30px]" id="food-display">
      <h2 className="text-[max(2vw,24px)] font-[600] ">Top Dishes near you</h2>
      <div
        className="grid gap-[30px] gap-y-[50px] "
        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(240px,1fr))" }}
      >
        {foodlist &&
          foodlist.map((food, index) => {
            if (category === "All" || category === food.category)
              return <FoodItem key={index} foodObj={food} />;
          })}
      </div>
    </div>
  );
};

export default Fooddisplay;
