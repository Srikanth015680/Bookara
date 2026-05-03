import axios from "axios";
import React, { useEffect, useState } from "react";
import { backend_url } from "../App";
import { toast } from "react-toastify";
import { TbTrash } from "react-icons/tb";

const List = () => {
  const [list, setList] = useState([]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        backend_url + "/api/product/list",
        {
          headers: { token },
        }
      );

      if (response.data.success) {
        setList(response.data.products);
      }
    } catch (e) {
      console.error(e);
      toast.error(e.message);
    }
  };

const removeProducts = async (id) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.post(
      backend_url + "/api/product/delete",
      { id }, 
      {
        headers: { token }
      }
    );

    if (response.data.success) {
      toast.success(response.data.message);

      
      setList(prev => prev.filter(item => item._id !== id));
    }

  } catch (e) {
    console.error(e);
    toast.error(e.response?.data?.message || e.message);
  }
};
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-full px-4 sm:px-8 py-6">
      <div className="bg-white rounded-xl shadow-sm p-4">

        {/* Header */}
        <div className="grid grid-cols-5 gap-4 text-gray-600 font-semibold text-sm pb-3">
          <h5>Image</h5>
          <h5>Name</h5>
          <h5>Category</h5>
          <h5>Price</h5>
          <h5>Remove</h5>
        </div>

        {/* Products list */}
        {list.map((item) => (
          <div
            key={item._id}
            className="grid grid-cols-5 gap-4 items-center py-3 hover:bg-gray-50 rounded-lg transition px-2"
          >
            <img
              src={item.image}
              alt="product"
              className="w-12 h-12 object-cover rounded-md"
            />

            <h5 className="font-medium  text-gray-800">
              {item.name}
            </h5>

            <p className="text-sm text-gray-500">
              {item.category}
            </p>

            <div className="text-purple-600 font-semibold">
              ${item.price}
            </div>

            <TbTrash
              onClick={() => removeProducts(item._id)}
              className=" text-lg cursor-pointer hover:text-red-700 transition"
            />
          </div>
        ))}

      </div>
    </div>
  );
};

export default List;