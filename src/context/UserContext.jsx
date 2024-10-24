import { createContext, useState } from "react";
import PropTypes from "prop-types";
export const userContext = createContext(false);

export const UserProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <userContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </userContext.Provider>
  );
};
UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
