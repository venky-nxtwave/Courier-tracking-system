import React, { useRef } from "react";
import Header from "./Header";

const AddUser = () => {
  const itemId = useRef();
  const username = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userDetails = {
      user_name: username.current.value,
      item_id: itemId.current.value,
    };
    const data1 = JSON.stringify(userDetails);
    const url = "http://localhost:3001/api/additem";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data1,
    });
    const data = await response.json();
    if (response.ok === true) {
      console.log(data);
      alert("item inserted successfully");
    } else {
      alert(data);
      console.log(response.ok);
      console.log(data);
    }
  };

  return (
    <div>
      <Header />
      <div className="h-screen flex justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="w-full md:w-[450px] bg-white shadow-2xl border-2 border-black-400 p-6 rounded-lg"
        >
          <div className="my-5">
            <div className="flex flex-col mt-3">
              <label className="mb-3 font-normal ml-1">Username</label>
              <input
                ref={username}
                type="input"
                placeholder="Enter username"
                className="w-full h-10 border-2 border-gray-300 pl-3 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-500"
              />
            </div>
            <div className="flex flex-col mt-3">
              <label className="mb-3 font-normal ml-1">Order Id</label>
              <input
                ref={itemId}
                type="input"
                placeholder="Enter Order Id"
                className="w-full h-10 border-2 border-gray-300 pl-3 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-500"
              />
            </div>
            <button className="   bg-blue-500 hover:bg-blue-600 w-full text-center rounded-md my-4 h-10 text-white text-lg">
              Add User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
