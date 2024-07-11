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

  useEffect(() => {
    async function loadDashboardDataNursery() {
      try {
        const response = await myAxios.get(`/api/nursery/3`);
        setNurseryUser(response.data);
      } catch (error) {
        console.error("Error loading dashboard data:", error);
      }
    }
    loadDashboardDataNursery();
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
