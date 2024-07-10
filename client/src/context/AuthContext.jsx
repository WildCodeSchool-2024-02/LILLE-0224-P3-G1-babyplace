import { createContext, useState, useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import myAxios from "../services/myAxios";

export const AuthContext = createContext(null);

export default function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [nurseryUser, setNurseryUser] = useState(null);

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

  const contextValue = useMemo(
    () => ({
      nurseryUser,
      user,
      setUser,
      setNurseryUser,
    }),
    [user, setUser, nurseryUser, setNurseryUser]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};