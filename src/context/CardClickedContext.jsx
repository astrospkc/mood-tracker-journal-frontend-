import { createContext, useState } from "react";

const clickContext = createContext(null);

const CardClickedContext = ({ children }) => {
  const [clicked, setClicked] = useState(false);
  return (
    <clickContext.Provider value={{ clicked, setClicked }}>
      {children}
    </clickContext.Provider>
  );
};

export { clickContext, CardClickedContext };
