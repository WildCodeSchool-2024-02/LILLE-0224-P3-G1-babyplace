import { useState } from "react";
import PropTypes from "prop-types";
import "./DashboardPro.css";

export default function PendingBookings({ bookings }) {
  // Classer les réservations dans l'ordre chronologique
  const sortedBookings = bookings.sort(
    (a, b) =>
      new Date(a.booking_operation_date) - new Date(b.booking_operation_date)
  );
  const formatDate = (date) => date.split("T")[0];
  // Gérer le formulaire de confirmation de décision (acceptation ou refus de la réservations)
  const [choice, setChoice] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [confirmation, setConfirmation] = useState({});

  function handleChoice(event, booking) {
    setChoice(event.target.value);
    setSelectedBooking(booking);
  }

  // Fonction pour formater les allergies et récupérer les valeurs dans un tableau
  const formatAllergies = (allergies) => {
    const allergyList = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(allergies)) {
      if (value === 1) {
        allergyList.push(key);
      }
    }
    return allergyList.length ? allergyList.join(", ") : "Aucune";
  };
  // Changer l'état de la réservation dans la bdd selon la réponse de la crèche
  const handleSubmit = async (event) => {
    event.preventDefault();

    const body = {
      booking_operation_id: selectedBooking.booking_operation_id,
      state: choice === "Accepter la réservation" ? "A venir" : "Refusée",
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/booking-operation/${selectedBooking.booking_operation_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed response: ${response.status} - ${response.statusText}`
        );
      }

      setChoice(null);
      setSelectedBooking(null);
      setConfirmation((prev) => ({
        ...prev,
        [selectedBooking.booking_operation_id]: body.state,
      }));
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  };

  return (
    <div className="all_nursery_container">
      {sortedBookings.map((booking) => (
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
                <li>
                  {" "}
                  <h5>
                    {" "}
                    Contact : {booking.parent.parent_mail} -{" "}
                    {booking.parent.parent_phone}
                  </h5>
                </li>
                <li className="informations_title_child">
                  <h5>Informations enfant </h5>
                </li>
                <li>
                  {" "}
                  <h5> Enfant : {booking.child.child_firstname} </h5>
                </li>
                <li
                  className="informations_lines_child"
                  id="birthdate_information"
                >
                  Date de naissance : {formatDate(booking.child.child_birth)}
                </li>
                <li className="informations_lines_child">
                  Marche : {booking.child.walk_status ? "Oui" : "Non"}
                </li>
                <li className="informations_lines_child">
                  Propre : {booking.child.clean_status ? "Oui" : "Non"}
                </li>
                Allergies : {formatAllergies(booking.child.allergies)}
              </ul>
            </div>
          </div>
          {confirmation[booking.booking_operation_id] ? (
            <div className="final_message">
              Réservation{" "}
              {confirmation[booking.booking_operation_id] === "A venir"
                ? "acceptée"
                : "refusée"}
            </div>
          ) : (
            <div className="buttons_container_pending">
              <button
                type="button"
                className="accept_button_pending"
                value="Accepter la réservation"
                onClick={(event) => handleChoice(event, booking)}
              >
                Accepter
              </button>
              <button
                type="button"
                className="cancel_button_pending"
                value="Refuser la réservation"
                onClick={(event) => handleChoice(event, booking)}
              >
                Refuser
              </button>
            </div>
          )}
          {choice && selectedBooking === booking && (
            <div className="choice_confirmation_pending">
              <div>
                Confirmer votre choix{" "}
                <div className="choice_made">{choice}</div>
              </div>
              <div className="container_commit_buttons">
                <button
                  type="button"
                  className="commit_button_pending"
                  onClick={handleSubmit}
                >
                  Confirmer
                </button>
                <button
                  type="button"
                  className="back_button_pending"
                  onClick={() => {
                    setChoice(null);
                    setSelectedBooking(null);
                  }}
                >
                  Annuler
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
PendingBookings.propTypes = {
  bookings: PropTypes.arrayOf(
    PropTypes.shape({
      booking_operation_id: PropTypes.number.isRequired,
      booking_operation_date: PropTypes.string.isRequired,
      slots: PropTypes.string.isRequired,
      parent: PropTypes.shape({
        parent_firstname: PropTypes.string.isRequired,
        parent_lastname: PropTypes.string.isRequired,
        parent_mail: PropTypes.string.isRequired,
        parent_phone: PropTypes.string.isRequired,
      }).isRequired,
      child: PropTypes.shape({
        child_firstname: PropTypes.string.isRequired,
        child_birth: PropTypes.string.isRequired,
        walk_status: PropTypes.number.isRequired,
        clean_status: PropTypes.number.isRequired,
      }).isRequired,
    })
  ).isRequired,
};
