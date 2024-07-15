import { useContext, useState, useCallback } from "react";
import "./Dashboard.css";
import { AuthContext } from "../../context/AuthContext";
import BookingsDashboard from "./BookingsDashboard";
import InformationsForm from "./InformationsForm";

function Dashboard() {
  const { user } = useContext(AuthContext);
  const [selectedButton, setSelectedButton] = useState(null);
  const [selectedChildId, setSelectedChildId] = useState(null);
  const [modifySelected, setModifySelected] = useState(false);
  const [optionSelected, setOptionSelected] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [responseForm, setResponseForm] = useState(false);

  const handleViewList = useCallback((buttonName) => {
    setSelectedButton(buttonName);
  }, []);

  const handleViewDetails = useCallback((childId) => {
    setSelectedChildId(childId);
  }, []);

  const formatDate = (date) => date.split("T")[0];

  // Filtre les réservations de l'utilisateur, selon l'état de celles-ci. Permet d'afficher les réservations selon la catégorie sur laquelle l'utilisateur clique
  const getFilteredBookings = () => {
    if (!user || !user.bookings)
      return [<div key="no-bookings">Pas de réservations !</div>];
    switch (selectedButton) {
      case "A venir":
        return user.bookings.filter((booking) => booking.state === "A venir");
      case "En attente":
        return user.bookings.filter(
          (booking) => booking.state === "En attente"
        );
      case "Passées":
        return user.bookings.filter((booking) => booking.state === "Passée");
      case "Refusées":
        return user.bookings.filter((booking) => booking.state === "Refusée");
      case "Annulées":
        return user.bookings.filter((booking) => booking.state === "Annulée");
      default:
        return [];
    }
  };

  // pour n'afficher les détails que de l'enfant sélectionné
  const selectedChild = user.children.find(
    (child) => child.child_id === selectedChildId
  );

  // fonctions pour gérer l'affichage ou non des options de modifications
  function handleModify() {
    setModifySelected(true);
  }

  // le useCallback sert à mémoriser la fonction entre les rendus (sinon on ne peut pas passer la fonction en props)
  const handleCancelModify = useCallback(() => {
    setModifySelected(false);
    setShowForm(false);
  }, []);

  // fonction pour envoyer la bonne entité à modifier dans le formulaire
  function handleOptions(value) {
    setOptionSelected(value);
    setShowForm(true);
  }

  return (
    <div className="dashboard">
      <div className="head_dashboard">
        <h3 className="dashboard_info">Mon Profil</h3>
      </div>
      <h4>Mes réservations</h4>
      <nav>
        <div className="select_mobile">
          <select
            className="custom_select"
            onChange={(e) => handleViewList(e.target.value)}
          >
            <option value="Sélectionnez">Sélectionnez un état</option>
            <option value="A venir">À venir &ensp;</option>
            <option value="En attente">En attente</option>
            <option value="Passées">Passées</option>
            <option value="Refusées">Refusées</option>
            <option value="Annulées">Annulées</option>
          </select>
        </div>
        <div className="select_desktop">
          <button
            type="button"
            className={selectedButton === "A venir" ? "active" : ""}
            onClick={() => handleViewList("A venir")}
          >
            À venir
          </button>
          <button
            type="button"
            className={selectedButton === "En attente" ? "active" : ""}
            onClick={() => handleViewList("En attente")}
          >
            En attente
          </button>
          <button
            type="button"
            className={selectedButton === "Passées" ? "active" : ""}
            onClick={() => handleViewList("Passées")}
          >
            Passées
          </button>
          <button
            type="button"
            className={selectedButton === "Refusées" ? "active" : ""}
            onClick={() => handleViewList("Refusées")}
          >
            Refusées
          </button>
          <button
            type="button"
            className={selectedButton === "Annulées" ? "active" : ""}
            onClick={() => handleViewList("Annulées")}
          >
            Annulées
          </button>
        </div>
      </nav>
      <BookingsDashboard bookings={getFilteredBookings()} />

      <h4 id="title_informations">Mes Informations</h4>

      <div className="parent_all_info">
        <div className="parent">
          <h5 className="title">Parent</h5>
        </div>

        <div className="general_parent">
          <ul className="parent_info">
            <li className="name_parent_dashboard">
              {user.parent_firstname} {user.parent_lastname}{" "}
              <button
                type="button"
                className={modifySelected ? "change_info_pen" : "hide_pen"}
                onClick={() => {
                  handleOptions("nom et prénom");
                }}
              >
                <img src="/assets/images/pen.svg" alt="pen" />
              </button>
            </li>
            <li>
              {user.parent_adress}{" "}
              <button
                type="button"
                className={modifySelected ? "change_info_pen" : "hide_pen"}
                onClick={() => {
                  handleOptions("adresse");
                }}
              >
                <img src="/assets/images/pen.svg" alt="pen" />
              </button>
            </li>
            <li>
              {user.parent_mail}{" "}
              <button
                type="button"
                className={modifySelected ? "change_info_pen" : "hide_pen"}
                onClick={() => {
                  handleOptions("e-mail");
                }}
              >
                <img src="/assets/images/pen.svg" alt="pen" />
              </button>
            </li>
            <li>
              {user.parent_phone}{" "}
              <button
                type="button"
                className={modifySelected ? "change_info_pen" : "hide_pen"}
                onClick={() => {
                  handleOptions("numéro de téléphone");
                }}
              >
                <img src="/assets/images/pen.svg" alt="pen" />
              </button>
            </li>
            <button
              type="button"
              className={modifySelected ? "change_info_password" : "hide_pen"}
              onClick={() => {
                handleOptions("mot de passe");
              }}
            >
              Modifier mon mot de passe
            </button>
          </ul>
          <div className="modify_info">
            {modifySelected ? (
              <button
                type="button"
                onClick={handleCancelModify}
                className="modify_info_parent"
                id="cancel_modify_parent"
              >
                Annuler{" "}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleModify}
                className="modify_info_parent"
              >
                Modifier mes informations
              </button>
            )}
          </div>
        </div>
      </div>
      {showForm && (
        <InformationsForm
          data={optionSelected}
          handleCancelModify={handleCancelModify}
          setResponseForm={setResponseForm}
        />
      )}
      {responseForm && (
        <div className="modif_submit"> Modification enregistrée ! </div>
      )}
      <h5 className="title">Enfants</h5>

      <div className="children_container">
        {user.children.map((child) => (
          <div key={child.child_id} className="child_info_container">
            <button
              type="button"
              className="child_info"
              onClick={() => handleViewDetails(child.child_id)}
            >
              <p>{child.child_firstname}</p>
            </button>
          </div>
        ))}
        <button type="button" className="child_info">
          <p>+</p>
        </button>
      </div>

      {selectedChild && (
        <div className="child_presentation">
          <p>Prénom : {selectedChild.child_firstname}</p>
          <p>Date de naissance : {formatDate(selectedChild.child_birth)}</p>
          Marche: {selectedChild.walk_status ? "Oui" : "Non"}
          <br />
          Propre: {selectedChild.clean_status ? "Oui" : "Non"}
          <p className="modify_info">Modifier</p>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
