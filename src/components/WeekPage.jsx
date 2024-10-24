import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsArrowLeftCircleFill } from "react-icons/bs";
const WeekPage = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/journals");
  };
  return (
    <>
      <div className="flex flex-col   p-4 justify-center m-auto w-full items-center  overflow-y-scroll">
        <div className="flex flex-row-reverse items-center  ">
          <div className="flex flex-row items-center gap-4">
            <BsArrowLeftCircleFill
              onClick={handleBack}
              className="text-xl md:text-3xl hover:text-yellow-50 hover:cursor-pointer"
            />
            <h1 className="chonburi-regular">The Daily Journaling</h1>
          </div>
        </div>
        <Link to="/journals/week/weekday">
          <div className="flex rounded-3xl p-4 bg-white">Day 1</div>
        </Link>
      </div>
    </>
  );
};

export default WeekPage;
