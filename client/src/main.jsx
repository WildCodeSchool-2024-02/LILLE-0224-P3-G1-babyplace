import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";

// page components

import Home from "./pages/Home/Home";
import PageDashboard from "./pages/Page/PageDashboard";
import NurseryDetails from "./pages/NurseryDetails/NurseryDetails";
import NurseriesSearch from "./pages/Platform/NurseriesSearch";
import NurseryRegisterForm from "./components/Forms/NurseryRegisterForm";

// router creation

const getDataAddresses = async () => {
  try {
    const response = await fetch("/addresses/lille-addresses.json");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data: ", error);
    return [];
  }
};
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
        path: "/creche/details",
        element: <NurseryDetails />,
      },
      {
        path: "/dashboard",
        element: <PageDashboard />,
      },
      {
        path: "/inscription/creche",
        element: <NurseryRegisterForm />,
        loader: getDataAddresses,
      },
    ],
  },
]);

// rendering

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
