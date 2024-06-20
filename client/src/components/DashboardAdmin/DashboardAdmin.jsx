import { useState } from "react";
import DashboardAdminPro from "./DashboardAdminPro/DashboardAdminPro";
import DashboardAdminParents from "./DashboardAdminParents/DashboardAdminParents";
import DashboardAdminReservation from "./DashboardAdminReservation/DashboardAdminReservation";
import "./DashboardAdmin.css";

function DashboardAdmin() {
  const [activeTab, setActiveTab] = useState("reservation");

  const handleReservationClick = () => {
    setActiveTab("reservation");
  };

  const handleParentsClick = () => {
    setActiveTab("parents");
  };

  const handleProClick = () => {
    setActiveTab("pro");
  };

  return (
    <div className="all_dashboard_admin">
      <div className="buttons_select_categories">
        <button
          type="button"
          onClick={handleReservationClick}
          className={activeTab === "reservation" ? "active" : ""}
        >
          Réservation
        </button>
        <button
          type="button"
          onClick={handleParentsClick}
          className={activeTab === "parents" ? "active" : ""}
        >
          Parents
        </button>
        <button
          type="button"
          onClick={handleProClick}
          className={activeTab === "pro" ? "active" : ""}
        >
          Professionnels
        </button>
      </div>
      <div>
        {activeTab === "reservation" && (
          <div className="dashboard_admin_reservation">
            <DashboardAdminReservation />
          </div>
        )}
        {activeTab === "parents" && (
          <div className="dashboard_admin_parents">
            <DashboardAdminParents />
          </div>
        )}
        {activeTab === "pro" && (
          <div className="dashboard_admin_pro">
            <DashboardAdminPro />
          </div>
        )}
      </div>
    </div>
  );
}

export default DashboardAdmin;
