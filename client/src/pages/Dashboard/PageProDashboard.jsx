import DashboardPro from "../../components/DashboardPro/DashboardPro";
import Footer from "../../components/Footer/Footer";
import HeaderDashboard from "../../components/Header/HeaderDashboard";
import BottomNavbar from "../../components/Bottom_navbar/BottomNavbar";

function PageProDashboard() {
  return (
    <div>
      <HeaderDashboard />
      <DashboardPro />
      <Footer />
      <BottomNavbar />
    </div>
  );
}

export default PageProDashboard;
