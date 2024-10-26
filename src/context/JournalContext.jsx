import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const journalContext = createContext([]);

export const JournalProvider = ({ children }) => {
  const [journals, setJournals] = useState([]);
  // journals for a week
  const [weekjournal_Arr, setWeekJournal_Arr] = useState([]);
  const [recentJournal, setRecentJournal] = useState();

  return (
    <>
      <journalContext.Provider
        value={{
          journals,
          setJournals,
          weekjournal_Arr,
          setWeekJournal_Arr,
          recentJournal,
          setRecentJournal,
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
