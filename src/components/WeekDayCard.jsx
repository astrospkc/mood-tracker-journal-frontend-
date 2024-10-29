import React from "react";
import { useNavigate } from "react-router-dom";

const WeekDayCard = (props) => {
  const { day, id } = props;

  let body = day.body;
  const navigate = useNavigate();

  if (body.length > 100) {
    body = body.slice(0, 50) + "...";
  }
  const handleClick = () => {
    navigate(`/journals/week/${id}/day`, { state: { weekdayJournal: day } });
  };

  return (
    <>
      <div
        onClick={handleClick}
        className="p-4 rounded-3xl shadow-lg shadow-stone-500 bg-cyan-950 text-yellow-500 yusei-magic-regular hover:bg-cyan-900 hover:cursor-pointer"
      >
        <h1 className="border-b-2 border-yellow-500">{day.title}</h1>
        <p>{body}</p>
      </div>
    </>
  );
};

export default WeekDayCard;
