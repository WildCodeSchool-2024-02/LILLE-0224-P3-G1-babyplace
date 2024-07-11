import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import AuthContextProvider from "./context/AuthContext";
import "./App.css";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
 

function App() {
  return (
    <AuthContextProvider>
      <ScrollToTop /> 
      <main>
        <Outlet />
      </main>
    </AuthContextProvider>
  );
}

export default App;
