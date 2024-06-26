import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";
import myAxios from "./services/myAxios";

import App from "./App";

// page components

import Home from "./pages/Home/Home";
import PageDashboard from "./pages/Dashboard/PageDashboard";
import NurseryDetails from "./pages/NurseryDetails/NurseryDetails";
import NurseryRegisterPage from "./pages/Register/nurseryRegisterPage";
import PageLoginPro from "./pages/Login/LoginPro";
import NurseriesSearchLille from "./pages/Platform/NurseriesSearchLille";
import NurseriesSearchRennes from "./pages/Platform/NurseriesSearchRennes";
import PageProDashboard from "./pages/Dashboard/PageProDashboard";
import PageModeratorDashboard from "./pages/Dashboard/PageModeratorDashboard";
import ContactPage from "./pages/Contact/ContactPage";

// router creation
const getDataAddresses = async () => {
  try {
    const [lilleResponse, rennesResponse] = await Promise.all([
      fetch("/addresses/lille-addresses.json"),
      fetch("/addresses/rennes-addresses.json"),
    ]);

    if (!lilleResponse.ok || !rennesResponse.ok) {
      throw new Error("One or both fetch requests failed");
    }

    const lilleData = await lilleResponse.json();
    const rennesData = await rennesResponse.json();

    const combinedData = [...lilleData, ...rennesData];

    return combinedData;
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
        path: "/creche/lille",
        element: <NurseriesSearchLille />,
        loader: async () => {
          const response = await myAxios.get("/api/nursery?city=Lille");
          return response.data;
        },
        action: async ({ request }) => {
          const formData = await request.formData();
          const nurseryId = formData.get("nursery_id");
          const response = await myAxios.post("/api/nursery?city=Lille", {
            nurseryId,
          });
          return redirect(`/nursery/${response.data.insertId}`);
        },
      },
      {
        path: "/creche/rennes",
        element: <NurseriesSearchRennes />,
        loader: async () => {
          const response = await myAxios.get("/api/nursery?city=Rennes");
          return response.data;
        },
        action: async ({ request }) => {
          const formData = await request.formData();
          const nurseryId = formData.get("nursery_id");
          const response = await myAxios.post("/api/nursery&city=Rennes", {
            nurseryId,
          });
          return redirect(`/nursery/${response.data.insertId}`);
        },
      },
      {
        path: "/creche/:id",
        element: <NurseryDetails />,
        loader: async ({ params }) => {
          const response = await myAxios.get(`api/nursery/${params.id}`);
          return response.data;
        },
      },
      {
        path: "/dashboard",
        element: <PageDashboard />,
      },
      {
        path: "/inscription/creche",
        element: <NurseryRegisterPage />,
        loader: getDataAddresses,
      },
      {
        path: "/connexion",
        element: <PageLoginPro />,
      },
      {
        path: "/dashboard/pro",
        element: <PageProDashboard />,
      },
      {
        path: "/dashboard/moderator",
        element: <PageModeratorDashboard />,
      },
      {
        path: "/contact",
        element: <ContactPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
