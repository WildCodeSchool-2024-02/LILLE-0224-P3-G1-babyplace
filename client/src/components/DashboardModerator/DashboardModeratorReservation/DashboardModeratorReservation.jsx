import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import SearchByName from "../../SearchByName/SearchByName";
import SelectCity from "../../SelectCity/SelectCity";
import "./DashboardModeratorReservation.css";

function DashboardModeratorReservation() {
  const { booking: allBooking } = useLoaderData();
  const [filteredBookings, setFilteredBookings] = useState(allBooking);

  function getStatusClass(state) {
    if (state === "passed") {
      return "dashboard_reservation_agree";
    }
    return state === "pending" ? "dashboard_reservation_disagree" : "";
  }

  const handleSearch = (searchValue) => {
    const filteredBookingsList = allBooking.filter((booking) =>
      booking.account_id.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredBookings(filteredBookingsList);
  };

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
          <SearchByName onSearch={handleSearch} />
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
          <div>
            {filteredBookings.map((reservation) => (
              <div
                id={`dashboard_agree_moderator_${reservation.id}`}
                className="dashboard_reservation_container"
                key={reservation.id}
              >
                <div className={getStatusClass(reservation.state)}>
                  <p>{reservation.state}</p>
                </div>
                <div className="dashboard_reservation_infos">
                  <p>Parent : {reservation.account_id}</p>
                  <p>Enfant : ""</p>
                  <p>Crèche : {reservation.nursery_id}</p>
                  <p>Date : {reservation.booking_operation_date}</p>
                </div>
                <div className="dashboard_reservation_cancel">
                  <button type="button">Annuler la réservation</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardModeratorReservation;
