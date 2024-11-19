import React, { useCallback, useContext, useEffect, useState } from "react";
import BarChart from "./chart/BarChart";
import axios from "axios";
import { journalContext } from "../context/JournalContext";
import Header from "./Header";
import months from "./month";
import JournalCard from "./JournalCard";

const WeekAnalysis = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null); // Added error state
  const { journals, fetchJournals } = useContext(journalContext);
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [summary, setSummary] = useState(null);
  const [selectedJournalId, setSelectedJournalId] = useState(0);

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
  const summarize = async (id) => {
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
      setSummary(data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleSummarize = (id) => {
    setSelectedJournalId(id);
    summarize(id);
    console.log("click the summarize button");
  };
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

    console.log("feels: ", feels);
    const data = feels[0].emotions;
    // console.log("data: ", data);
    arr = data;
  }

  // console.log("selected journal id: ", selectedJournalId);
  console.log("summary: ", summary);

  return (
    <>
      <div className="">
        <Header />
        {isLoading && <p>Loading...</p>} {/* Loading indicator */}
        {error && <p>Error: {error}</p>} {/* Display error message */}
        <div className="chonburi-regular text-cyan-700 text-center">
          <h1>Weekly Analysis</h1>
        </div>
        {/* select the month and get all the journal to be displayed and according to that get the weekly update */}
        <div className=" flex  flex-col justify-center items-center  yusei-magic-regular gap-3 text-xl ">
          <h1 className="text-orange-300">
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
                <div
                  key={journal._id}
                  className=" grid grid-cols-2 justify-center items-center"
                >
                  <div className="flex flex-col justify-center items-center">
                    <JournalCard journal={journal} />
                    <button
                      onClick={() => handleSummarize(journal._id)}
                      className="bg-blue-950 w-fit text-yellow-400 p-4 rounded-2xl "
                    >
                      Summarize
                    </button>
                  </div>
                </div>
              ))}
        </div>
        <div>
          {journals && journals.length > 0 ? (
            <div className="p-10 ">
              <BarChart data={arr} />
            </div>
          ) : (
            <div className="flex justify-center items-center yusei-magic-regular  ">
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
