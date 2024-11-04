import { useContext, useEffect, useState } from "react";
import JournalCard from "./JournalCard";
import { Link, useNavigate } from "react-router-dom";
import { BsArrowLeftCircleFill } from "react-icons/bs";
import { journalContext } from "../context/JournalContext";
import { Button } from "@chakra-ui/react";

const JournalPage = () => {
  const navigate = useNavigate();
  const { journals, setJournals, createJournal, setCreateJournal } =
    useContext(journalContext);

  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleBack = () => {
    navigate("/");
  };

  // getting all the journals associated with the user
  const fetchJournals = async () => {
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

      const data = await res.json();
      console.log("data obtained in journals: ", data);
      setJournals(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching journals:", error);
      // setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log("Fetching journals");
    fetchJournals();
    return () => {
      console.log("");
    };
  }, []); // Added setJournals as dependency

  const createWeekJournal = async (title) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${import.meta.env.VITE_URL}/journals/addJournal`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: title,
            journals: [],
          }),
        }
      );

      const data = await res.json();
      setJournals([data, ...journals]);
      setCreateJournal(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setCreateJournal({ ...createJournal, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createWeekJournal(createJournal.title);
    closeModal();
  };

  console.log("journals: createdJournal: ", journals, createJournal);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-yellow-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-yellow-300"></div>
      </div>
    );
  }

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

      {/* open a modal */}
      <button
        onClick={openModal}
        className="p-4 bg-yellow-400 hover:bg-stone-400 rounded  my-4 "
      >
        Open Modal
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={closeModal}
          ></div>
          <div className="bg-white rounded-lg shadow-lg p-6 z-10">
            <h2 className="text-lg font-bold">Create a journal week</h2>
            <input
              type="text"
              name="title"
              placeholder="Title of the week"
              value={createJournal.title}
              onChange={handleChange}
              className="p-3 bg-stone-500 rounded-3xl text-yellow-300 yusei-magic-regular "
            />
            <div className="mt-4 flex justify-end gap-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 text-white bg-yellow-400 rounded hover:bg-blue-900"
              >
                Close
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 text-white bg-yellow-400 rounded hover:bg-blue-900"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="w-full max-w-4xl space-y-4">
        {journals && journals.length > 0 ? (
          journals.map((journal) => (
            <>
              <JournalCard
                key={journal._id}
                journal={journal}
                className="hover:cursor-pointer"
              />
            </>
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
