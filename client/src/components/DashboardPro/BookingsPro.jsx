import PropTypes from "prop-types";
import "../Dashboard/Dashboard.css";

export default function BookingsDashboard({ bookings }) {
  const formatDate = (date) => (date ? date.split("T")[0] : "N/A");

  // Trier les réservations par date
  const sortedBookings = bookings.sort(
    (a, b) =>
      new Date(a.booking_operation_date) - new Date(b.booking_operation_date)
  );

  return (
    <div className="all_nursery_container">
      {sortedBookings.length > 0 ? (
        sortedBookings.map((booking) => (
          <div className="nursery_container" key={booking.booking_operation_id}>
            <div className="date">
              <div>
                <img src="/assets/images/calender.svg" alt="calender" />
                {new Date(booking.booking_operation_date).toLocaleDateString(
                  "fr-FR"
                )}
              </div>
              <div>
                <img
                  src="/assets/images/clock.svg"
                  className="clock_img"
                  alt="clock"
                />
                {booking.slots}
              </div>
            </div>
            <div className="nursery_all_info">
              <div className="nursery_info">
                {booking.state !== "Libre" ? (
                  <ul>
                    <li>
                      <h5>
                        Parent : {booking.parent.parent_firstname}{" "}
                        {booking.parent.parent_lastname}
                      </h5>
                    </li>
                    <li>
                      <h5>
                        Contact : {booking.parent.parent_mail} -{" "}
                        {booking.parent.parent_phone}
                      </h5>
                    </li>
                    <li className="informations_title_child">
                      <h5>Informations enfant </h5>
                    </li>
                    <li>
                      <h5> Enfant : {booking.child.child_firstname} </h5>
                    </li>
                    <li
                      className="informations_lines_child"
                      id="birthdate_information"
                    >
                      Date de naissance :{" "}
                      {formatDate(booking.child.child_birth)}
                    </li>
                    <li className="informations_lines_child">
                      Marche : {booking.child.walk_status ? "Oui" : "Non"}
                    </li>
                    <li className="informations_lines_child">
                      Propre : {booking.child.clean_status ? "Oui" : "Non"}
                    </li>
                  </ul>
                ) : (
                  <div className="available_booking_msg">
                    {" "}
                    Créneau disponible
                  </div>
                )}
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="select_state"> Sélectionnez un état de réservation</div>
      )}
    </div>
  );
}

BookingsDashboard.propTypes = {
  bookings: PropTypes.arrayOf(
    PropTypes.shape({
      booking_operation_id: PropTypes.number.isRequired,
      booking_operation_date: PropTypes.string.isRequired,
      slots: PropTypes.string.isRequired,
      state: PropTypes.string.isRequired,
      parent: PropTypes.shape({
        parent_firstname: PropTypes.string.isRequired,
        parent_lastname: PropTypes.string.isRequired,
      }).isRequired,
      child: PropTypes.shape({
        child_firstname: PropTypes.string,
        child_birth: PropTypes.string,
        walk_status: PropTypes.bool,
        clean_status: PropTypes.bool,
      }),
    })
  ).isRequired,
};
