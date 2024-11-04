import { useContext, useEffect } from "react";
import card from "../images/theHome.jpg";
import { journalContext } from "../context/JournalContext";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { BiSolidTrashAlt } from "react-icons/bi";

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
    console.log("journal to delete: ", journal._id);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_URL}/journals/deleteJournal/${journal._id}`,
        {
          method: "DELETE",
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

  return (
    <div className="flex flex-col md:flex-row items-center gap-4">
      <div
        onClick={handleJournalCard}
        className="flex flex-row gap-10 w-fit  justify-between items-center shadow-lg shadow-stone-700 rounded-3xl p-4 px-9 my-3 hover:cursor-pointer hover:bg-yellow-500"
      >
        <div className="text-3xl">{journal?.title} </div>
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
      <BiSolidTrashAlt
        onClick={handleDelete}
        className="text-xl hover:cursor-pointer hover:text-yellow-600"
      />
    </div>
  );
};

JournalCard.propTypes = {
  journal: PropTypes.object.isRequired,
};
export default JournalCard;
