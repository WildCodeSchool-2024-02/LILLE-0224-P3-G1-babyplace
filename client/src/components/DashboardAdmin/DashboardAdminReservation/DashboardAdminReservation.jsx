import "./DashboardAdminReservation.css";

function DashboardAdminReservation() {
  return (
    <div>
      <div className="dashboard_reservation_filter">
        <div className="dashboard_reservation_lille">
          <select className="reservation_select">
            <option value="0" disabled selected>
              Choisissez une ville
            </option>
            <option value="1">Lille &ensp;</option>
            <option value="2">Renne</option>
          </select>
        </div>
        <div className="dashboard_reservation_select_date">
          <p id="dashboard_reservation_p">Trier par date</p>
        </div>
        <div className="reservation_search_name">
          <div className="dashboard_reservation_container_input">
            <input
              className="dashboard_reservation_input"
              id="search_dashboard_admin"
              type="search"
              name="search-form"
              placeholder="Rechercher par nom:"
              value=""
            />
          </div>
        </div>
      </div>
      <div className="dashboard_reservation_title">
        <h1>Lille</h1>
      </div>
      <div className="dashboard_reservation_h2">
        <h2>Gérer les réservations</h2>
      </div>
      <div className="dashboard_reservation_date">
        <h3>31/06/2024</h3>
        <div className="dashboard_reservation_creche">
          <p>Crèche Picoti Picota</p>
        </div>
        <div className="dashboard_reservation_all_container">
          <div
            id="dashboard_agree_admin"
            className="dashboard_reservation_container"
          >
            <div className="dashboard_reservation_agree">
              <p>accepté</p>
            </div>
            <div className="dashboard_reservation_infos">
              <img src="" alt="" />
              <p>Parent : Benoît Mezaguer</p>
              <p>Enfant 1(Pomme)</p>
              <p>Matin</p>
            </div>
            <div className="dashboard_reservation_cancel">
              <button type="button">Annuler la réservation</button>
            </div>
          </div>
          <div className="dashboard_reservation_container">
            <div className="dashboard_reservation_disagree">
              <p>disagree</p>
            </div>
            <div className="dashboard_reservation_infos">
              <img src="" alt="" />
              <p>Parent : Benoît Mezaguer</p>
              <p>Enfant 2(Poire)</p>
              <p>Matin</p>
            </div>
            <div className="dashboard_reservation_cancel">
              <button type="button">Annuler la réservation</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardAdminReservation;
