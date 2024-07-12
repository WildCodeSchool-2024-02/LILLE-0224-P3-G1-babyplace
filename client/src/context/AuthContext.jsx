import { createContext, useState, useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import myAxios from "../services/myAxios";

export const AuthContext = createContext(null);

export default function AuthContextProvider({ children }) {
  const [user, setUser] = useState({});
  const [initialLoad, setInitialLoad] = useState(true);

  async function loadDashboardData(role, id) {
    try {
      const response = await myAxios.get(`/api/${role}/${id}`);
      setUser(response.data);
    } catch (error) {
      console.error(`Error loading dashboard data for ${role}`, error);
    }
  }

  useEffect(() => {
    if (initialLoad && user.role) {
      if (user.role === "parent") {
        loadDashboardData("parent", user.parent_id);
      } else if (user.role === "nursery") {
        loadDashboardData("nursery", user.nursery_id);
      } else if (user.role === "moderator") {
        loadDashboardData("moderator", user.moderator_id);
      }
      setInitialLoad(false);
    }
  }, [
    user.role,
    initialLoad,
    user.parent_id,
    user.nursery_id,
    user.moderator_id,
  ]);

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
