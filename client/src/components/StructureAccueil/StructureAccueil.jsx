import "./StructureAccueil.css";

function StructureAccueil() {
  return (
    <div>
      <div className="accueil_text">
        <h1>Vous êtes une structure d’accueil ?</h1>
        <p>
          Equipez vous du logiciel de gestion de place d’accueil de jeunes
          enfants le plus complet
        </p>
      </div>
      <div className="forimages_container">
        <img src="assets/images/forimages.png" alt="" />
      </div>
    </div>
  );
}

export default StructureAccueil;
