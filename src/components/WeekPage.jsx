import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsArrowLeftCircleFill } from "react-icons/bs";
import { journalContext } from "../context/JournalContext";
import { useParams } from "react-router-dom";

import WeekDayCard from "./WeekDayCard";
import { useLocation } from "react-router-dom";

const WeekPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const { journal } = location.state || {}; // Accessing the passed journal
  const { clickedJournal, setClickedJournal } = useContext(journalContext);
  setClickedJournal(journal);

  console.log("clicked journal that is passed: ", clickedJournal);

  const handleBack = () => {
    console.log("clicked");
    navigate(`/journals`);
  };

  const [ai_summary, setAi_Summary] = useState();

  const { weekJournal_Arr, setWeekJournal_Arr } = useContext(journalContext);
  console.log(weekJournal_Arr);

  const allWeekJournal = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(
        `${import.meta.env.VITE_URL}/weekJournals/fetchJournal/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      console.log("resu: ", data);
      setWeekJournal_Arr(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    allWeekJournal();
  }, [id]);

  const handleSummarize = async () => {
    setAi_Summary(null);
    await summarize();
  };

  const handleAnotherDay = () => {
    console.log("navigation start");
    navigate(`/journals/week/${id}/day`, { state: { isAnotherDay: true } });
    console.log("navigation end");
  };

  const summarize = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(
        `${import.meta.env.VITE_URL}/weekJournals/summarizeJournal/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      console.log("summarized data: ", data);
      setAi_Summary(data);
    } catch (error) {
      console.error(error);
    }
  };
  console.log("week journal arr: ", weekJournal_Arr);

  return (
    <>
      <div className="flex flex-col p-4 justify-center m-auto w-full items-center overflow-y-scroll">
        <div className="flex flex-row-reverse items-center mb-4">
          <div className="flex flex-row items-center gap-4">
            <BsArrowLeftCircleFill
              onClick={handleBack}
              className="text-xl md:text-3xl hover:text-yellow-50 cursor-pointer"
            />
            <h1 className="chonburi-regular">The Daily Journaling</h1>
          </div>
        </div>

        {weekJournal_Arr && weekJournal_Arr.length > 0 ? (
          <div className="m-4 p-4">
            <div className="grid grid-cols-3 gap-4">
              {weekJournal_Arr.map((day) => (
                <WeekDayCard key={day._id} day={day} id={id} />
              ))}
            </div>
            <div className="flex flex-row gap-4 yusei-magic-regular">
              <button
                onClick={handleAnotherDay}
                className="flex rounded-3xl p-4 my-4 bg-white hover:bg-yellow-500"
              >
                Another day
              </button>

              <button
                onClick={handleSummarize}
                className=" flex rounded-3xl p-4 my-4 bg-stone-400 hover:bg-yellow-500"
              >
                Summarize
              </button>
            </div>

            {ai_summary && <p className="mt-2">{ai_summary}</p>}
          </div>
        ) : (
          <div>
            <div
              onClick={handleAnotherDay}
              className="flex rounded-3xl p-4 bg-white hover:bg-stone-500 hover:cursor-pointer"
            >
              Day 1
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default WeekPage;
