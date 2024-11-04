import { a } from "framer-motion/client";
import React, { useEffect, useState } from "react";
import BarChart from "./chart/BarChart";

const WeekAnalysis = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    // setError(null);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const res = await fetch(
        `${import.meta.env.VITE_URL}/journals/fetchData`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Fixed typo in "authorization"
          },
        }
      );

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const result = await res.json();
      console.log("data obtained in week analysis: ", result);
      setData(Array.isArray(result) ? result : []);
    } catch (error) {
      console.error("Error fetching journals:", error);
      // setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log("Fetching journals");
    fetchData();
    return () => {
      console.log("");
    };
  }, []);

  console.log("data: ", data);
  const feels = data.map((d) => d.emotions);
  console.log("feels: ", feels);
  let arr = [];
  for (let i = 0; i < feels.length; i++) {
    arr.push(JSON.parse(feels[i]));
  }
  console.log("arr: ", arr);

  return (
    <>
      <div>
        <BarChart data={arr} />
      </div>
    </>
  );
};

export default WeekAnalysis;
