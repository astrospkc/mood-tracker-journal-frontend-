import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

export const journalContext = createContext([]);

export const JournalProvider = ({ children }) => {
  // all the journals of the user
  const [journals, setJournals] = useState([]);
  // journals for a week for any journal
  const [weekJournal_Arr, setWeekJournal_Arr] = useState([]);
  const [selectedJournalId, setSelectedJournalId] = useState(0);
  // creating a journal
  const [createJournal, setCreateJournal] = useState({
    title: "",
    journals: [],
  });

  // createing a week journal
  const [dayJournal, setDayJournal] = useState({
    main_title: "",
    title: "",
    body: "",
    user: "",
  });

  const [clickedJournal, setClickedJournal] = useState();
  const [journalLoading, setJournalLoading] = useState(false);

  // const [ai_summary, setAi_Summary] = useState();
  // getting all the journals associated with the user
  const fetchJournals = async () => {
    setJournalLoading(true);
    // setError(null);
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
            Authorization: `Bearer ${token}`, // Ensure token is provided correctly
          },
        }
      );

      const data = res.data;
      console.log("data obtained in journals: ", data);
      setJournals(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching journals:", error);
      // setError(error.message);
    } finally {
      setJournalLoading(false);
    }
  };

  return (
    <>
      <journalContext.Provider
        value={{
          journals,
          setJournals,
          weekJournal_Arr,
          setWeekJournal_Arr,
          createJournal,
          setCreateJournal,
          dayJournal,
          setDayJournal,
          clickedJournal,
          setClickedJournal,
          journalLoading,
          setJournalLoading,
          fetchJournals,
          selectedJournalId,
          setSelectedJournalId,
        }}
      >
        {children}
      </journalContext.Provider>
    </>
  );
};
JournalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
