import home from "../images/theHome.jpg";

import Header from "./Header.jsx";
import { useState } from "react";
import { BsJournalRichtext } from "react-icons/bs";

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
        <div className=" flex flex-col md:flex-row justify-center items-center  ">
          <div className="flex-1 bg-white md:bg-yellow-200 rounded-full  ">
            <img
              src={home}
              alt="the home page "
              className="opacity-70 md:opacity-100 rounded-full  mt-10 h-full shadow-lg shadow-black  m-3"
            />
          </div>

          <div className="flex-1 absolute md:static md: border-l-0 md:border-l-2 border-gray-500 mx-4  p-3">
            <div className="flex flex-col justify-center items-center md:bg-white md:rounded-full shadow-none md:shadow-lg shadow-black chonburi-regular mx-10 text-black">
              <div className=" flex  flex-col m-3 bg-transparent md:bg-yellow-300 p-4 shadow-none md:shadow-lg shadow-stone-800 rounded-3xl">
                <h1 className="">Mood</h1>
                <h1>Tracker</h1>
                <BsJournalRichtext className="text-5xl text-center m-auto text-black" />
                <h1>Journal</h1>
              </div>
            </div>

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
        <div
          className={` absolute   m-10 top-0 left-0 flex flex-col gap-4 z-10 text-left  `}
        >
          <Header />
        </div>
      </div>
    </>
  );
};

export default JournalPage;
