import "./StructureAccueil.css";

function StructureAccueil() {
  return (
    <div className="all_structure">
      <div className="title">
        <h2>Vous êtes une structure d’accueil ?</h2>
      </div>
      <div className="accueil_text">
        <p>
          Equipez vous du logiciel de gestion de place d’accueil de jeunes
          enfants le plus complet
        </p>
      </div>
      <div className="all_forimage">
        <div className="forimages_container">
          <h3 id="agenda_structure" className="title_structure">
            Agenda en ligne
          </h3>
          <p className="text_structure" id="text_structure_agenda">
            Consultez en temps reel votre agenda et modifiez le en quelques
            cliques afin d’optimiser votre temps et votre rentabilite.{" "}
          </p>
          <img src="assets/images/1_structure.png" alt="" />
        </div>
        <div className="forimages_container">
          <h3 id="alertee_structure" className="title_structure">
            Soyez alerté
          </h3>
          <p className="text_structure">
            Choisissez le mode de notifications afin d’etre informé au plus vite
            des annulations et des demandes de reservation.
          </p>
          <img src="assets/images/2_structure.png" alt="" />
        </div>
        <div className="forimages_container">
          <h3 className="title_structure">Marketing de votre activité</h3>
          <p className="text_structure">
            Optimisez votre page profil pour vous rendre plus visible et vous
            permettre de vous faire decouvrir par les parents.
          </p>
          <img src="assets/images/3_structure.png" alt="" />
        </div>
        <div className="forimages_container">
          <h3 className="title_structure">Simplifiez votre gestion</h3>
          <p className="text_structure">
            Tout est accessible depuis votre dashboard, avec un compte unique
            par crèche.
          </p>
          <img src="assets/images/4_structure.png" alt="" />
        </div>
      </div>
    </div>
  );
}

export default StructureAccueil;
