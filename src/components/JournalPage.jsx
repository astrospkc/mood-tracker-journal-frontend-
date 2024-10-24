import React, { useContext, useEffect, useState } from "react";
import JournalCard from "./JournalCard";
import { Link, useNavigate } from "react-router-dom";
import { BsArrowLeftCircleFill } from "react-icons/bs";
import { journalContext } from "../context/JournalContext";

const JournalPage = () => {
  const navigate = useNavigate();
  const { journals, setJournals } = useContext(journalContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleBack = () => {
    navigate("/");
  };

  const fetchJournals = async () => {
    setIsLoading(true);
    setError(null);
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

      const data = await res.json();
      console.log("data obtained in journals: ", data);
      setJournals(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching journals:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJournals();
  }, []); // Added setJournals as dependency

  console.log("journals: ", journals);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-yellow-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-yellow-300"></div>
      </div>
    );
  }

  // if (error) {
  //   return (
  //     <div className="flex justify-center items-center h-screen bg-yellow-100">
  //       <div className="text-red-600 text-center p-4">
  //         <p>Error loading journals: {error}</p>
  //         <button
  //           onClick={fetchJournals}
  //           className="mt-4 bg-yellow-300 px-4 py-2 rounded hover:bg-yellow-400"
  //         >
  //           Try Again
  //         </button>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="flex flex-col bg-yellow-100 p-4 justify-center m-auto w-full items-center overflow-y-scroll min-h-screen">
      <div className="flex flex-row items-center gap-4">
        <BsArrowLeftCircleFill
          onClick={handleBack}
          className="text-xl md:text-3xl hover:text-yellow-50 hover:cursor-pointer"
        />
        <h1 className="chonburi-regular border-b-2 border-black">
          The Journals
        </h1>
      </div>

      <Link to="/journals/week">
        <div className="m-10 rounded-full bg-yellow-300 p-5 hover:cursor-pointer hover:bg-white">
          write another week
        </div>
      </Link>

      <div className="w-full max-w-4xl space-y-4">
        {journals && journals.length > 0 ? (
          journals.map((journal) => (
            <JournalCard key={journal._id} journal={journal} />
          ))
        ) : (
          <div className="text-center py-8 text-gray-600">
            No journals found. Start writing your first journal entry!
          </div>
        )}
      </div>
    </div>
  );
};

export default JournalPage;
