import { createContext, useState, useMemo } from "react";
import PropTypes from "prop-types";

export const AuthContext = createContext(null);

export default function AuthContextProvider({ children }) {
  const [user, setUser] = useState({});
  if (user && !user.role) {
    setUser(JSON.parse(sessionStorage.getItem("user")));
  }

  const contextValue = useMemo(
    () => ({
      user,
      setUser,
    }),
    [user, setUser]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
