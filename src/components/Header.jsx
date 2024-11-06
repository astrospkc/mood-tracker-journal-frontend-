import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import {
  BsFillArrowLeftSquareFill,
  BsFillArrowRightSquareFill,
} from "react-icons/bs";
import { BsFillArrowDownSquareFill } from "react-icons/bs";

const Header = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(UserContext);
  const navigate = useNavigate();
  const [clicked, setClicked] = useState(false);
  const handleToggle = () => {
    setClicked((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/");
  };

  const spanClass =
    "  rounded-full p-2 text-center bg-gradient-to-tr from-yellow-200 to-yellow-700 shadow-lg shadow-gray-500 hover:cursor-pointer ";

  console.log("clicked: ", clicked);
  return (
    <>
      {
        <div className="md:hidden">
          {clicked ? (
            <BsFillArrowDownSquareFill
              onClick={handleToggle}
              className="text-xl "
            />
          ) : (
            <BsFillArrowRightSquareFill
              onClick={handleToggle}
              className="text-xl"
            />
          )}
        </div>
      }

      {isAuthenticated ? (
        <div className={`${clicked ? "block  md:flex " : "hidden md:flex"}`}>
          <div className="flex flex-col md:flex-row gap-4">
            <span className={`${spanClass}`}>Home</span>
            <span className={`${spanClass}`}>
              <Link to="/weeklyAnalysis">Week Analysis</Link>
            </span>

            <span className={`${spanClass}`}>
              <Link to="/journals">Journals</Link>
            </span>
            <button
              onClick={handleLogout}
              className="p-2 bg-stone-500 rounded-3xl hover:bg-yellow-100"
            >
              Logout
            </button>
          </div>
        </div>
      ) : (
        <div className={`${clicked ? "block  md:flex " : "hidden md:flex"}`}>
          <div className="flex flex-col md:flex-row gap-4">
            <span className={`${spanClass}`}>Home</span>

            <span className={`${spanClass}`}>
              <Link to="/signin">SignIn</Link>
            </span>
            <span className={`${spanClass}`}>
              <Link to="/signup">SignUp</Link>
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
