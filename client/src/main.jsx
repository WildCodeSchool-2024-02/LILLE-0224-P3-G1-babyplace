import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";

// page components

import Home from "./pages/Home/Home";
import PageDashboard from "./pages/Page/PageDashboard";
import NurseryDetails from "./pages/NurseryDetails/NurseryDetails";
import NurseriesSearch from "./pages/Platform/NurseriesSearch";


// router creation

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/creche",
        element: <NurseriesSearch />,
      },
      {
        path: "/NurseryDetails",
        element: <NurseryDetails />,
      },
      {
        path: "/page2",
        element: <PageDashboard />,
      },
      
    ],
  },
]);

// rendering

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
