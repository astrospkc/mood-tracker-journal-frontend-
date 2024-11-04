import home from "../images/theHome.jpg";

import Header from "./Header.jsx";
import { useState } from "react";

const JournalPage = () => {
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
      <div className="flex w-full h-full justify-center bg-yellow-500 overflow-y-scroll md:overflow-y-hidden">
        <div className="relative flex-col justify-center items-center  ">
          <img
            src={home}
            alt="the home page "
            className="opacity-50 rounded-full  mt-10 h-full shadow-lg shadow-stone-900 "
          />
          <div className="absolute top-1/4 ">
            <h1 className="chonburi-regular text-stone-900 text-center">
              MOOD-TRACKER JOURNAL
            </h1>
            <p className="text-center text-white  text-2xl yusei-magic-regular">
              {" "}
              Get your weekly summarized{" "}
              <span className="rounded-full bg-yellow-300 border-2 border-black p-3">
                Ai supported
              </span>{" "}
              mood tracker journal{" "}
            </p>
          </div>
        </div>
        <div
          className={` absolute   m-10 top-0 left-0 flex flex-col gap-4 z-10 text-left  `}
        >
          {/* {
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
          } */}
          {/* {clicked && <Header />} */}
          <Header />
        </div>
      </div>
    </>
  );
};

export default JournalPage;
