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
    <div className="flex flex-col justify-between p-0 md:p-6 shadow-lg shadow-yellow-400 bg-transparent h-fit md:h-screen">
      {/* Header Section */}

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
      <div className={`${menuOpen ? "block" : "hidden"} md:block`}>
        {isAuthenticated ? (
          <div className="flex flex-col space-y-3">
            <div>
              <NavComponents />
            </div>
            <Button
              onClick={handleLogout}
              className="mt-4 bg-red-500 hover:bg-red-600 text-white"
            >
              Logout
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <NavComponents />
            <div className="flex flex-col gap-4">
              <Button>
                <Link to="/signin">Sign In</Link>
              </Button>
              <Button>
                <Link to="/signup">Sign Up</Link>
              </Button>
            </div>
          </div>
        )}
        <div className="flex p-6 border-t border-neutral-200/30">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-neutral-200"></div>
            {user && (
              <div className="ml-3">
                <p className="text-sm font-medium text-white">{user.name}</p>
                <p className="text-xs text-neutral-500">{user.email}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer Section */}
    </div>
  );
};

export default Siderbar;
