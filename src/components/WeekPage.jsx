import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsArrowLeftCircleFill } from "react-icons/bs";
import { journalContext } from "../context/JournalContext";

const WeekPage = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/journals");
  };
  const { weekjournal_Arr, recentJournal } = useContext(journalContext);

  const [ai_summary, setAi_summary] = useState();
  console.log("recent journal: ", recentJournal);

  const summarize = async () => {
    const query = recentJournal.title;
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(
        `${
          import.meta.env.VITE_URL
        }/weekJournals/summarizeJournal?query=${query}`,
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
      setAi_summary(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    summarize();
  }, [recentJournal]);

  useEffect(() => {
    console.log("ai summary: ", ai_summary);
  }, [ai_summary]);
  const handleSummarize = () => {
    summarize();
  };

  return (
    <>
      {weekjournal_Arr && weekjournal_Arr.length > 0 ? (
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
          <div className="grid grid-cols-3 gap-4 m-4 p-4">
            {weekjournal_Arr &&
              weekjournal_Arr.map((day) => {
                return (
                  <>
                    <div key={day._id} className="">
                      <h1>{day.title}</h1>
                      <p>{day.body}</p>
                    </div>
                  </>
                );
              })}
          </div>

          {/* <Link to="/journals/week/weekday">
            <div className="flex rounded-3xl p-4 bg-white">Day 1</div>
          </Link> */}
          <button
            onClick={handleSummarize}
            className="p-2 rounded-3xl bg-stone-500"
          >
            Summarize
          </button>
          {ai_summary && <p>{ai_summary}</p>}
        </div>
      ) : (
        <div>
          <Link to="/journals/week/weekday">
            <div className="flex rounded-3xl p-4 bg-white">Day 1</div>
          </Link>
        </div>
      )}
    </>
  );
};

export default WeekPage;
