import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const journalContext = createContext([]);

export const JournalProvider = ({ children }) => {
  // all the journals of the user
  const [journals, setJournals] = useState([]);

  // journals for a week for any journal
  const [weekJournal_Arr, setWeekJournal_Arr] = useState([]);

  // recently click week journal
  const [recentJournal, setRecentJournal] = useState();

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

  // const [ai_summary, setAi_Summary] = useState();

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
          // ai_summary,
          // setAi_Summary,
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
