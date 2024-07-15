import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Error404 from "../../components/Error404/Error404";
import PageProDashboard from "./PageProDashboard";
import PageDashboard from "./PageDashboard";
import PageModeratorDashboard from "./PageModeratorDashboard";

function DashboardComponent() {
  const { user } = useContext(AuthContext);

  const userRole = user?.role; 

  let dashboardComponent;

  if (userRole === "parent") {
    dashboardComponent = <PageDashboard />;
  } else if (userRole === "moderator") {
    dashboardComponent = <PageModeratorDashboard />;
  } else if (userRole === "nursery") {
    dashboardComponent = <PageProDashboard />;
  } else {
    dashboardComponent = <Error404 />;
  }

  return dashboardComponent;
}

export default DashboardComponent;
