import { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import SearchByName from "../../SearchByName/SearchByName";
import "./DashboardModeratorReservation.css";

function DashboardModeratorReservation() {
  const { booking: allBooking } = useLoaderData();
  const [filteredBookings, setFilteredBookings] = useState([]);

  useEffect(() => {
    if (allBooking) {
      setFilteredBookings(allBooking);
    }
  }, [allBooking]);

  const formatDate = (date) => date.split("T")[0];

  function getStatusClass(state) {
    switch (state) {
      case "Libre":
        return "dashboard_reservation_free";
      case "Passée":
        return "dashboard_reservation_passed";
      case "En attente":
        return "dashboard_reservation_pending";
      case "A venir":
        return "dashboard_reservation_upcoming";
      default:
        return "";
    }
  }

  const handleSearch = (searchValue) => {
    const searchString = searchValue.toLowerCase();

    const filteredBookingsList = allBooking.filter((booking) => {
      const matchesAccountID =
        booking.account_id &&
        typeof booking.account_id === "string" &&
        booking.account_id.toLowerCase().includes(searchString);
      const matchesParentFirstName =
        booking.parent_firstname &&
        booking.parent_firstname.toLowerCase().includes(searchString);
      const matchesParentLastName =
        booking.parent_lastname &&
        booking.parent_lastname.toLowerCase().includes(searchString);
      const matchesChildFirstName =
        booking.child_firstname &&
        booking.child_firstname.toLowerCase().includes(searchString);
      const matchesChildLastName =
        booking.child_lastname &&
        booking.child_lastname.toLowerCase().includes(searchString);
      const matchesNurseryName =
        booking.nursery_name &&
        booking.nursery_name.toLowerCase().includes(searchString);

      return (
        matchesAccountID ||
        matchesParentFirstName ||
        matchesParentLastName ||
        matchesChildFirstName ||
        matchesChildLastName ||
        matchesNurseryName
      );
    });
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
        <div className="reservation_search_name">
          <SearchByName onSearch={handleSearch} />
        </div>
      </div>
      <div className="dashboard_reservation_title">
        <h1>Réservations</h1>
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
                {reservation.parent_firstname &&
                  reservation.parent_lastname && (
                    <p>
                      Parent : {reservation.parent_firstname}{" "}
                      {reservation.parent_lastname}
                    </p>
                  )}
                {reservation.child_firstname && reservation.child_lastname && (
                  <p>
                    Enfant : {reservation.child_firstname}{" "}
                    {reservation.child_lastname}
                  </p>
                )}
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
