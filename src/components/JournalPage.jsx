import { useContext, useEffect, useState } from "react";
import JournalCard from "./JournalCard";
import { useNavigate } from "react-router-dom";
import { BsArrowLeftCircleFill } from "react-icons/bs";
import { journalContext } from "../context/JournalContext";
import axios from "axios";

import { UserContext } from "../context/UserContext";

const JournalPage = () => {
  const navigate = useNavigate();
  const {
    journals,
    setJournals,
    createJournal,
    setCreateJournal,
    journalLoading,

    fetchJournals,
  } = useContext(journalContext);

  const { isAuthenticated } = useContext(UserContext);

  // const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleBack = () => {
    navigate("/");
  };

  useEffect(() => {
    console.log("Fetching journals");
    fetchJournals();
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
      <div className="flex justify-center items-center h-screen bg-transparent">
        <div className="animate-spin rounded-full border-t-2 border-b-2 border-yellow-300"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div>
        <button>SignUp</button>
        <button>SignIn</button>
      </div>
    );
  }

  return (
    <>
      {/* <div className="flex flex-col "> */}
      <div className="flex flex-col p-4 justify-center m-auto w-full items-center ">
        {/* <div className="h-[90vh] w-[90vh]  absolute  shadow-lg shadow-stone-800  left-0 opacity-25 rounded-3xl rotate-45  bg-orange-300 "></div> */}
        <div className="flex flex-row items-center gap-4 z-10 ">
          <BsArrowLeftCircleFill
            onClick={handleBack}
            className="text-xl md:text-3xl hover:text-yellow-50 hover:cursor-pointer"
          />
          <div className="font-serif  border-b-2 border-black text-orange-300 text-6xl">
            Journals
          </div>
        </div>

        {/* open a modal */}
        <button
          onClick={openModal}
          className="p-4 bg-yellow-400 hover:bg-stone-400 rounded z-50 my-4 "
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

        <div className="w-full max-w-4xl space-y-4 z-10 grid grid-cols-1 gap-4 md:grid-cols-3 justify-center items-center h-full font-serif">
          {journals && journals.length > 0 ? (
            journals.map((journal) => (
              <JournalCard
                key={journal._id}
                journal={journal}
                className="hover:cursor-pointer"
              />
            ))
          ) : (
            <div className="flex text-center py-8 text-yellow-500">
              No journals found. Start writing your first journal entry!
            </div>
          )}
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default JournalPage;
