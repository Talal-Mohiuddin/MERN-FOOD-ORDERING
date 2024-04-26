import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { assets } from "../assets/admin_assets/assets";
import { toast } from "react-toastify";
import { URL } from "../URL";

const Addproduct = () => {
  const [image, setimage] = useState(null);
  const [formData, setformData] = useState({
    name: "",
    description: "",
    category: "Salad",
    price: "",
  });
  console.log(image);

  function handleChange(e) {
    if (e.target.name === "image") {
      setimage(e.target.files[0]);
    }
    if (e.target.name === "category") {
      setformData({ ...formData, [e.target.name]: e.target.value });
    }
    if (
      e.target.name === "price" ||
      e.target.name === "name" ||
      e.target.name === "description"
    ) {
      setformData({ ...formData, [e.target.name]: e.target.value });
    }
  }

  const mutate = useMutation({
    mutationFn: async (form) => {
      const { data } = await axios.post(
        `${URL}/api/food/addfood`,
        form,
        {
          withCredentials: true,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
      setformData({
        name: "",
        description: "",
        category: "Salad",
        price: "",
      });
      setimage(null);
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  const { isPending } = mutate;

  function handleSubmit(e) {
    e.preventDefault();
    const form = new FormData();
    form.append("name", formData.name);
    form.append("description", formData.description);
    form.append("category", formData.category);
    form.append("price", formData.price);
    form.append("image", image);
    mutate.mutate(form);
  }

  return (
    <div className="w-[70%] ml-[max(5vw,25px)] mt-[50px] text-[#6d6d6d] text-[16px]">
      <form onSubmit={handleSubmit} className="flex flex-col gap-[20px] ">
        <div className=" flex flex-col gap-[10px] ">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              className="w-[120px]"
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt=""
            />
          </label>
          <input
            onChange={handleChange}
            type="file"
            name="image"
            id="image"
            hidden
            required
          />
        </div>
        <div className="w-[max(40%,280px)] flex flex-col gap-[10px]">
          <p>Product name</p>
          <input
            className="p-[10px] disabled:opacity-85  border-2"
            type="text"
            name="name"
            required
            placeholder="Product name"
            onChange={handleChange}
            value={formData.name}
            disabled={isPending}
          />
        </div>
        <div className="flex flex-col gap-[10px] w-[max(40%,280px)] ">
          <p>Product description</p>
          <textarea
            className="p-[10px] disabled:opacity-85  border-2"
            name="description"
            placeholder="write content here"
            required
            rows="6"
            onChange={handleChange}
            value={formData.description}
            disabled={isPending}
          />
        </div>
        <div className="flex gap-[30px]">
          <div className=" flex flex-col gap-[10px]">
            <p>Product category</p>
            <select
              onChange={handleChange}
              value={formData.category}
              className="max-w-[120px] disabled:opacity-85 p-[10px]"
              name="category"
              required
              disabled={isPending}
            >
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Desert">Desert</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="add-price flex flex-col gap-[10px]">
            <p>Product Price</p>
            <input
              className="max-w-[120px] disabled:opacity-85 p-[10px] border-2"
              type="number"
              name="price"
              required
              placeholder="Product price"
              onChange={handleChange}
              value={formData.price}
              disabled={isPending}
            />
          </div>
        </div>
        <button
          className="max-w-[120px] p-[10px] text-white bg-black cursor-pointer"
          type="submit"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default Addproduct;
