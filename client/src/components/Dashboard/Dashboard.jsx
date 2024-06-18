import { useState } from "react";
import "./Dashboard.css";

function Dashboard() {
  const [selectedButton, setSelectedButton] = useState(null);

  const handleViewList = (buttonName) => {
    setSelectedButton(buttonName);
  };

  return (
    <div className="dashboard">
      <div className="head_dashboard">
        <h3 className="dashboard_info">Mon Profil</h3>
        <h4>Mes réservations</h4>
      </div>
      <nav>
        <div className="select_mobile">
          <select className="custom_select">
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
      </nav>
      <div className="all_nursery_container">
        <div className="nursery_container">
          <div className="date">
            <p>27/06/2024</p>
          </div>
          <div className="nursery_all_info">
            <img
              className="image_nursery_dashboard"
              alt=""
              src="https://www.vandoeuvre.fr/wp-content/uploads/2021/03/Creche_les_Alizees.jpg"
            />
            <div className="nursery_info">
              <ul>
                <li>
                  <h5>Crèche Picoti Picota</h5>
                </li>
                <li>15h-17h</li>
                <li>Enfant 1 (Pomme)</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="nursery_container">
          <div className="date">
            <p>27/06/2024</p>
          </div>
          <div className="nursery_all_info">
            <img
              className="image_nursery_dashboard"
              alt=""
              src="https://www.vandoeuvre.fr/wp-content/uploads/2021/03/Creche_les_Alizees.jpg"
            />
            <div className="nursery_info">
              <ul>
                <li>
                  <h5>Crèche Picoti Picota</h5>
                </li>
                <li>15h-17h</li>
                <li>Enfant 1 (Pomme)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="parent_info">
        <div className="parent">
          <h4 className="title">Parents</h4>
        </div>
        <div className="container_container">
          <div className="info_container">
            <p className="info">Mes Informations</p>
          </div>
        </div>
      </div>
      <div className="general_parent">
        <ul className="parent_info">
          <li>José Mars</li>
          <li>18 rue Boudet</li>
          <li>59000 LILLE</li>
        </ul>
        <ul className="modify_info">
          <li>modifier mes informations</li>
          <li>modifier mes coordonnées</li>
        </ul>
      </div>
      <div className="children">
        <h4 className="title">Enfants</h4>
        <div className="child">
          <div className="child_info">
            <p>Enfant 1</p>
          </div>
          <div className="child_info">
            <p>Enfant 2</p>
          </div>
          <div className="child_info">
            <p>+</p>
          </div>
        </div>
        <div className="child_presentation">
          <p>Enfant 1</p>
          <p>José Mars</p>
          <p>33 mois</p>
          <p className="modify_info">Modifier</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
