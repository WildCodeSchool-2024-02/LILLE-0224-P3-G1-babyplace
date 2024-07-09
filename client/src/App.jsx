import { Outlet } from "react-router-dom";
import AuthContextProvider from "./context/AuthContext";
import "./App.css";

function App() {
  return (
    <AuthContextProvider>
      <main>
        <Outlet />
      </main>
    </AuthContextProvider>
  );
}

export default App;
