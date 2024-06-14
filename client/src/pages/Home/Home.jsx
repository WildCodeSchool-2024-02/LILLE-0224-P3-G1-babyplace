import Header from "../../components/Header/Header";
import Parent from "../../components/accueil/Parent/Parent";
import Footer from "../../components/Footer/Footer";
import Babyplace from "../../components/accueil/Babyplace/Babyplace";
import StructureAccueil from "../../components/accueil/StructureAccueil/StructureAccueil";

function Home() {
  return (
    <div>
      <div>
        <Header />
        <Babyplace />
        <Parent />
        <StructureAccueil />
        <Footer />
      </div>
    </div>
  );
}

export default Home;
