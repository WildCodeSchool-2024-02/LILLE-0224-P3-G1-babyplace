import Parent from "../../components/accueil/Parent/Parent";
import Babyplace from "../../components/accueil/Babyplace/Babyplace";
import StructureAccueil from "../../components/accueil/StructureAccueil/StructureAccueil";
import BottomNavbar from "../../components/Bottom_navbar/BottomNavbar";


function Home() {
  return (
    <div>
      <div>
        <Babyplace />
        <Parent />
        <StructureAccueil />
        <BottomNavbar />
      </div>
    </div>
  );
}

export default Home;
