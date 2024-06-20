import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";

// page components

import Home from "./pages/Home/Home";
import PageDashboard from "./pages/Dashboard/PageDashboard";
import NurseryDetails from "./pages/NurseryDetails/NurseryDetails";
import NurseriesSearchLille from "./pages/Platform/NurseriesSearchLille";
import NurseriesSearchRennes from "./pages/Platform/NurseriesSearchRennes";
import PageProDashboard from "./pages/Dashboard/PageProDashboard";

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
        path: "/creche/lille",
        element: <NurseriesSearchLille />,
      },
      {
        path: "/creche/rennes",
        element: <NurseriesSearchRennes />,
      },
      {
        path: "/creche/details",
        element: <NurseryDetails />,
      },
      {
        path: "/dashboard",
        element: <PageDashboard />,
      },
      {
        path: "/dashboard/pro",
        element: <PageProDashboard />,
      },
    ],
  },
]);

// rendering

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
