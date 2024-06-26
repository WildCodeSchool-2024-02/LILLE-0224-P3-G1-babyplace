import { useState } from "react";
import "./DashboardPro.css";

function DashboardPro() {
  const [selectedButton, setSelectedButton] = useState(null);

  const handleViewList = (buttonName) => {
    setSelectedButton(buttonName);
  };

  return (
    <div>
      <div className="message_pro_container">
        <div className="message_pro_dashboard">
          <h3>Espace Pro</h3>
          <p>
            Bienvenue dans votre espace professionnel. Ici, nous vous proposons
            d’ajouter à votre fiche crèche vos créneaux disponibles dans les 15
            prochains jours.Si un parent inscrit son enfant, vous recevrez une
            alerte sur notre site pour pouvoir confirmer ou non sa réservation.{" "}
          </p>
        </div>
      </div>
      <div className="creche_info_container">
        <div className="container_dashboard_pro_section">
          <div className="info_container_pro">
            <p className="info_pro">Mon Profil</p>
          </div>
        </div>
        <h4 className="creche_name">Crèche Picotti Picotta</h4>
        <div className="creche_info">
          <div className="creche_location">
            <div className="creche_adress">
              <p>18 rue de Boudet</p>
              <p>59000, Lille</p>
            </div>

            <div className="creche_contact">
              <p className="creche_number">+33.7.83.98.04.52</p>
              <p className="creche_mail">contact@picotti.fr</p>
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
      </div>
      <div className="container_dashboard_pro_section">
        <div className="info_container_pro">
          <p className="info_pro">Gérer les réservations</p>
        </div>
      </div>
      <div>
        <select className="select_mobile">
          <option value="1">À venir &ensp;</option>
          <option value="2">En attente</option>
          <option value="3">Passées</option>
          <option value="4">Refusées</option>
          <option value="5">Annulées</option>
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
      <p className="reservation_date">31/06/2024</p>
      <div className="reservation">
        <div className="reservation_card">
          <p className="statut_reservation">accepté</p>
          <img
            className="avatar_dashboard_pro"
            alt=""
            src="/public/assets/images/avatar_bottom_active.svg"
          />
          <div className="reservation_info">
            <p>Parent: Benoit Mezaguer</p>
            <p>Enfant 1 (Pomme)</p>
            <p>Matin</p>
          </div>
        </div>
        <div className="reservation_card">
          <p className="statut_reservation">accepté</p>
          <img
            className="avatar_dashboard_pro"
            alt=""
            src="/public/assets/images/avatar_bottom_active.svg"
          />
          <div className="reservation_info">
            <p>Parent: Benoit Mezaguer</p>
            <p>Enfant 1 (Pomme)</p>
            <p>Matin</p>
          </div>
        </div>
        <div className="reservation_card">
          <p className="statut_reservation">accepté</p>
          <img
            className="avatar_dashboard_pro"
            alt=""
            src="/public/assets/images/avatar_bottom_active.svg"
          />
          <div className="reservation_info">
            <p>Parent: Benoit Mezaguer</p>
            <p>Enfant 1 (Pomme)</p>
            <p>Matin</p>
          </div>
        </div>
        <div className="reservation_card">
          <p className="statut_reservation">accepté</p>
          <img
            className="avatar_dashboard_pro"
            alt=""
            src="/public/assets/images/avatar_bottom_active.svg"
          />
          <div className="reservation_info">
            <p>Parent: Benoit Mezaguer</p>
            <p>Enfant 1 (Pomme)</p>
            <p>Matin</p>
          </div>
        </div>
        <div className="reservation_card">
          <p className="statut_reservation">accepté</p>
          <img
            className="avatar_dashboard_pro"
            alt=""
            src="/public/assets/images/avatar_bottom_active.svg"
          />
          <div className="reservation_info">
            <p>Parent: Benoit Mezaguer</p>
            <p>Enfant 1 (Pomme)</p>
            <p>Matin</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default DashboardPro;
