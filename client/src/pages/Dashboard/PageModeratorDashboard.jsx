import DashboardModerator from "../../components/DashboardModerator/DashboardModerator";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import BottomNavbar from "../../components/Bottom_navbar/BottomNavbar";

function PageDashboard() {
  return (
    <div>
      <Header />
      <DashboardModerator />
      <Footer />
      <BottomNavbar />
    </div>
  );
}

export default PageDashboard;
