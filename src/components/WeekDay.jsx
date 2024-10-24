import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsArrowLeftCircleFill } from "react-icons/bs";
const WeekDay = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/journals/week");
  };
  return (
    <div className="w-full h-full flex flex-col justify-center items-center ">
      <div className="flex  flex-row-reverse justify-around items-center">
        <div className="flex flex-row items-center gap-4">
          <BsArrowLeftCircleFill
            onClick={handleBack}
            className="text-xl md:text-3xl hover:text-yellow-50 hover:cursor-pointer"
          />
          <h1 className="chonburi-short ">Day 1 Journal</h1>
        </div>

        <Link to="/">
          <h1 className="bg-white p-2 mx-10  rounded-xl">Home</h1>
        </Link>
      </div>

      <input type="text" className="m-4 p-4  rounded-xl bg-stone-300 w-2/3" />
      <textarea
        name=""
        id=""
        rows={40}
        cols={80}
        className="bg-stone-400 rounded-3xl shadow-lg shadow-stone-800 w-2/3 p-4"
      ></textarea>
      <div className="flex flex-row items-end">
        <button className="bg-stone-200 rounded-3xl my-4 p-4">Add</button>
        <button className="bg-stone-200 rounded-3xl my-4 p-4">Cancel</button>
      </div>
    </div>
  );
};

export default WeekDay;
