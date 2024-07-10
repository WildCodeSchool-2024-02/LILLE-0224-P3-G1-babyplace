import PropTypes from "prop-types";
import "./Dashboard.css";

export default function BookingsDashboard({ bookings }) {
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
              <img
                className="image_nursery_dashboard"
                alt="Nursery"
                src={booking.nursery.image1}
              />
              <div className="nursery_info">
                <ul>
                  <li>
                    <h5>{booking.nursery.nursery_name}</h5>
                  </li>
                  <li>{booking.child_firstname}</li>

                  <li className="booking_state">{booking.state}</li>
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
