import { Link, Outlet } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/page1">Page 1</Link>
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
