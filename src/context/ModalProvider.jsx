import React, { createContext, useState } from "react";
import PropTypes from "prop-types";
export const modalContext = createContext(false);

export const ModalProvider = ({ children }) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <modalContext.Provider value={{ openModal, setOpenModal }}>
      {children}
    </modalContext.Provider>
  );
};
ModalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
