import React, { useContext, useEffect, useState } from "react";
import {
  BsFillMoonStarsFill,
  BsFillArrowRightSquareFill,
  BsFillArrowDownSquareFill,
} from "react-icons/bs";
import "./styles.css";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/react";

// Assuming `UserContext` is defined and provides `isAuthenticated` and `setIsAuthenticated`.
import { UserContext } from "../context/UserContext";
import NavComponents from "./NavComponents";

const Siderbar = () => {
  const { isAuthenticated, setIsAuthenticated, user, getUser } =
    useContext(UserContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  console.log("user : ", user);
  const handleToggle = () => {
    setMenuOpen((prev) => !prev);
  };
  useEffect(() => {
    getUser;
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <div className="flex flex-col md:flex-row justify-between p-0 md:p-6 shadow-lg shadow-slate-900 bg-transparent h-fit rounded-3xl md:rounded-none items-center">
      {/* Header Section */}
      <div className="flex flex-row items-center text-yellow-400 text-center text-3xl p-2">
        <span className="rounded-full px-2 shadow-lg shadow-yellow-300 font-serif">
          Vritti
        </span>
        {/* <BsFillMoonStarsFill /> */}
      </div>
      {/* Mobile Menu Toggle */}
      <div className="md:hidden p-4">
        {menuOpen ? (
          <BsFillArrowDownSquareFill
            onClick={handleToggle}
            className="text-2xl text-yellow-400 cursor-pointer"
          />
        ) : (
          <BsFillArrowRightSquareFill
            onClick={handleToggle}
            className="text-2xl text-yellow-400 cursor-pointer"
          />
        )}
      </div>

      {/* Menu Section */}
      <div className="flex flex-row ">
        <div className="flex flex-col md:flex-row pr-3 ">
          <div className={`${menuOpen ? "block" : "hidden"} md:block`}>
            {isAuthenticated ? (
              <div className="flex flex-col md:flex-row items-center justify-center">
                <div>
                  <NavComponents />
                </div>
                <button
                  onClick={handleLogout}
                  className="rounded-xl p-2 hover:bg-yellow-600 text-white"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col md:flex-row gap-4">
                <NavComponents />
                <div className="flex flex-col md:flex-row gap-4">
                  <button>
                    <Link to="/signin">Sign In</Link>
                  </button>
                  <button>
                    <Link to="/signup">Sign Up</Link>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        {user && (
          <div className="flex flex-col md:flex-row p-2 border-neutral-200/30">
            <div className="flex  items-center">
              <div className="w-8 h-8 rounded-full bg-neutral-200"></div>
              {user && (
                <div className="ml-3">
                  <p className="text-sm font-medium text-white">{user.name}</p>
                  <p className="text-xs text-neutral-500">{user.email}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer Section */}
    </div>
  );
};

export default Siderbar;
