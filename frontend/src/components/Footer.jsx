import React from "react";
import { assets } from "../assets/frontend_assets/assets";

const Footer = () => {
  return (
    <>
      <div
        className="text-[#d9d9d9] flex flex-col sm:flex-row bg-[#323232] items-center gap-[20px] py-[20px] px-[8vw] pt-[80px] mt-[100px]"
        id="footer"
      >
        <div
          style={{ gridTemplateColumns: "2fr 1fr 1fr" }}
          className="w-full gap-4 sm:grid flex flex-col sm:gap-[80px]"
        >
          <div className="flex flex-col items-start gap-[20px]">
            <img src={assets.logo} alt="" />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque
              quaerat quas id eaque voluptatibus saepe ullam a nihil, laborum
              aliquam fuga adipisci unde ipsa expedita porro repellat enim?
              Numquam, esse.
            </p>
            <div className="flex">
              <img
                className="w-[40px] mr-[15px]"
                src={assets.facebook_icon}
                alt=""
              />
              <img
                className="w-[40px] mr-[15px]"
                src={assets.twitter_icon}
                alt=""
              />
              <img
                className="w-[40px] mr-[15px]"
                src={assets.linkedin_icon}
                alt=""
              />
            </div>
          </div>
          <div className="flex flex-col items-start gap-[20px]">
            <h2 className="text-white font-bold text-xl">COMPANY</h2>
            <ul className="list-none mb-[10px]">
              <li className="cursor-pointer">Home</li>
              <li className="cursor-pointer">About Us</li>
              <li className="cursor-pointer">Delievery</li>
              <li className="cursor-pointer">Privacy policy</li>
            </ul>
          </div>
          <div className="flex flex-col items-start gap-[20px]">
            <h2 className="text-white font-bold text-xl">Get In Touch</h2>
            <ul className="list-none mb-[10px]">
              <li className="cursor-pointer">+1-222-333-444</li>
              <li className="cursor-pointer">contact@gmail.com</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
