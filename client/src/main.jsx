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

import NurseryDetails from "./pages/NurseryDetails/NurseryDetails";
import NurseryRegisterPage from "./pages/Register/nurseryRegisterPage";
import PageLoginPro from "./pages/Login/LoginPro";
import NurseriesSearchLille from "./pages/Platform/NurseriesSearchLille";
import NurseriesSearchRennes from "./pages/Platform/NurseriesSearchRennes";
import ContactPage from "./pages/Contact/ContactPage";
import ParentForm from "./components/accueil/ParentForm/ParentForm";
import ChildForm from "./components/accueil/ChildForm/ChildForm";
import DashboardComponent from "./pages/Dashboard/DashboardComponent";

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
        element: <PageLoginPro />,
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
          const response = await myAxios.post("/api/nursery?city=Rennes", {
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
        path: "/inscription/creche",
        element: <NurseryRegisterPage />,
        loader: getDataAddresses,
      },

      {
        path: "/inscription/parent",
        element: <ParentForm />,
      },
      {
        path: "/inscription/enfant",
        element: <ChildForm />,
      },
      {
        path: "/accueil",
        element: <Home />,
      },
      {
        path: "/dashboard",
        element: <DashboardComponent />,
        loader: async () => {
          const [parentsResponse, nurseryResponse, bookingResponse] =
            await Promise.all([
              myAxios.get("/api/parent"),
              myAxios.get("/api/nursery"),
              myAxios.get("/api/booking-operation"),
            ]);

          return {
            parents: parentsResponse.data,
            nurseries: nurseryResponse.data,
            booking: bookingResponse.data,
          };
        },
        action: async ({ request }) => {
          const formData = await request.formData();

          if (formData.has("parent_id")) {
            const parentId = formData.get("parent_id");
            const response = await myAxios.post("/api/parent", {
              parentId,
            });
            return redirect(`/parent/${response.data.insertId}`);
          }

          if (formData.has("nursery_id")) {
            const nurseryId = formData.get("nursery_id");
            const response = await myAxios.post("/api/nursery", {
              nurseryId,
            });
            return redirect(`/nursery/${response.data.insertId}`);
          }
          if (formData.has("booking_operation_id")) {
            const bookingId = formData.get("booking_operation_id");
            const response = await myAxios.post("/api/booking-operation", {
              bookingId,
            });
            return redirect(`/booking-operation/${response.data.insertId}`);
          }

          return null;
        },
      },
      { path: "/contact", element: <ContactPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
