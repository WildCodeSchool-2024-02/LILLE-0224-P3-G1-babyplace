import PropTypes from "prop-types";
import "./nurseriesAll.css";

export default function NurseriesCardCalender({ bookings }) {
  // Filtrer et trier les réservations par date (pour afficher la plus récente en premier)
  const filteredBookings = bookings
    .filter((booking) => booking.state === "Libre")
    .sort(
      (a, b) =>
        new Date(a.booking_operation_date) - new Date(b.booking_operation_date)
    )
    .slice(0, 3);

  // Fonction pour formater la date au format "JJ-MM-YYYY"
  const formatDate = (date) => {
    const formattedDate = new Date(date);
    const day = formattedDate.getDate();
    const month = formattedDate.getMonth() + 1;
    const year = formattedDate.getFullYear();
    return `${day < 10 ? `0${day}` : day}.${month < 10 ? `0${month}` : month}.${year}`;
  };

  return (
    <div className="nursery_card_calender_section">
      {filteredBookings.length > 0 ? (
        <>
          <h3>Prochaines disponibilités </h3>
          <div>
            {filteredBookings.map((booking) => (
              <div key={booking.booking_operation_id} className="one_date_mini">
                {" "}
                <span className="date_mini">
                  {formatDate(booking.booking_operation_date)}
                </span>{" "}
                <span className="hour_mini"> {booking.slots}</span>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div>Pas de disponibilité</div>
      )}
    </div>
  );
}

NurseriesCardCalender.propTypes = {
  bookings: PropTypes.arrayOf(
    PropTypes.shape({
      booking_operation_id: PropTypes.number.isRequired,
      booking_operation_date: PropTypes.string.isRequired,
      slots: PropTypes.string.isRequired,
      state: PropTypes.string.isRequired,
    })
  ).isRequired,
};
