import { createContext, useState, useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import myAxios from "../services/myAxios";

export const AuthContext = createContext(null);

export default function AuthContextProvider({ children }) {
  const [user, setUser] = useState({});

  async function loadDashboardData(role, id) {
    try {
      const response = await myAxios.get(`/api/${role}/${id}`);
      setUser(response.data);
    } catch (error) {
      console.error(`Error loading dashboard data for ${role}`, error);
    }
  }

  useEffect(() => {
    if (user) {
      if (user.role === "parent") {
        loadDashboardData("parent", user.parent_id);
      } else if (user.role === "nursery") {
        loadDashboardData("nursery", user.nursery_id);
      } else if (user.role === "moderator") {
        loadDashboardData("moderator", user.moderator_id);
      }
    }
  }, [user]);

  const contextValue = useMemo(
    () => ({
      user,
      setUser,
    }),
    [user]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
