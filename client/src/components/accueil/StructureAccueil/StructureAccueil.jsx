import "./StructureAccueil.css";

function StructureAccueil() {
  return (
    <div className="all_structure">
      <div className="accueil_text">
        <h1>Vous êtes une structure d’accueil ?</h1>
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
            cliques afin d’optimiser votre temps et votre rentabilite.
            Accessible de puis votre smartphone ou tablette{" "}
          </p>
          <img src="assets/images/1_structure.png" alt="Agenda" />
        </div>
        <div className="forimages_container">
          <h3 id="alertee_structure" className="title_structure">
            Soyez alertee
          </h3>
          <p className="text_structure">
            Choisissez le mode de notifications afin d’etre informe au plus vote
            des annulations et des demandes de reservation.
          </p>
          <img src="assets/images/2_structure.png" alt="Alerte" />
        </div>
        <div className="forimages_container">
          <h3 className="title_structure">Marketing de votre activité</h3>
          <p className="text_structure">
            Optimisez votre page profil pour vous rendre plus visible et vous
            permettre de vous decouvrir par les parents de votre quartier.{" "}
          </p>
          <img src="assets/images/3_structure.png" alt="marketing" />
        </div>
        <div className="forimages_container">
          <h3 className="title_structure">Communiquez avec les parents</h3>
          <p className="text_structure">
            Les parents doivent avoir prerempliss leur liste de documents pour
            pouvoir faire des reservations.
          </p>
          <img src="assets/images/4_structure.png" alt="talk" />
        </div>
      </div>
    </div>
  );
}

export default StructureAccueil;
