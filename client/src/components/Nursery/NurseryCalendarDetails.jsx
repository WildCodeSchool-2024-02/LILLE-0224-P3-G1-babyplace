import { useContext, useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import "../DashboardPro/DashboardPro.css";
import { AuthContext } from "../../context/AuthContext";
import "./Nursery.css";

// Fonction pour obtenir le lundi de la semaine actuelle
function getMonday(date) {
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1);
  // Ajuste si le jour actuel est dimanche
  return new Date(date.setDate(diff));
}

export default function NurseryCalendarDetails({ bookings }) {
  const { user } = useContext(AuthContext);
  const [btnState, setBtnState] = useState();

  useEffect(() => {
    if (user.role === "nursery" || user.role === "moderator") {
      setBtnState(true);
    } else setBtnState(false);
  }, []);

  // Fonction pour formater la date affichée en YYYY-MM-DD (pour comparaison avec les dates de la bdd)
  function formatDate(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
  }

  // Fonction pour formater la date en DD/MM/YYYY (pour transformer celle qui arrive de la bdd pour l'affichage)
  function formatDisplayDate(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  // Filtre des réservations pour ressortir un tableau d'objets contenant uniquement les réservations "libres" à afficher dans le composant
  const freeSlots = bookings
    .filter((booking) => booking.state === "Libre")
    .map((booking) => ({
      date: formatDate(new Date(booking.booking_operation_date)),
      slots: booking.slots,
      bookingOperationId: booking.booking_operation_id,
    }));

  // Grouper les créneaux libres par date. On initie un objet vide, et l'accumulateur
  // prend une par une les "date" de freeSlots. Si sa valeur n'existe pas (n'est pas quand push dans l'objet vide),
  // il créé une entrée dans cet objet avec un tableau vide.
  // Il push ensuite dans ce tableau les "slot" qui correspondent à cette date.
  // On obtient par exemple pour une date : {2024-08-01: [{date: '2024-08-01', slots: '10h-18h'}, {date: '2024-08-01', slots: '14h-18h'}]

  const freeSlotsByDate = freeSlots.reduce((acc, slot) => {
    if (!acc[slot.date]) {
      acc[slot.date] = [];
    }
    acc[slot.date].push(slot);
    return acc;
  }, {});

  // Fonction pour générer les dates de la semaine du lundi au vendredi
  function generateWeekDates(startDate) {
    const weekDates = [];
    for (let i = 0; i < 5; i += 1) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      weekDates.push({
        formatted: formatDate(date),
        display: formatDisplayDate(date),
      });
    }
    return weekDates;
  }

  // Date actuelle
  const today = new Date();
  const monday = getMonday(today);

  // Stocker les dates de la semaine
  const [currentWeek, setCurrentWeek] = useState(generateWeekDates(monday));
  const [selectedDate, setSelectedDate] = useState(null);

  // Fonction pour avancer d'une semaine ou reculer d'une semaine
  function handleNextWeek() {
    const newStartDate = new Date(currentWeek[0].formatted);
    newStartDate.setDate(newStartDate.getDate() + 7);
    setCurrentWeek(generateWeekDates(newStartDate));
  }

  function handlePreviousWeek() {
    const newStartDate = new Date(currentWeek[0].formatted);
    newStartDate.setDate(newStartDate.getDate() - 7);
    setCurrentWeek(generateWeekDates(newStartDate));
  }

  const daysInFrench = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"];
  const [showConfirmationMessage, setShowConfirmationMessage] = useState(false);

  // State et fonction pour gérer l'apparition du formulaire de réservation et stocker l'id de la réservation sélectionnée
  const [showResForm, setShowResForm] = useState(false);
  function handleShowResForm(date, bookingOperationId) {
    setSelectedDate({ ...date, bookingOperationId });
    setShowResForm(true);
    setShowConfirmationMessage(false);
  }
  const childRef = useRef("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const body = {
      booking_operation_id: selectedDate.bookingOperationId,
      state: "En attente",
      parent_id: user.parent_id,
      child_id: parseInt(childRef.current.value, 10),
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/booking-operation/${selectedDate.bookingOperationId}/edit`,
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

      setShowResForm(false);
      setShowConfirmationMessage(true);
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  };

  return (
    <div className="calendar_section_dashboard">
      <div className="week_gestion_dashboard">
        <button type="button" onClick={handlePreviousWeek}>
          &lt;
        </button>
        <h3>
          Semaine du {currentWeek[0].display} au {currentWeek[4].display}
        </h3>
        <button type="button" onClick={handleNextWeek}>
          &gt;
        </button>
      </div>

      <div className="week_dashboard">
        {currentWeek.map((dateObj, index) => {
          // Trouver les créneaux libres pour la date actuelle
          const freeSlotsForDate = freeSlotsByDate[dateObj.formatted] || [];
          return (
            <div key={dateObj.formatted} className="day_dashboard_details">
              <div className="day">{daysInFrench[index]}</div>
              {dateObj.display}
              {freeSlotsForDate.length > 0 ? (
                freeSlotsForDate.map((slot) => (
                  <button
                    key={slot.bookingOperationId}
                    className="slot"
                    type="button"
                    disabled={btnState}
                    onClick={() =>
                      handleShowResForm(dateObj, slot.bookingOperationId)
                    }
                  >
                    {slot.slots}
                  </button>
                ))
              ) : (
                <div className="no_slot">Aucun créneau disponible</div>
              )}
            </div>
          );
        })}
      </div>

      {showResForm && selectedDate && (
        <div className="form_calender_mini">
          <div className="title_form_calender">Réserver un créneau</div>
          <div className="date_form_dashboard">
            {
              daysInFrench[
                currentWeek.findIndex(
                  (day) => day.formatted === selectedDate.formatted
                )
              ]
            }{" "}
            - {selectedDate.display}
          </div>
          <div className="form_definition_details">
            Renseignez l'enfant que vous souhaitez inscrire sur ce créneau
          </div>
          <form>
            <select className="select_nursery_mini" ref={childRef}>
              {user.children.map((child) => (
                <option key={child.child_id} value={child.child_id}>
                  {child.child_firstname}
                </option>
              ))}
            </select>
          </form>
          <div className="buttons_group_details">
            <button
              type="button"
              className="confirm_button_details"
              onClick={handleSubmit}
            >
              Confirmer
            </button>
            <button
              type="button"
              onClick={() => setShowResForm(false)}
              className="cancel_button_details"
            >
              Annuler
            </button>
          </div>
        </div>
      )}
      {showConfirmationMessage && (
        <div className="confirmation_message_details">
          <span className="demande_accepted">
            Demande de réservation envoyée à la crèche.
          </span>{" "}
          <br /> Vous pouvez suivre l'état de votre demande dans votre espace
          personnel.
          <br /> Si vous avez besoin de plus d'informations, n'hésitez pas à
          contacter l'établissement.
        </div>
      )}
    </div>
  );
}

NurseryCalendarDetails.propTypes = {
  bookings: PropTypes.arrayOf(
    PropTypes.shape({
      booking_operation_date: PropTypes.string.isRequired,
      booking_operation_id: PropTypes.number.isRequired,
      child: PropTypes.shape({
        child_id: PropTypes.number,
        child_firstname: PropTypes.string,
        child_lastname: PropTypes.string,
        child_birth: PropTypes.string,
        walk_status: PropTypes.number,
      }),
      parent: PropTypes.shape({
        parent_id: PropTypes.number,
        parent_firstname: PropTypes.string,
        parent_lastname: PropTypes.string,
        parent_address: PropTypes.string,
        parent_phone: PropTypes.string,
      }),
      slots: PropTypes.string.isRequired,
      state: PropTypes.string.isRequired,
    })
  ).isRequired,
};
