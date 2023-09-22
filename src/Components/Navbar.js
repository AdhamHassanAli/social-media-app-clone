import React from "react";
import { useState, useContext, useEffect } from "react";
import LoggedInContext from "../Context/LoggedInContext";
import { NavLink, Link } from "react-router-dom";

function Navbar() {
  const { User } = useContext(LoggedInContext);
  const [isLoggedIn, setisLoggedIn] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setisLoggedIn(true);
    }
  }, [User]);

  return (
    <>
      <div className="flex flex-col items-center md:flex-row md:justify-between py-2 sm:px-2 md:px-5 sm:w-full mx-auto md:w-[90%]">
        <div className="font-bold text-[#5CB85C] text-2xl cursor-pointer mb-3 md:mb-0  ">
          <span>Conduit.</span>
        </div>

        {!isLoggedIn && (
          <ul className="">
            <Link
              to="/"
              className=" text-gray-400 active:text-[#5CB85C] duration-500 cursor-pointer mr-3 md:mr-5"
            >
              Home
            </Link>

            <Link
              to="/SignIn"
              className=" text-gray-400 active:text-[#5CB85C] duration-500 cursor-pointer mx-3 md:mx-5"
            >
              SignIn
            </Link>

            <Link
              to="/SignUp"
              className=" text-gray-400 active:text-[#5CB85C] duration-500 cursor-pointer ml-3 md:ml-5"
            >
              Signup
            </Link>
          </ul>
        )}
        {isLoggedIn && (
          <ul className=" flex">
            <NavLink
              to="/"
              className=" text-gray-400 active:text-[#5CB85C] duration-500 cursor-pointer mr-3 md:mr-5"
            >
              Home
            </NavLink>

            <NavLink
              to="/editor"
              className="text-gray-400 active:text-[#5CB85C] duration-500 cursor-pointer mx-3 md:mx-5 "
            >
              New Article
            </NavLink>

            <NavLink
              to="/settings"
              className="text-gray-400 active:text-[#5CB85C] duration-500 cursor-pointer mx-3 md:mx-5"
            >
              Setting
            </NavLink>
            <NavLink
              to="/profile"
              className="text-gray-400 active:text-[#5CB85C] duration-500 cursor-pointer  ml-3 md:ml-5"
            >
              Profile
            </NavLink>
          </ul>
        )}
      </div>
    </>
  );
}

export default Navbar;
