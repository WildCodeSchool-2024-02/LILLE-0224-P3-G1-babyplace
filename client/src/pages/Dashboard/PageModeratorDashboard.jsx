import DashboardModerator from "../../components/DashboardModerator/DashboardModerator";
import Footer from "../../components/Footer/Footer";
import HeaderDashboard from "../../components/Header/HeaderDashboard";
import BottomNavbar from "../../components/Bottom_navbar/BottomNavbar";

function PageDashboard() {
  return (
    <div>
      <HeaderDashboard />
      <DashboardModerator />
      <Footer />
      <BottomNavbar />
    </div>
  );
}

export default PageDashboard;
