import { useContext, useState, useCallback, useRef } from "react";
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
      case "Passée":
        return user.bookings.filter((booking) => booking.state === "Passée");
      case "Refusée":
        return user.bookings.filter((booking) => booking.state === "Refusée");
      case "Annulée":
        return user.bookings.filter((booking) => booking.state === "Annulée");
      default:
        return [];
    }
  };

  // pour formater les allergies
  const formatAllergies = (allergies) =>
    Object.keys(allergies)
      .filter((key) => allergies[key] === 1)
      .join(", ");

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
    setSelectedChildId(false);
    setShowForm(true);
  }

  const [showChildForm, setShowChildForm] = useState(false);
  const childFirstNameRef = useRef();
  const childLastNameRef = useRef();
  const childBirthDateRef = useRef();
  const [walkStatus, setWalkStatus] = useState();
  const [cleanStatus, setCleanStatus] = useState();
  const [confirmedChild, setConfirmedChild] = useState(false);

  function handleChildForm() {
    setShowChildForm(true);
  }
  function handleCancelChildForm() {
    setShowChildForm(false);
  }
  const handleSubmitChild = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/child`,
        {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            child_firstname: childFirstNameRef.current.value,
            child_lastname: childLastNameRef.current.value,
            child_birth: childBirthDateRef.current.value,
            walk_status: walkStatus,
            clean_status: cleanStatus,
            parent_id: user.parent_id,
            allergies: null,
          }),
        }
      );

      if (response.status === 201) {
        console.info("Child successfully added");
        setShowChildForm(false);
        setConfirmedChild(true);
      } else {
        const errorData = await response.text();
        console.error("Erreur lors de la soumission:", errorData);
      }
    } catch (err) {
      console.error("Erreur réseau ou autre:", err);
    }
  };
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
            <option value="Passée">Passées</option>
            <option value="Refusée">Refusées</option>
            <option value="Annulée">Annulées</option>
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
            className={selectedButton === "Passée" ? "active" : ""}
            onClick={() => handleViewList("Passée")}
          >
            Passées
          </button>
          <button
            type="button"
            className={selectedButton === "Refusée" ? "active" : ""}
            onClick={() => handleViewList("Refusée")}
          >
            Refusées
          </button>
          <button
            type="button"
            className={selectedButton === "Annulée" ? "active" : ""}
            onClick={() => handleViewList("Annulée")}
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
              {user.parent_mail}
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
        <button type="button" className="child_info" onClick={handleChildForm}>
          <p>+</p>
        </button>
      </div>
      {showChildForm && (
        <div className="child_add_form">
          <h3 className="add_child_title">Ajouter un enfant </h3>
          <p className="p_child_form">
            Si vous souhaitez ajouter un nouvel enfant à votre profil, merci de
            remplir ce formulaire
          </p>
          <form className="form_add_child">
            <br />
            <label htmlFor="child_firstname_form">Prénom</label>
            <br />
            <input
              id="child_firstname_form"
              className="child_add_input"
              ref={childFirstNameRef}
              required
            />
            <br />
            <label htmlFor="child_lastname_form">Nom</label>
            <br />
            <input
              id="child_lastname_form"
              className="child_add_input"
              ref={childLastNameRef}
              required
            />
            <br />
            <label htmlFor="child_birth_form" className="child_subtitles_form">
              Date de naissance
            </label>
            <br />
            <input
              id="child_birth_form"
              type="date"
              ref={childBirthDateRef}
              required
            />
            <br />
            <div className="new_entry_child">
              Votre enfant sait-il marcher ?
            </div>
            <div className="check_box_yes_no">
              <label htmlFor="Oui"> Oui </label>
              <input
                type="radio"
                name="walk_status"
                value="true"
                id="Oui"
                checked={walkStatus === true}
                onChange={() => setWalkStatus(true)}
                required
              />
              <label htmlFor="Non"> Non </label>{" "}
              <input
                type="radio"
                name="walk_status"
                value="false"
                id="Non"
                checked={walkStatus === false}
                onChange={() => setWalkStatus(false)}
                required
              />
            </div>

            <div className="new_entry_child">Votre enfant est-il propre ?</div>
            <div className="check_box_yes_no">
              <label htmlFor="Oui"> Oui </label>
              <input
                type="radio"
                name="clean_status"
                value="true"
                id="Oui"
                checked={cleanStatus === true}
                onChange={() => setCleanStatus(true)}
                required
              />

              <label htmlFor="Non"> Non </label>
              <input
                type="radio"
                name="clean_status"
                value="false"
                id="Non"
                checked={cleanStatus === false}
                onChange={() => setCleanStatus(false)}
                required
              />
            </div>
            <div className="info_add_child">
              Pour toute information complémentaire que vous souhaiteriez
              transmettre à une crèche,{" "}
              <span style={{ fontWeight: "bold" }}>
                nous vous invitons à contacter l'établissement en amont de votre
                réservation
              </span>{" "}
              grâce aux contacts que vous trouverez sur leur page.
            </div>
            <div className="container_buttons_add_child">
              <button
                type="button"
                className="add_button_child"
                onClick={handleSubmitChild}
              >
                Ajouter
              </button>
              <button
                type="button"
                className="cancel_button_child"
                onClick={handleCancelChildForm}
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
      )}
      {confirmedChild && (
        <div className="modif_submit"> Ajout d'enfant enregistré </div>
      )}
      {selectedChild && (
        <div className="child_presentation">
          <p>Prénom : {selectedChild.child_firstname}</p>
          <p>Date de naissance : {formatDate(selectedChild.child_birth)}</p>
          Marche : {selectedChild.walk_status ? "Oui" : "Non"}
          <br />
          Propre : {selectedChild.clean_status ? "Oui" : "Non"}
          <br />
          Allergies :
          {selectedChild.allergies ? (
            formatAllergies(selectedChild.allergies)
          ) : (
            <div>aucune </div>
          )}
          <p className="modify_info">Modifier</p>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
