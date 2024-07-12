import Dashboard from "../../components/Dashboard/Dashboard";
import Footer from "../../components/Footer/Footer";
import HeaderDashboard from "../../components/Header/HeaderDashboard";
import BottomNavbar from "../../components/Bottom_navbar/BottomNavbar";

function PageDashboard() {
  return (
    <div>
      <HeaderDashboard />
      <Dashboard />
      <Footer />
      <BottomNavbar />
    </div>
  );
}

export default PageDashboard;
