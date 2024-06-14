import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";

// page components

import Home from "./pages/Home/Home";
import Page1 from "./pages/Page/Page";
import NurseryDetails from "./pages/NurseryDetails/NurseryDetails";

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
        path: "/page1",
        element: <Page1 />,
      },
      {
        path: "/Nursery_details",
        element: <NurseryDetails />,
      },
    ],
  },
]);

// rendering

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
