import { useContext, useEffect, useState } from "react";
import JournalCard from "./JournalCard";
import { Link, useNavigate } from "react-router-dom";
import { BsArrowLeftCircleFill } from "react-icons/bs";
import { journalContext } from "../context/JournalContext";
import { Button } from "@chakra-ui/react";
import axios from "axios";
import Header from "./Header";

const JournalPage = () => {
  const navigate = useNavigate();
  const {
    journals,
    setJournals,
    createJournal,
    setCreateJournal,
    journalLoading,
    setJournalLoading,
    fetchJournals,
  } = useContext(journalContext);

  // const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleBack = () => {
    navigate("/");
  };

  // getting all the journals associated with the user
  // const fetchJournals = async () => {
  //   setIsLoading(true);
  //   // setError(null);
  //   try {
  //     const token = localStorage.getItem("token");
  //     if (!token) {
  //       throw new Error("No authentication token found");
  //     }

  //     const res = await axios.get(
  //       `${import.meta.env.VITE_URL}/journals/fetchData`,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`, // Ensure token is provided correctly
  //         },
  //       }
  //     );
  //     // console.log(res.data);

  //     // if (!res.ok) {
  //     //   throw new Error(`HTTP error! status: ${res.status}`);
  //     // }

  //     const data = res.data;
  //     console.log("data obtained in journals: ", data);
  //     setJournals(Array.isArray(data) ? data : []);
  //   } catch (error) {
  //     console.error("Error fetching journals:", error);
  //     // setError(error.message);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

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
      const res = await axios.post(
        `${import.meta.env.VITE_URL}/journals/addJournal`,
        {
          title: title,
          journals: [],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = res.data;
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

  // console.log("journals: createdJournal: ", journals, createJournal);

  if (journalLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-slate-700">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-yellow-300"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col ">
      {/* <div
        className={`   m-10 top-0 left-0 flex flex-col gap-4 z-10 text-left  `}
      > */}
      <Header />
      {/* </div> */}
      <div className="flex flex-col p-4 justify-center m-auto w-full items-center ">
        <div className="h-[90vh] w-[90vh]  absolute  shadow-lg shadow-stone-800 -top-1/2 left-0 opacity-25 rounded-3xl rotate-45 -z-4 bg-orange-300 "></div>
        <div className="flex flex-row items-center gap-4">
          <BsArrowLeftCircleFill
            onClick={handleBack}
            className="text-xl md:text-3xl hover:text-yellow-50 hover:cursor-pointer"
          />
          <h1 className="chonburi-regular border-b-2 border-black text-orange-300">
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
              <JournalCard
                key={journal._id}
                journal={journal}
                className="hover:cursor-pointer"
              />
            ))
          ) : (
            <div className="text-center py-8 text-gray-600">
              No journals found. Start writing your first journal entry!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JournalPage;
