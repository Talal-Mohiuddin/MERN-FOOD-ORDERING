import React, { useState } from "react";
import axios from "axios";
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

const List = () => {
  const [list, setlist] = useState([]);

  const { isLoading, error } = useQuery({
    queryKey: ["list"],
    queryFn: async () => {
      const { data } = await axios.get(
        "http://localhost:3000/api/food/listfood",
        { withCredentials: true }
      );
      setlist(data.foods);
      return data;
    },
    refetchOnMount: true,
  });

  const mutationDelete = useMutation({
    mutationFn: async (id) => {
      const { data } = await axios.delete(
        `http://localhost:3000/api/food/removeFood/${id}`,
        { withCredentials: true }
      );
      return data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  function handleDelete(id) {
    const ok = confirm("Are you sure you want to delete this item?");
    if (!ok) {
      return;
    }
    mutationDelete.mutate(id);
    setlist((prevlist) => prevlist.filter((item) => item._id !== id));
  }

  return (
    <div className=" p-3 sm:p-10 w-[100%] sm:w-[80%] flex flex-col gap-[20px]">
      <p>All food Items</p>
      {isLoading && <p>Loading...</p>}
      {error && <p>Something went wrong...</p>}
      {list.length === 0 && <p>No food items found</p>}
      <div>
        <div
          style={{ gridTemplateColumns: "0.5fr 2fr 1fr 1fr 0.5fr" }}
          className="grid items-center gap-[10px] py-[12px] px-[15px] border border-solid border-[#cacaca] text-[13px] bg-[#f9f9f9]"
        >
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => (
          <div
            style={{ gridTemplateColumns: "0.5fr 2fr 1fr 1fr 0.5fr" }}
            className="grid items-center gap-[10px] py-[12px] px-[15px] border border-solid border-[#cacaca] text-[13px]"
            key={index}
          >
            <img className="w-[50px]" src={item.image} alt="" />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>${item.price}</p>
            <p
              onClick={() => handleDelete(item._id)}
              className="cursor-pointer hover:text-[tomato]"
            >
              X
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
