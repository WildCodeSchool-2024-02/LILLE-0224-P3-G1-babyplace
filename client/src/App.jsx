import { Outlet } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";

import "./App.css";
import BottomNavbar from "./components/Bottom_navbar/BottomNavbar";

function App() {
  return (
    <>

      <nav>
        <Link to="/">Home</Link>
        <Link to="/page1">Page 1</Link>
      </nav>

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
