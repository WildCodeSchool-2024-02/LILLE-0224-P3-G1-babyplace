import SelectCity from "../../SelectCity/SelectCity";
import SearchByName from "../../SearchByName/SearchByName";
import "./DashboardAdminReservation.css";

function DashboardAdminReservation() {
  return (
    <div>
      <div className="dashboard_reservation_filter">
        <div className="dashboard_reservation_lille">
          <SelectCity />
        </div>
        <div className="dashboard_reservation_select_date">
          <p id="dashboard_reservation_p">Trier par date</p>
        </div>
        <div className="reservation_search_name">
          <SearchByName />
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
            <div className="dashboard_admin_reservation_logo_container">
              <img
                className="dashboard_admin_reservation_logo"
                src="/public/assets/images/avatar_bottom_active.svg"
                alt=""
              />
            </div>
            <div className="dashboard_reservation_infos">
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
              <p>refusé</p>
            </div>
            <div className="dashboard_admin_reservation_logo_container">
              <img
                className="dashboard_admin_reservation_logo"
                src="/public/assets/images/avatar_bottom_active.svg"
                alt=""
              />
            </div>
            <div className="dashboard_reservation_infos">
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
