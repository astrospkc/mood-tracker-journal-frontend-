import React from "react";
import { useNavigate } from "react-router-dom";
import { BiSolidTrashAlt } from "react-icons/bi";

const WeekDayCard = (props) => {
  const { day, id } = props;
  console.log("day: ", day);

  let body = day.body;
  console.log("body: ", body);
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
      console.log("day id to confirm : ", day._id);
      if (day) {
        const res = await fetch(
          `${import.meta.env.VITE_URL}/weekJournals/deleteDayJournal/${
            day._id
          }`,
          {
            method: "DELETE",
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
  console.log("day id: ", day._id);
  return (
    <>
      <div className="p-4 rounded-3xl shadow-lg shadow-stone-500 bg-cyan-950 text-yellow-500 yusei-magic-regular hover:bg-cyan-900 hover:cursor-pointer">
        <div className="justify-between flex">
          <h1 className="border-b-2 border-yellow-500">{day.title}</h1>
          <BiSolidTrashAlt
            className="text-xl hover:text-white"
            onClick={handleDelete}
          />
        </div>

        <p
          onClick={handleClick}
          className="hover:bg-white rounded-2xl p-2 my-2"
        >
          {body}
        </p>
      </div>
    </>
  );
};

export default WeekDayCard;
