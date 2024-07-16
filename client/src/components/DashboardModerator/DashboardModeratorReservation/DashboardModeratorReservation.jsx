import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import SearchByName from "../../SearchByName/SearchByName";
import SelectCity from "../../SelectCity/SelectCity";
import "./DashboardModeratorReservation.css";

function DashboardModeratorReservation() {
  const { booking: allBooking } = useLoaderData();
  const [filteredBookings, setFilteredBookings] = useState(allBooking);

  const formatDate = (date) => date.split("T")[0];

  function getStatusClass(state) {
    if (state === "Passée") {
      return "dashboard_reservation_agree";
    }
    return state === "En attente" ? "dashboard_reservation_disagree" : "";
  }

  const handleSearch = (searchValue) => {
    const filteredBookingsList = allBooking.filter((booking) =>
      booking.account_id.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredBookings(filteredBookingsList);
  };

  const cancelBooking = async (id) => {
    try {
      if (!id) {
        return;
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/booking-operation/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const updatedBookings = filteredBookings.filter(
          (booking) => booking.booking_operation_id !== id
        );
        setFilteredBookings(updatedBookings);
      } else {
        console.error("Failed to cancel booking");
      }
    } catch (error) {
      console.error("Error cancelling booking:", error);
    }
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

      <div className="dashboard_reservation_all_container">
        <div>
          {filteredBookings.map((reservation) => (
            <div
              id={`dashboard_agree_moderator_${reservation.id}`}
              className="dashboard_reservation_container"
              key={reservation.id}
            >
              <div
                className={getStatusClass(reservation.state)}
                id="dashboard_reservation_state_container"
              >
                <p className="dashboard_reservation_state">
                  {reservation.state}
                </p>
              </div>
              <div className="dashboard_reservation_infos">
                <p>
                  Parent : {reservation.parent_firstname}{" "}
                  {reservation.parent_lastname}
                </p>
                <p>
                  Enfant : {reservation.child_firstname}{" "}
                  {reservation.child_lastname}
                </p>
                <p>Crèche : {reservation.nursery_name}</p>
                <p>Date : {formatDate(reservation.booking_operation_date)}</p>
              </div>

              <div className="dashboard_reservation_cancel">
                <button
                  type="button"
                  onClick={() =>
                    cancelBooking(reservation.booking_operation_id)
                  }
                >
                  Annuler la réservation
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DashboardModeratorReservation;
