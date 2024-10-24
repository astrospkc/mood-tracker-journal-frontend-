import React, { useContext } from "react";
import home from "../images/theHome.jpg";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../context/UserContext";

const JournalPage = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(userContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/");
  };

  const spanClass =
    "  rounded-full p-2 text-center bg-gradient-to-tr from-yellow-200 to-yellow-700 shadow-lg shadow-gray-500 hover:cursor-pointer ";
  return (
    <>
      <div className="flex w-full h-full justify-center bg-stone-500">
        <div className="relative ">
          <img
            src={home}
            alt="the home page "
            className="opacity-50 rounded-full h-full shadow-lg shadow-gray-500 "
          />
          <div className=" absolute top-1/4 ">
            <h1 className="chonburi-regular text-stone-900 text-center">
              MOOD-TRACKER JOURNAL
            </h1>
            <p className="text-center text-stone-600  text-2xl">
              {" "}
              Get your weekly summarized{" "}
              <span className="rounded-full bg-yellow-300 border-2 border-black p-3">
                Ai supported
              </span>{" "}
              mood tracker journal{" "}
            </p>
          </div>
        </div>
        <div className="md:absolute sticky m-10 top-0 left-0 flex flex-col gap-4 z-10 text-left ">
          {isAuthenticated ? (
            <div className="flex gap-4">
              <span className={`${spanClass}`}>Home</span>
              <span className={`${spanClass}`}>Week Analysis</span>
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
          ) : (
            <div className="flex gap-4">
              <span className={`${spanClass}`}>Home</span>
              <span className={`${spanClass}`}>Week Analysis</span>
              <span className={`${spanClass}`}>
                <Link to="/journals">Journals</Link>
              </span>
              <span className={`${spanClass}`}>
                <Link to="/signin">SignIn</Link>
              </span>
              <span className={`${spanClass}`}>
                <Link to="/signup">SignUp</Link>
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default JournalPage;
