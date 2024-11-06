import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import BarChart from "./chart/BarChart";
import axios from "axios";
import { journalContext } from "../context/JournalContext";
import Header from "./Header";

const WeekAnalysis = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null); // Added error state
  const { journals } = useContext(journalContext);

  console.log("journals in weekly analysis: ", journals);
  const fetchData = async () => {
    setIsLoading(true);
    setError(null); // Reset error state
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const res = await axios.get(
        `${import.meta.env.VITE_URL}/journals/fetchData`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("res.data", res.data); // Fixed typo

      const result = res.data;
      console.log("data obtained in week analysis: ", result);
      setData(Array.isArray(result) ? result : []);
    } catch (error) {
      console.error("Error fetching journals:", error);
      setError(error.message); // Set error message
    } finally {
      setIsLoading(false);
    }
  };

  useLayoutEffect(() => {
    console.log("Fetching journals");
    fetchData();
  }, []); // No cleanup needed
  let arr = [];
  if (data) {
    const feels = data.map((d) => d.emotions);

    for (let i = 0; i < feels.length; i++) {
      try {
        arr.push(JSON.parse(feels[i]));
      } catch (e) {
        console.error("Error parsing emotions:", e);
        arr.push(null); // Push null or handle the error as needed
      }
    }
  }

  // Ensure emotions are valid JSON strings before parsing

  return (
    <>
      <div
        className={`   m-10 top-0 left-0 flex flex-col gap-4 z-10 text-left  `}
      >
        <Header />
      </div>
      {isLoading && <p>Loading...</p>} {/* Loading indicator */}
      {error && <p>Error: {error}</p>} {/* Display error message */}
      <div className="chonburi-regular text-cyan-900 text-center">
        <h1>Weekly Analysis</h1>
      </div>
      {/* gather all the journals here */}
      <div>
        <BarChart data={arr} />
      </div>
    </>
  );
};

export default WeekAnalysis;
