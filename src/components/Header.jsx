import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { BsFillArrowRightSquareFill } from "react-icons/bs";
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
    "  rounded-full p-2 text-center bg-gradient-to-tr from-yellow-200 to-yellow-700 shadow-lg shadow-gray-800 hover:cursor-pointer  ";

  console.log("clicked: ", clicked);
  return (
    <div className="flex sm:flex-col ms:flex-row fixed md:static justify-start md:justify-center  z-10 md:items-center md:p-4 md:shadow-xl  md:shadow-slate-950 md:bg-slate-900 ">
      {
        <div className="md:hidden p-4">
          {clicked ? (
            <BsFillArrowDownSquareFill
              onClick={handleToggle}
              className="text-2xl  text-black"
            />
          ) : (
            <BsFillArrowRightSquareFill
              onClick={handleToggle}
              className="text-2xl text-black"
            />
          )}
        </div>
      }

      {isAuthenticated ? (
        <div
          className={`${
            clicked
              ? " block w-fit md:w-full justify- md:flex "
              : "hidden md:flex"
          }`}
        >
          <div className="flex flex-col sm:ml-4 md:flex-row gap-4 yusei-magic-regular ">
            <span className="p-2 bg-orange-300 rounded-3xl hover:bg-yellow-100 shadow-lg  shadow-stone-900 hover:cursor-pointer  hover:scale-95 ">
              <Link to="/">Home</Link>
            </span>
            <span className="p-2 bg-orange-300 rounded-3xl hover:bg-yellow-100 shadow-lg shadow-stone-900 hover:cursor-pointer  hover:scale-95">
              <Link to="/weeklyAnalysis">About</Link>
            </span>

            {/* <span className="p-2 bg-orange-300  rounded-3xl hover:bg-yellow-100 shadow-lg shadow-stone-900 hover:cursor-pointer  hover:scale-95">
              <Link to="/journals">Journals</Link>
            </span> */}
            <button
              onClick={handleLogout}
              className="p-2 bg-stone-500 rounded-3xl hover:bg-yellow-100 shadow-lg shadow-stone-900  hover:scale-95"
            >
              Logout
            </button>
          </div>
        </div>
      ) : (
        <div
          className={`${
            clicked ? "block w-1/2 md:w-full md:flex " : "hidden md:flex"
          }`}
        >
          <div className="flex flex-col md:flex-row gap-4 ">
            <span className="p-2 bg-orange-300 rounded-3xl hover:bg-yellow-100 shadow-lg  shadow-stone-900 hover:cursor-pointer  hover:scale-95 ">
              <Link to="/">Home</Link>
            </span>
            <span className="p-2 bg-orange-300 rounded-3xl hover:bg-yellow-100 shadow-lg  shadow-stone-900 hover:cursor-pointer  hover:scale-95 ">
              <Link to="/signin">SignIn</Link>
            </span>
            <span className="p-2 bg-orange-300 rounded-3xl hover:bg-yellow-100 shadow-lg  shadow-stone-900 hover:cursor-pointer  hover:scale-95 ">
              <Link to="/signup">SignUp</Link>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
