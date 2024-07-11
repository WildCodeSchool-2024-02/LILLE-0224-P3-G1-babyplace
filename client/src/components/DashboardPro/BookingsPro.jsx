import PropTypes from "prop-types";
import "../Dashboard/Dashboard.css";

export default function BookingsDashboard({ bookings }) {
  const formatDate = (date) => date.split("T")[0];

  return (
    <div className="all_nursery_container">
      {bookings.length > 0 ? (
        bookings.map((booking) => (
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
                <ul>
                  <li>
                    <h5>
                      Parent : {booking.parent.parent_firstname}{" "}
                      {booking.parent.parent_lastname}
                    </h5>
                  </li>
                  <li> Enfant : {booking.child.child_firstname}</li>
                  <li>
                    {" "}
                    <h5>Informations </h5>
                  </li>
                  <li>
                    {" "}
                    Date de naissance : {formatDate(booking.child.child_birth)}
                  </li>
                  <li>
                    {" "}
                    Marche : {booking.child.walk_status ? "Oui" : "Non"}{" "}
                  </li>
                  <li>
                    {" "}
                    Propre : {booking.child.clean_status ? "Oui" : "Non"}{" "}
                  </li>

                  <li className="booking_state">
                    {" "}
                    <h5>{booking.state}</h5>
                  </li>
                </ul>
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
      child_firstname: PropTypes.string.isRequired,
      nursery: PropTypes.shape({
        nursery_name: PropTypes.string.isRequired,
        image1: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
};
