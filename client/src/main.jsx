import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";

// page components

import Home from "./pages/Home/Home";
import NurseryDetails from "./pages/NurseryDetails/NurseryDetails";
import NurseriesSearch from "./pages/Platform/NurseriesSearch";
import ParentAccount from "./pages/ParentAccount/ParentAccount";
import ChildForm from "./pages/ChildForm/ChildForm";

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
        path: "/ParentAccount",
        element: <ParentAccount />,
      },
      {
        path: "/ChildForm",
        element: <ChildForm />,
      },
    ],
  },
]);

// rendering

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
