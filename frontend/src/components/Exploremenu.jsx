import React from "react";
import { menu_list } from "../assets/frontend_assets/assets";

const Exploremenu = ({ category, setcategory }) => {
  return (
    <div className="flex flex-col gap-[20px]" id="explore-menu">
      <h1 className="text-[#262626] font-[500] ">Explore Our Menu</h1>
      <p className="max-w-full text-[14px] sm:text-[16px]  sm:max-w-[60%] text-[#808080]">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est dolorem
        quisquam omnis aspernatur esse nam? Ut nesciunt perspiciatis illum magni
        adipisci sunt, harum inventore aliquam at tempora assumenda.
        Consequuntur, illo.
      </p>
      <div className="flex justify-between items-center gap-[30px] text-center my-20px mx-0 overflow-x-scroll overflow-y-hidden no-scrollbar ">
        {menu_list.map((menu, index) => (
          <div
            onClick={() =>
              setcategory((prev) =>
                prev === menu.menu_name ? "All" : menu.menu_name
              )
            }
            key={index}
            className="exploreitem"
          >
            <img
              className={` ${
                category === menu.menu_name
                  ? "border-4 border-solid border-[tomato] p-[2px] "
                  : ""
              }w-[7.5vw] min-w-[80px] cursor-pointer rounded-[50%] duration-200`}
              src={menu.menu_image}
              alt={menu.name}
            />
            <p className="mt-[10px] text-[#747474] text-[max(1.4vw,16px)] cursor-pointer">
              {menu.menu_name}
            </p>
          </div>
        ))}
      </div>
      <hr className="my-[10px] mx-0 h-[2px] bg-[#747474] border-none" />
    </div>
  );
};

export default Exploremenu;
