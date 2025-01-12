import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { UserContext } from "./UserContext";
import axios from "axios";

export const UserProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [user, setUser] = useState();

  const getUser = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_URL}/api/auth/getuser`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    setUser(response.data);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  });

  return (
    <UserContext.Provider
      value={{ getUser, isAuthenticated, setIsAuthenticated, user }}
    >
      {children}
    </UserContext.Provider>
  );
};
UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
