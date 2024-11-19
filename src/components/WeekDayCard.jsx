import React from "react";
import { useNavigate } from "react-router-dom";
import { BiSolidTrashAlt } from "react-icons/bi";
import axios from "axios";

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

  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    try {
      if (day) {
        const res = await axios.delete(
          `${import.meta.env.VITE_URL}/weekJournals/deleteDayJournal/${
            day._id
          }`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!res.ok) {
          throw new Error(`Error deleting journal: ${res.statusText}`);
        } else {
          alert("Journal deleted successfully");
          setTimeout(() => {
            window.location.reload();
          }, 300);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  let formattedDate = "";
  if (day && day.date) {
    const date = new Date(day.date);
    const d = date.getUTCDate(); // Get the day of the month (1-31)
    const month = date.getUTCMonth() + 1; // Get the month (0-11, so add 1)
    const year = date.getUTCFullYear(); // Get the full year (YYYY)
    formattedDate = `${d}-${month}-${year}`;
    // console.log(formattedDate);
  }

  return (
    <>
      <div className="p-4 rounded-3xl shadow-lg shadow-black bg-cyan-950 text-yellow-500 yusei-magic-regular hover:bg-cyan-900 hover:cursor-pointer">
        <div className="justify-between flex">
          <h1 className="border-b-2 border-yellow-500">{day.title}</h1>
          <h1 className=" border-yellow-300">{formattedDate}</h1>

          <BiSolidTrashAlt
            className="text-xl hover:text-white"
            onClick={handleDelete}
          />
        </div>

        <p
          onClick={handleClick}
          className="hover:bg-white  hover:text-black rounded-2xl p-2 my-2"
        >
          {body}
        </p>
      </div>
    </>
  );
};

export default WeekDayCard;
