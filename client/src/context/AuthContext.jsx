import { createContext, useState, useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import myAxios from "../services/myAxios";

export const AuthContext = createContext(null);

export default function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const response = await myAxios.get(`/api/parent/5`);
        setUser(response.data);
      } catch (error) {
        console.error("Error loading dashboard data:", error);
      }
    }
    loadDashboardData();
  }, []);

  useEffect(() => {
    async function loadDashboardDataAdmin() {
      try {
        const response = await myAxios.get(`/api/moderator/1`);
        setUser(response.data);
      } catch (error) {
        console.error("Error loading dashboard data:", error);
      }
    }
    loadDashboardDataAdmin();
  }, []);

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
