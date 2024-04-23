import React from "react";

const Header = () => {
  const headerBackground = {
    background: "url(./header_img.png)",
    backgroundSize: "contain",
    position: "relative",
  };
  return (
    <div style={headerBackground} className="h-[34vw] my-[30px]">
      <div
        className="absolute flex flex-col items-start gap-[1.5vw] max-w-[65%] sm:max-w-[50%] bottom-[10%] left-[6vw] "
        style={{ animation: "fadeIn 1s ease-in" }}
      >
        <h2 className="font-[500] text-[max(3.5vw,22px)] text-white">
          Order Your Favourite Food Here
        </h2>
        <p className="text-white hidden sm:block text-[1vw]">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Natus libero
          dignissimos modi asperiores distinctio, possimus neque. Laudantium
          saepe itaque architecto, possimus rem reprehenderit voluptate alias
          illum? Amet obcaecati nobis tenetur.
        </p>
        <button className="border-none text-[#747474] font-[500] py-[2vw] px-[4vw] sm:py-[1vw] sm:px-[2.3vw] bg-white rounded-[50px] text-[max(1vw,13px)] ">
          View Menu
        </button>
      </div>
    </div>
  );
};

export default Header;
