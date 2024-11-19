import { Link } from "react-router-dom";
import home from "../images/theHome.jpg";

import Header from "./Header.jsx";
import { useState } from "react";
import { BsJournalRichtext } from "react-icons/bs";
import "./styles.css";

const Homepage1 = () => {
  const [showNavbar, setShowNavbar] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 1) {
      setShowNavbar(true);
    } else {
      setShowNavbar(false);
    }
  };

  window.addEventListener("scroll", handleScroll);

  return (
    <>
      {/*  */}
      <div className="flex flex-col overflow-hidden">
        {/* <div className="p-4 shadow-xl z-10  shadow-slate-950 bg-slate-900"> */}
        <Header />
        {/* </div> */}

        {/* header , the pattern  */}
        <div className="overflow-hidden">
          <div
            style={{
              backgroundImage: `url(${home})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              opacity: "0.5",
            }}
            className="h-[90vh] w-[90vh]  absolute  shadow-lg shadow-stone-800 -top-1/2 right-50 rounded-3xl rotate-45 -z-4 bg-orange-300 "
          ></div>
        </div>
        <div className=" ">
          <div className="londrina-shadow-regular p-4 ">
            <h1 className=" ">Mood</h1>
            <h1>Tracker</h1>
            <h1>Journal</h1>
          </div>

          <div>
            <p className="text-start text-white  text-2xl yusei-magic-regular">
              {" "}
              Get your weekly summarized{" "}
              <span className="rounded-full bg-yellow-300  px-3 text-black">
                Ai supported
              </span>{" "}
              mood tracker journal{" "}
            </p>
          </div>
        </div>

        {/* <div>
          <div className="h-[20vh] w-[20vh]  absolute  left-1/2 top-1/2 rounded-3xl rotate-45 -z-4 bg-orange-300 opacity-50"></div>
        </div> */}
        <div className="flex flex-row gap-4">
          <div className="h-[15vh] w-[15vh] md:h-[20vh] md:w-[25vh] flex  md:absolute  left-[45%] top-[40%] rounded-3xl -z-4 bg-gradient-to-bl from-black to-blue-950 hover:cursor-pointer hover:bg-gradient-to-bl hover:from-black hover:to-yellow-500 hover:scale-95 duration-300 shadow-md shadow-yellow-900  sm:justify-center sm:items-center my-10 ">
            <div className=" md:h-[20vh] md:w-[25vh] sm:text-lg md:text-3xl   md:absolute left-[15%] top-[20%] sm:text-center sm:justify-center sm:items-center text-yellow-400 hover:text-black yusei-magic-tab ">
              <Link to="/journals">Journals</Link>
            </div>
          </div>

          <div className="h-[15vh] w-[15vh] md:h-[20vh] md:w-[25vh] flex  md:absolute  left-[70%] top-[40%] rounded-3xl -z-4 bg-gradient-to-bl from-black to-blue-950 hover:cursor-pointer hover:bg-gradient-to-bl hover:from-black hover:to-yellow-500 hover:scale-95 duration-300 shadow-md shadow-yellow-900  sm:justify-center sm:items-center my-10 ">
            <div className=" md:h-[20vh] md:w-[25vh] sm:text-lg md:text-3xl   md:absolute left-[15%] top-[20%] sm:text-center sm:justify-center sm:items-center text-yellow-400 hover:text-black yusei-magic-tab ">
              <Link to="/weeklyAnalysis">Weekly Analysis</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage1;
