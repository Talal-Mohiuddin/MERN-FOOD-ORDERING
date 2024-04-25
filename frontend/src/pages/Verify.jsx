import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Spinner } from "../components";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

const Verify = () => {
  const [search, setSearch] = useSearchParams();
  const success = search.get("success");
  const orderId = search.get("orderId");
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async () => {
      const { data } = await axios.post(
        "http://localhost:3000/api/order/verify",
        {
          success,
          orderId,
        },
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
      navigate("/myorders");
    },
    onError: (error) => {
      toast.error(error.response.data.message);
      navigate("/");
    },
  });

  React.useEffect(() => {
    mutation.mutate();
  }, []);

  return (
    <div className="grid min-h-[60vh]">
      <Spinner />
    </div>
  );
};

export default Verify;
