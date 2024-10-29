import { useContext, useEffect } from "react";
import card from "../images/theHome.jpg";
import { journalContext } from "../context/JournalContext";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const JournalCard = ({ journal }) => {
  const navigate = useNavigate();

  // const journalArr = async (rec_journal) => {
  //   const token = localStorage.getItem("token");
  //   // console.log("token: ", token);
  //   const id = rec_journal._id;

  //   try {
  //     if (id) {
  //       const res = await fetch(
  //         `${import.meta.env.VITE_URL}/weekJournals/fetchJournal/${id}`,
  //         {
  //           method: "GET",
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );
  //       const data = await res.json();
  //       setWeekJournal_Arr([...data]);
  //       // console.log("data: ", data);
  //       // navigate("/journals/week/");
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // useEffect(() => {
  //   journalArr(journal);
  //   setRecentJournal(journal);
  //   console.log("week journal: ", weekjournal_Arr);
  // }, []);

  // handling the journal with weekdays journal
  const handleJournalCard = () => {
    // journalArr(journal);
    navigate(`/journals/week/${journal._id}`, {
      state: { journal: journal },
    });
  };

  return (
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
          className="rounded-xl"
        />
      </div>
    </div>
  );
};

JournalCard.propTypes = {
  journal: PropTypes.object.isRequired,
};
export default JournalCard;
