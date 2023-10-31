import { useState, useContext, useEffect } from "react";
import LoggedInContext from "../Context/LoggedInContext";
import { NavLink, Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { BiEdit } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
function Navbar() {
  const [navbarClicked, setNavBarClicked] = useState<boolean>(false);
  const { User } = useContext(LoggedInContext);
  const [isLoggedIn, setisLoggedIn] = useState<boolean>(false);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setisLoggedIn(true);
    }
  }, [User]);

  return (
    <>
      <div className="flex flex-col p-3 md:flex-row md:justify-between md:items-center md:p-5 mx-auto md:w-[90%]">
        <div className="font-bold text-[#5CB85C] text-4xl cursor-pointer mb-3 md:mb-0  ">
          <span>Conduit.</span>
        </div>
        <button onClick={() => setNavBarClicked(!navbarClicked)}>
          <GiHamburgerMenu className="text-3xl text-[#5CB85C] absolute right-3 top-5 md:hidden " />
        </button>
        {!isLoggedIn && (
          <ul
            id="nav-menu"
            className={`md:flex md:flex-row pt-2 md:pt-0 ${
              navbarClicked ? "flex flex-col" : " hidden"
            }`}
          >
            <NavLink
              to="/"
              className="text-lg text-gray-400 cursor-pointer md:mr-5 pb-3 md:pb-0"
            >
              Home
            </NavLink>

            <NavLink
              to="/SignIn"
              className="text-lg text-gray-400 cursor-pointer md:mx-5 pb-3 md:pb-0"
            >
              SignIn
            </NavLink>

            <NavLink
              to="/SignUp"
              className="text-lg text-gray-400 cursor-pointer md:ml-5 pb-3 md:pb-0"
            >
              Signup
            </NavLink>
          </ul>
        )}
        {isLoggedIn && (
          <ul
            id="nav-menu"
            className={`md:flex md:flex-row pt-2 md:pt-0 ${
              navbarClicked ? "flex flex-col" : " hidden"
            }`}
          >
            <NavLink
              to="/"
              className="text-lg text-gray-400 cursor-pointer md:mr-5 pb-3 md:pb-0"
            >
              Home
            </NavLink>

            <NavLink
              to="/SignIn"
              className="text-lg text-gray-400 cursor-pointer md:mx-5 pb-3 md:pb-0"
            >
              New Article <BiEdit />
            </NavLink>

            <NavLink
              to="/SignUp"
              className="text-lg text-gray-400 cursor-pointer md:ml-5 pb-3 md:pb-0"
            >
              Settings <FiSettings />
            </NavLink>
            <NavLink
              to="/SignUp"
              className="text-lg text-gray-400 cursor-pointer md:ml-5 pb-3 md:pb-0"
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
