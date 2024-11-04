import { createContext, useState } from "react";

export const RefContext = createContext();

export const RefProvider = ({ children }) => {
  const [content, setContent] = useState();

  return (
    <RefContext.Provider value={{ content, setContent }}>
      {children}
    </RefContext.Provider>
  );
};
