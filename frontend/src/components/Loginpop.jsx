import React, { useState } from "react";
import { assets } from "../assets/frontend_assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { useStore } from "../context/storeContext";
import { URL } from "../URL";

const Loginpop = ({ setshowLogin }) => {
  const [currentState, setcurrentState] = useState("Login");
  const [formData, setformData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { setuser } = useStore();

  const onchangeHandler = (e) => {
    setformData({ ...formData, [e.target.id]: e.target.value });
  };

  const mutationRegister = useMutation({
    mutationFn: async (form) => {
      const { data } = await axios.post(
        `${URL}/api/user/register`,
        form,
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
    onSuccess: (data) => {
      toast.success(data.message);
      const loginForm = new FormData();
      loginForm.append("email", formData.email);
      loginForm.append("password", formData.password);
      mutationLogin.mutate(loginForm);
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  const mutationLogin = useMutation({
    mutationFn: async (form) => {
      const { data } = await axios.post(
        `${URL}/api/user/login`,
        form,
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
    onSuccess: (data) => {
      toast.success(data.message);
      setuser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));
      setformData({
        name: "",
        email: "",
        password: "",
      });
      setshowLogin(false);
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  function hadleSubmit(e) {
    e.preventDefault();
    if (currentState === "Sign Up") {
      const form = new FormData();
      form.append("name", formData.name);
      form.append("email", formData.email);
      form.append("password", formData.password);
      mutationRegister.mutate(form);
    } else {
      const form = new FormData();
      form.append("email", formData.email);
      form.append("password", formData.password);
      mutationLogin.mutate(form);
    }
  }

  return (
    <div className="absolute z-10 w-full h-full bg-[#00000090] grid">
      <form
        onSubmit={hadleSubmit}
        style={{ animation: "fadeIn 0.5s" }}
        className="place-self-center w-[max(23vw,330px)] text-[#808080] bg-white flex flex-col gap-[25px] py-[25px] px-[30px] text-[14px] rounded-[8px] "
      >
        <div className="flex justify-between items-center text-[black] text-xl font-bold">
          <h2>{currentState}</h2>
          <img
            className="w-[16px] cursor-pointer"
            onClick={() => setshowLogin((prev) => !prev)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="flex flex-col gap-[20px]">
          {currentState === "Sign Up" && (
            <>
              <label htmlFor="name">Name</label>
              <input
                className="outline-none border border-solid border-[#c9c9c9] p-[10px] rounded-[4px]"
                type="text"
                id="name"
                required
                onChange={onchangeHandler}
                value={formData.name}
              />
            </>
          )}

          <label htmlFor="email">Email</label>
          <input
            className="outline-none border border-solid border-[#c9c9c9] p-[10px] rounded-[4px]"
            type="email"
            id="email"
            required
            onChange={onchangeHandler}
            value={formData.email}
          />
          <label htmlFor="password">Password</label>
          <input
            className="outline-none border border-solid border-[#c9c9c9] p-[10px] rounded-[4px]"
            type="password"
            id="password"
            required
            onChange={onchangeHandler}
            value={formData.password}
          />
        </div>
        <button className="border-none p-[10px] rounded-[4px] text-white bg-[tomato] text-[15px] cursor-pointer">
          {currentState === "Sign Up" ? "Create Account" : "Login"}
        </button>
        <div className="flex items-center gap-[8px] mt-[-15px]">
          <input type="checkbox" required />
          <p> I agree with the Policy</p>
        </div>
        {currentState === "Login" && (
          <p>
            Create a new account
            <span
              className="text-[tomato] font-[500] cursor-pointer"
              onClick={() => setcurrentState("Sign Up")}
            >
              {" "}
              Click here
            </span>
          </p>
        )}
        {currentState === "Sign Up" && (
          <p>
            Already have an account
            <span
              className="text-[tomato] font-[500] cursor-pointer"
              onClick={() => setcurrentState("Login")}
            >
              {" "}
              Login here
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default Loginpop;
