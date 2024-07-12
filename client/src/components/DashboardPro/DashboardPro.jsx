import { useState, useContext } from "react";
import CalendarDashboard from "./CalendarDashboard";
import { AuthContext } from "../../context/AuthContext";
import BookingsPro from "./BookingsPro";
import "./DashboardPro.css";

function DashboardPro() {
  const { user } = useContext(AuthContext);
  const [selectedButton, setSelectedButton] = useState(null);

  const handleViewList = (buttonName) => {
    setSelectedButton(buttonName);
  };

  const getFilteredBookings = () => {
    if (!user || !user.bookings)
      return [<div key="no-bookings">Pas de réservations !</div>];
    switch (selectedButton) {
      case "Libre":
        return user.bookings.filter((booking) => booking.state === "Libre");
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

  return (
    <div>
      <div className="message_pro_container">
        <div className="message_pro_dashboard">
          <h3>Espace Pro</h3>
          <p>
            Bienvenue dans votre espace professionnel. Ici, nous vous proposons
            d’ajouter à votre fiche crèche vos créneaux disponibles dans les
            prochaines semaines.{" "}
          </p>
        </div>
      </div>

      <div className="creche_info_container">
        <div className="info_container_pro">
          <p className="info_pro">Mon Profil</p>
        </div>
        <div className="profile_pictures_container">
          <img src={user.image1} className="profile_picture" alt="crèche" />
          <img
            src={user.image2}
            className="profile_picture"
            id="profile_picture_2"
            alt="crèche"
          />
          <img
            src={user.image3}
            className="profile_picture"
            id="profile_picture_3"
            alt="crèche"
          />
        </div>
        <h4 className="creche_name">{user.nursery_name}</h4>

        <div className="creche_info">
          <div className="creche_location">
            <div className="creche_adress">
              <p>
                {user.nursery_street_number} {user.nursery_street} {user.city}
              </p>
            </div>

            <div className="creche_contact">
              <p className="creche_number">{user.nursery_phone}</p>
              <p className="creche_mail">{user.nursery_mail}</p>
            </div>
          </div>
          <ul className="modify_info">
            <li>Modifier mes informations</li>
            <li>Modifier mes coordonnées</li>
          </ul>
        </div>
      </div>
      <div className="container_dashboard_pro_section">
        <div className="info_container_pro">
          <p className="info_pro">Gérer les créneaux</p>
        </div>
        <CalendarDashboard user={user} />
      </div>
      <div className="container_dashboard_pro_section">
        <div className="info_container_pro">
          <p className="info_pro">Gérer les réservations</p>
        </div>
      </div>
      <div>
        <select
          className="custom_select"
          onChange={(e) => handleViewList(e.target.value)}
        >
          <option value="Sélectionnez">Sélectionnez un état</option>
          <option value="Libre">Libre &ensp;</option>
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
          className={selectedButton === "Libre" ? "active" : ""}
          onClick={() => handleViewList("Libre")}
        >
          Libre
        </button>
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

      <BookingsPro bookings={getFilteredBookings()} nursery={user} />
    </div>
  );
}
export default DashboardPro;
