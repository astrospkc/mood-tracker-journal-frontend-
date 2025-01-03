import React from "react";
import Header from "./Header";
import Page2 from "./Page2";

const Homepage2 = () => {
  return (
    <div className="w-full h-screen">
      <Header />
      <div className=" bg-yellow-500 w-full flex justify-center items-center text-2xl h-full">
        everything happens for a reason
      </div>
      {/* <div className="flex justify-center items-center"> */}
      {/* <div className="flex  bg-black items-center p-10 text-2xl h-full"> */}
      <Page2 />
      {/* </div> */}
    </div>
  );
};

export default Homepage2;
