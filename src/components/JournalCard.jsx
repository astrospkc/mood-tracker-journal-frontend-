import card from "../images/theHome.jpg";

import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { BiSolidTrashAlt } from "react-icons/bi";
import axios from "axios";

const JournalCard = ({ journal }) => {
  const navigate = useNavigate();

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
      <div
        onClick={handleJournalCard}
        className="flex flex-row gap-10 w-fit  justify-between items-center shadow-lg shadow-stone-700 rounded-3xl text-white hover:text-black bg-slate-800 p-4 px-9 my-3 hover:cursor-pointer hover:bg-yellow-500"
      >
        <div className="flex flex-col gap-2">
          <div className="text-3xl ">{journal?.title} </div>
          <div className="text-xl text-gray-500">{formattedDate}</div>
        </div>

        <div className="">
          <img
            src={card}
            alt=""
            height={400}
            width={400}
            className="rounded-2xl"
          />
        </div>
      </div>
      <div className="border-2 border-gray-400 p-4 rounded-3xl hover:bg-yellow-500">
        <BiSolidTrashAlt
          onClick={handleDelete}
          className="text-xl hover:cursor-pointer text-cyan-500 hover:text-yellow-600 "
        />
      </div>
    </div>
  );
};

JournalCard.propTypes = {
  journal: PropTypes.object.isRequired,
};
export default JournalCard;
