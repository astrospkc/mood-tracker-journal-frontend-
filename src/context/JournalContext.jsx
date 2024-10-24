import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

export const journalContext = createContext([]);

export const JournalProvider = ({ children }) => {
  const [journals, setJournals] = useState([]);

  return (
    <>
      <journalContext.Provider value={{ journals, setJournals }}>
        {children}
      </journalContext.Provider>
    </>
  );
};
JournalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
