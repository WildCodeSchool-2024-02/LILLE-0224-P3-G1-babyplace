import { useState } from "react";
import PropTypes from "prop-types";
import "../DashboardPro/DashboardPro.css";
import "./Nursery.css";

// Fonction pour obtenir le lundi de la semaine actuelle
function getMonday(date) {
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1);
  // Ajuste si le jour actuel est dimanche
  return new Date(date.setDate(diff));
}

export default function NurseryCalendarDetails({ bookings }) {
  // Fonction pour formater la date en YYYY-MM-DD (pour comparaison)
  function formatDate(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
  }

  // Fonction pour formater la date en DD/MM/YYYY (pour affichage)
  function formatDisplayDate(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  const freeSlots = bookings
    .filter((booking) => booking.state === "Libre")
    .map((booking) => ({
      date: formatDate(new Date(booking.booking_operation_date)),
      slots: booking.slots,
    }));

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

  // Stocker les dates de la semaine et les disponibilités
  const [currentWeek, setCurrentWeek] = useState(generateWeekDates(monday));

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
          const freeSlot = freeSlots.find(
            (slot) => slot.date === dateObj.formatted
          );
          return (
            <div key={dateObj.formatted} className="day_dashboard">
              <div className="day">{daysInFrench[index]}</div>
              {dateObj.display}

              {freeSlot ? (
                <div className="slot"> {freeSlot.slots}</div>
              ) : (
                <div className="no_slot">Aucun créneau disponible</div>
              )}
            </div>
          );
        })}
      </div>
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
