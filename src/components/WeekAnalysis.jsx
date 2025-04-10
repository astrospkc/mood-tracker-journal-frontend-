import { useCallback, useContext, useEffect, useState } from "react";
import BarChart from "./chart/BarChart";

import { journalContext } from "../context/JournalContext";

import months from "./month";

import WeekAnalysisCard from "./WeekAnalysisCard";

const WeekAnalysis = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null); // Added error state
  const { journals, fetchJournals } = useContext(journalContext);
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [summary, setSummary] = useState(null);
  console.log(setSummary, setError, setIsLoading);
  // const [clickedTitle, setClickedTitle] = useState(false);

  const { selectedJournalId, setSelectedJournalId } =
    useContext(journalContext);

  useEffect(() => {
    fetchJournals();
  }, []);

  // handle select month

  const handleMonthChange = useCallback(
    (month) => {
      console.log("Selected month:", month);
      for (let i = 0; i < months.length; i++) {
        if (months[i].month == month) {
          console.log("id of the month: ", months[i].id);
          setSelectedMonth(months[i].id);
        }
      }
      // console.log("selected month: ", selectedMonth);
    },
    [selectedMonth]
  );
  useEffect(() => {
    setSelectedMonth(selectedMonth);
  }, [selectedMonth]);

  // summarize the data

  useEffect(() => {
    setSelectedJournalId;
  }, [selectedJournalId]);

  let arr = [];
  if (journals && selectedJournalId) {
    const feels = journals.filter((journal) => {
      if (journal._id == selectedJournalId) {
        // console.log("journal ", journal, journal.emotions);
        return journal.emotions;
      }
    });

    // console.log("feels: ", feels);
    console.log("feels: ", feels);
    const data = feels[0].emotions;
    // console.log("data: ", data);
    arr = data;
  }

  // console.log("selected journal id: ", selectedJournalId);
  console.log("summary: ", summary);

  return (
    <>
      <div className="flex flex-col h-full w-full font-serif mt-5">
        {isLoading && <p>Loading...</p>} {/* Loading indicator */}
        {error && <p>Error: {error}</p>} {/* Display error message */}
        <div className="text-4xl md:text-6xl text-yellow-500 text-center">
          <h1 className="text-5xl">Weekly Analysis</h1>
        </div>
        {/* select the month and get all the journal to be displayed and according to that get the weekly update */}
        <div className=" flex  flex-col justify-center items-center  yusei-magic-regular gap-3 text-xl ">
          <h1 className="text-orange-300 ">
            Choose your month to get the analysis graph
          </h1>
          <select
            name="months"
            id=""
            className="p-3 bg-gray-500 rounded-xl"
            onChange={(e) => handleMonthChange(e.target.value)}
          >
            {months.map((m) => (
              <option key={m.id} value={m.month}>
                {m.month}
              </option>
            ))}
          </select>

          {/* if the month of journal and selected journal is same ,then show all the journals and then graph */}
          <div className=" m-auto flex flex-col gap-4 w-fit shadow-lg shadow-black bg-gradient-to-l from-black p-4 rounded-xl ">
            <div className="text-white border-b-2">Journals :</div>
            {journals &&
              journals.length > 0 &&
              journals
                .filter((j) => {
                  const date = new Date(j.date).getMonth();
                  console.log("date: ", date);
                  if (date == selectedMonth) {
                    return j;
                  }
                })
                .map((journal) => (
                  <div key={journal._id} className="">
                    <div className="flex flex-col justify-center items-center">
                      <WeekAnalysisCard
                        journalId={journal._id}
                        journal={journal}
                      />
                    </div>
                  </div>
                ))}
          </div>
        </div>
        <div>
          {journals && journals.length > 0 ? (
            <div className="p-10 ">
              <BarChart data={arr} />
            </div>
          ) : (
            <div className=" text-white flex justify-center items-center yusei-magic-regular  ">
              {" "}
              Data is yet to retrieved. First go to journal page and click on
              the journal and then click on the summarize button.
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default WeekAnalysis;
