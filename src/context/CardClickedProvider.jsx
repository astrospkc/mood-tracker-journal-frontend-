import { createContext, useState } from "react";
import PropTypes from "prop-types";
export const ClickContext = createContext();

const CardClickedProvider = ({ children }) => {
  const [clicked, setClicked] = useState(false);
  return (
    <ClickContext.Provider value={{ clicked, setClicked }}>
      {children}
    </ClickContext.Provider>
  );
};

CardClickedProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CardClickedProvider;
