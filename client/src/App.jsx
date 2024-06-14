import { Outlet } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";

import "./App.css";
import BottomNavbar from "./components/Bottom_navbar/BottomNavbar";

function App() {
  return (
    <>
      <Header />

      <main>
        <Outlet />
      </main>
      <Footer />
      <BottomNavbar />
    </>
  );
}

export default App;
