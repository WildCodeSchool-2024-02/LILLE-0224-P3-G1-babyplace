import Header from "../../components/Header/Header";
import Parent from "../../components/Parent/Parent";
import Footer from "../../components/Footer/Footer";
import Babyplace from "../../components/Babyplace/Babyplace";
import StructureAccueil from "../../components/StructureAccueil/StructureAccueil";

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
