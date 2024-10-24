import React from "react";
import card from "../images/theHome.jpg";

const JournalCard = ({ journal }) => {
  console.log("journal: ", journal.title);
  return (
    <div className="flex flex-row gap-10 w-fit  justify-between items-center shadow-lg shadow-stone-700 rounded-3xl p-4 px-9 my-3 ">
      <div className="text-3xl">{journal?.title} </div>
      <div className="">
        <img
          src={card}
          alt=""
          height={400}
          width={400}
          className="rounded-xl"
        />
      </div>
    </div>
  );
};

export default JournalCard;
