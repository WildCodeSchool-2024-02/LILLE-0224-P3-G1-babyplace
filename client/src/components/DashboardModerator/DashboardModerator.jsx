import { useState } from "react";
import DashboardModeratorPro from "./DashboardModeratorPro/DashboardModeratorPro";
import DashboardModeratorParents from "./DashboardModeratorParents/DashboardModeratorParents";
import DashboardModeratorReservation from "./DashboardModeratorReservation/DashboardModeratorReservation";
import "./DashboardModerator.css";

function DashboardModerator() {
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
    <div className="all_dashboard_moderator">
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
          <div className="dashboard_moderator_reservation">
            <DashboardModeratorReservation />
          </div>
        )}
        {activeTab === "parents" && (
          <div className="dashboard_moderator_parents">
            <DashboardModeratorParents />
          </div>
        )}
        {activeTab === "pro" && (
          <div className="dashboard_moderator_pro">
            <DashboardModeratorPro />
          </div>
        )}
      </div>
    </div>
  );
}

export default DashboardModerator;
