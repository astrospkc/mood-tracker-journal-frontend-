import card from "../images/theHome.jpg";

import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { BiSolidTrashAlt } from "react-icons/bi";
import axios from "axios";
import { useState } from "react";

const JournalCard = ({ journal }) => {
  const navigate = useNavigate();

  const [isEditOpen, setIsEditOpen] = useState(false);
  const openModal = () => setIsEditOpen((prev) => !prev);
  // const closeModal = () => setIsOpen(false);

  // handling the journal with weekdays journal
  const handleJournalCard = () => {
    // journalArr(journal);
    navigate(`/journals/week/${journal._id}`, {
      state: { journal: journal },
    });
  };

  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    // console.log("journal to delete: ", journal._id);
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_URL}/journals/deleteJournal/${journal._id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!res.ok) {
        alert("Error deleteing journal");
        throw new Error(`Error deleting journal: ${res.statusText}`);
      } else {
        alert("Journal deleted successfully");
        setTimeout(() => {
          window.location.reload();
        }, 300);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  let formattedDate = "";
  if (journal && journal.date) {
    const date = new Date(journal.date);
    const day = date.getUTCDate(); // Get the day of the month (1-31)
    const month = date.getUTCMonth() + 1; // Get the month (0-11, so add 1)
    const year = date.getUTCFullYear(); // Get the full year (YYYY)
    formattedDate = `${day}-${month}-${year}`;
    // console.log(formattedDate);
  }

  return (
    <div className="flex flex-col md:flex-row items-center gap-4 yusei-magic-regular z-10 ">
      <div className="flex flex-col gap-10 w-fit  justify-between items-center shadow-lg shadow-stone-600 rounded-3xl text-white hover:text-yellow-500 bg-slate-950 p-4 px-9 my-3 hover:cursor-pointer hover:scale-95 hover:shadow-yellow-600">
        <div className="flex flex-col gap-2 justify-center items-center">
          <div className=" ">
            <img
              src={card}
              alt=""
              height={400}
              width={400}
              className="rounded-2xl "
              style={{
                clipPath: "polygon(0 0, 100% 0, 100% 85%, 50% 100%, 0 85%)",
              }}
            />
          </div>
          <div onClick={handleJournalCard} className="text-xl md:text-2xl ">
            {journal?.title}{" "}
          </div>
          <div className="text-lg md:text-xl text-gray-500">
            {formattedDate}
          </div>
          <div className=" p-4 rounded-3xlw-fit flex flex-row gap-4 items-center">
            <button
              className="bg-stone-700 p-3 rounded-xl flex flex-row gap-2 hover:shadow-md hover:shadow-slate-400"
              onClick={handleDelete}
            >
              <BiSolidTrashAlt className="text-xl hover:cursor-pointer  text-cyan-500 hover:text-black " />
              <span>delete</span>
            </button>

            <button
              onClick={openModal}
              className="bg-stone-700 p-3 rounded-xl hover:shadow-md hover:shadow-slate-400"
            >
              Edit
            </button>
            {isEditOpen && (
              <div className="fixed inset-0 flex items-center justify-center z-50">
                <div
                  className="fixed inset-0 bg-black opacity-50"
                  // onClick={closeModal}
                ></div>
                <div className="bg-white rounded-lg shadow-lg p-6 z-10 flex flex-col gap-3">
                  <h2 className="text-lg font-bold">Edit journal week</h2>
                  <input
                    type="text"
                    name="title"
                    placeholder="Title of the week"
                    // value={createJournal.title}
                    // onChange={handleChange}
                    className="p-3 bg-stone-500 rounded-3xl text-yellow-300 yusei-magic-regular "
                  />
                  <input
                    type="file"
                    name="title"
                    placeholder="place image"
                    // value={createJournal.title}
                    // onChange={handleChange}
                    className="p-3 bg-stone-500 rounded-3xl text-yellow-300 yusei-magic-regular "
                  />
                  <div className="mt-4 flex justify-end gap-4">
                    <button
                      onClick={openModal}
                      className="px-4 py-2 text-white bg-yellow-400 rounded hover:bg-blue-900"
                    >
                      Close
                    </button>
                    <button
                      // onClick={handleSubmit}
                      className="px-4 py-2 text-white bg-yellow-400 rounded hover:bg-blue-900"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

JournalCard.propTypes = {
  journal: PropTypes.object.isRequired,
};
export default JournalCard;
