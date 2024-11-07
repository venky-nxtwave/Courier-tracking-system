import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const Username = useRef(null);
  const password = useRef(null);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userDetails = {
      user_name: Username.current.value,
      password: password.current.value,
    };
    const data1 = JSON.stringify(userDetails);
    const url = "http://localhost:3001/api/user/register";
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
      navigate("/browse");
    } else {
      setErrorMessage(data);
      console.log(response.ok);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <form
        className="w-full md:w-[450px] bg-white shadow-2xl border-2 border-black-400 p-6 rounded-lg"
        onSubmit={handleSubmit}
      >
        <div className="my-5">
          <div className="flex flex-col mt-3">
            <label className="mb-3 font-normal ml-1">Username</label>
            <input
              ref={Username}
              type="input"
              placeholder="Enter username"
              className="w-full h-10 border-2 border-gray-300 pl-3 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
          <div className="flex flex-col mt-3">
            <label className="mb-3 font-normal ml-1">Password</label>
            <input
              ref={password}
              type="password"
              placeholder="Enter password"
              className="w-full h-10 border-2 border-gray-300 pl-3 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
          {errorMessage && (
            <h3 className="text-red-500 pt-2">{errorMessage}</h3>
          )}
          <button
            //onClick={handleSubmit}
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 w-full text-center rounded-md my-4 h-10 text-white text-lg"
          >
            Register
          </button>
          <p className="text-center">
            Already have an account?{" "}
            <Link to="/" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signup;
