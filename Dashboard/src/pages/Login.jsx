import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "axios";
import { useStore } from "../context/storeContext";
import { URL } from "../URL";

const Login = () => {
  const [formdata, setformdata] = useState({
    email: "",
    password: "",
  });

  const { user, setuser } = useStore();
  const navigate = useNavigate();

  const handlcChange = (e) => {
    setformdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const loginMutation = useMutation({
    mutationFn: async () => {
      const { data } = await axios.post(
        `${URL}/api/user/admin-login`,
        formdata,
        { withCredentials: true },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return data;
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
    onSuccess: (data) => {
      toast.success(data.message);
      setuser(data.user);
      localStorage.setItem("admin", JSON.stringify(data.user));
      navigate("/list");
    },
  });

  function handleSubmit(e) {
    e.preventDefault();
    loginMutation.mutate();
  }

  if(user) navigate('/list')

  return (
    <>
      <div className="w-[100vw] h-[100vh] bg-slate-500">
        <div className="flex flex-col gap-4 h-[90%] items-center justify-center ">
          <form
            onSubmit={handleSubmit}
            className="bg-[slategray] shadow-2xl shadow-gray-800 p-10 min-w-[340px] md:min-w-[450px] rounded-lg"
          >
            <div className="mb-4">
              <h2 className="text-4xl mb-1 text-[lightsteelblue]  font-[600]">
                Email
              </h2>
              <input
                placeholder="Enter Email"
                type="text "
                className="shadow-lg text-[19px] rounded-md py-2 px-3 w-[100%]"
                onChange={handlcChange}
                value={formdata.email}
                name="email"
              />
            </div>
            <div className="my-4">
              <h2 className="text-4xl mb-1 text-[lightsteelblue] font-[600]">
                Password
              </h2>
              <input
                type="password"
                placeholder="Enter PassWord"
                className="shadow-lg text-[19px] rounded-md py-2 px-3 w-[100%]"
                onChange={handlcChange}
                value={formdata.password}
                name="password"
              />
            </div>
            <button type="submit" className="bg-slate-700 mt-2 py-2 px-5 text-[lightsteelblue] rounded-md hover:text-[black] transition-[all] hover:bg-[lightsteelblue] shadow-lg min-w-[120px] text-xl">
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
