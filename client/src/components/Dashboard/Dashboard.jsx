import { useContext, useState, useCallback } from "react";
import "./Dashboard.css";
import { AuthContext } from "../../context/AuthContext";
import BookingsDashboard from "./BookingsDashboard";

function Dashboard() {
  const { user } = useContext(AuthContext);
  const [selectedButton, setSelectedButton] = useState(null);
  const [selectedChildId, setSelectedChildId] = useState(null);

  const handleViewList = useCallback((buttonName) => {
    setSelectedButton(buttonName);
  }, []);

  const handleViewDetails = useCallback((childId) => {
    setSelectedChildId(childId);
  }, []);

  const formatDate = (date) => date.split("T")[0];

  const getFilteredBookings = () => {
    if (!user || !user.bookings)
      return [<div key="no-bookings">Pas de réservations !</div>];
    switch (selectedButton) {
      case "A venir":
        return user.bookings.filter((booking) => booking.state === "Validée");
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

  const selectedChild = user.children.find(
    (child) => child.child_id === selectedChildId
  );

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
              {user.parent_firstname} {user.parent_lastname}
            </li>
            <li>{user.parent_adress}</li>
          </ul>
          <ul className="modify_info">
            <li>Modifier mes informations</li>
            <li>Modifier mes coordonnées</li>
          </ul>
        </div>
      </div>

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
