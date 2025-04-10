import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsArrowLeftCircleFill } from "react-icons/bs";
import { journalContext } from "../context/JournalContext";
import { useParams } from "react-router-dom";

import WeekDayCard from "./WeekDayCard";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Button } from "@chakra-ui/react";

const WeekPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const { journal } = location.state || {}; // Accessing the passed journal
  const { clickedJournal, setClickedJournal } = useContext(journalContext);
  setClickedJournal(journal);

  // console.log("clicked journal that is passed: ", clickedJournal);

  const handleBack = () => {
    // console.log("clicked");
    navigate(`/journals`);
  };

  const [ai_summary, setAi_Summary] = useState();

  const { weekJournal_Arr, setWeekJournal_Arr } = useContext(journalContext);
  // console.log(weekJournal_Arr);

  const allWeekJournal = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_URL}/weekJournals/fetchJournal/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = res.data;
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
      const res = await axios.get(
        `${import.meta.env.VITE_URL}/weekJournals/summarizeJournal/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = res.data;
      console.log("summarized data: ", data);
      setAi_Summary(data);
    } catch (error) {
      console.error(error);
    }
  };
  let parsed_summary;
  // console.log("week journal arr: ", weekJournal_Arr);
  if (ai_summary) {
    parsed_summary = JSON.parse(ai_summary);
  }
  // console.log("ai summary: ", parsed_summary);

  return (
    <>
      <div className="flex flex-col font-serif   ">
        <div className="flex flex-col p-4 justify-center m-auto w-full items-center ">
          <div className="flex flex-row-reverse items-center mb-4">
            <div className="flex flex-row items-center gap-4">
              <BsArrowLeftCircleFill
                onClick={handleBack}
                className="text-xl md:text-3xl text-white hover:text-yellow-50 cursor-pointer"
              />
              <h1 className=" text-4xl md:text-6xl text-orange-300">
                Daily Journaling
              </h1>
            </div>
          </div>

          {weekJournal_Arr && weekJournal_Arr.length > 0 ? (
            <div className="m-4 p-4 w-full">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
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

              {ai_summary && parsed_summary && (
                <div className="flex flex-col md:flex-row gap-2 justify-center items-center mt-2 p-3 rounded-3xl  w-full yusei-magic-regular">
                  <div className="md:w-[20%] mx-3 bg-red-300 rounded-3xl p-3 w-[70%] justify-center items-center m-auto overflow-x-auto">
                    <ul className="flex flex-row md:flex-col">
                      <li className="mx-4 font-bold block md:hidden">
                        <li className="border-b-2 border-black">Emotions</li>
                        <li className="border-b-2 border-black">
                          Stats (0-10)
                        </li>
                      </li>

                      <li>anger: {parsed_summary.anger}</li>
                      <li>adventurous: {parsed_summary.adventurous}</li>
                      <li>chilled: {parsed_summary.chilled}</li>
                      <li>happiness: {parsed_summary.happiness}</li>
                      <li>joy: {parsed_summary.joy}</li>
                      <li>sadness: {parsed_summary.sadness}</li>
                      <li>loneliness: {parsed_summary.loneliness}</li>
                      <li>overall: {parsed_summary.overall}</li>
                    </ul>
                  </div>
                  <div className="w-[30%] mx-3 text-gray-400 rounded-3xl p-3 border-2 border-gray-500">
                    <span className="text-slate-200 text-xl mr-3">
                      Emotional Status:{" "}
                    </span>
                    {parsed_summary.emotional_status}
                  </div>

                  <div className="w-[50%] bg-gradient-to-br from-red-400 to-stone-600 p-3 rounded-2xl">
                    <span className="text-slate-200 text-xl mr-3">
                      Tips and improvements:
                    </span>
                    {parsed_summary.tips_and_improvements}
                  </div>
                </div>
              )}
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
          <div>
            <h1 className="text-white">See the graph ...</h1>
            <Link to="/weeklyAnalysis">
              {" "}
              <Button>Weekly Analysis</Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
export default WeekPage;
