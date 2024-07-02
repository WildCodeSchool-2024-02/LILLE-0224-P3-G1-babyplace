import Parent from "../../components/accueil/Parent/Parent";
import Babyplace from "../../components/accueil/Babyplace/Babyplace";
import StructureAccueil from "../../components/accueil/StructureAccueil/StructureAccueil";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import BottomNavbar from "../../components/Bottom_navbar/BottomNavbar";

function Home() {
  return (
    <div>
      <Header />
      <Babyplace />
      <Parent />
      <StructureAccueil />
      <Footer />
      <BottomNavbar />
    </div>
  );
}

export default Home;
