import { useState } from "react";
import "./DashboardPro.css";

// Fonction pour obtenir le numéro de semaine sans étendre le prototype de Date
function getWeekNumber(date) {
  const oneJan = new Date(date.getFullYear(), 0, 1);
  const numberOfDays = Math.floor((date - oneJan) / (24 * 60 * 60 * 1000));
  return Math.ceil((date.getDay() + 1 + numberOfDays) / 7);
}

export default function CalendarDashboard() {
  // Fonction pour formater la date
  function formatDate(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  // Fonction pour générer les dates de la semaine
  function generateWeekDates(startDate) {
    const weekDates = [];
    for (let i = 0; i < 5; i += 1) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      weekDates.push(formatDate(date));
    }
    return weekDates;
  }

  // Fonction pour obtenir la clé de la semaine
  function getWeekKey(startDate) {
    const start = new Date(startDate);
    const startYear = start.getFullYear();
    const startWeek = getWeekNumber(start);
    return `${startYear}-${startWeek}`;
  }

  // Date actuelle
  const today = new Date();

  // Stocker les dates de la semaine et les disponibilités
  const [currentWeek, setCurrentWeek] = useState(generateWeekDates(today));
  const [availability, setAvailability] = useState({});

  // Fonction pour avancer d'une semaine ou reculer d'une semaine
  function handleNextWeek() {
    const newStartDate = new Date(
      currentWeek[0].split("/").reverse().join("/")
    );
    newStartDate.setDate(newStartDate.getDate() + 7);
    setCurrentWeek(generateWeekDates(newStartDate));
  }

  function handlePreviousWeek() {
    const newStartDate = new Date(
      currentWeek[0].split("/").reverse().join("/")
    );
    newStartDate.setDate(newStartDate.getDate() - 7);
    setCurrentWeek(generateWeekDates(newStartDate));
  }

  const daysInFrench = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"];

  // Fonction pour faire apparaître les formulaires d'ajout / modif de créneaux
  const [addAvailability, setAddAvailability] = useState(null);
  const [placesAvailable, setPlacesAvailable] = useState(0);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  function handleAvailabilityForm(index) {
    setAddAvailability(index === addAvailability ? null : index);
  }

  function handlePlacesAvailable(e) {
    setPlacesAvailable(Number(e.target.value));
  }

  function handleStart(e) {
    setStart(e.target.value);
  }

  function handleEnd(e) {
    setEnd(e.target.value);
  }

  function handleConfirmAvailability(index) {
    const weekKey = getWeekKey(currentWeek[0].split("/").reverse().join("/"));
    const newAvailability = { ...availability };
    if (!newAvailability[weekKey]) {
      newAvailability[weekKey] = Array(5)
        .fill()
        .map(() => []);
    }
    for (let i = 0; i < placesAvailable; i += 1) {
      newAvailability[weekKey][index].push({
        start,
        end,
      });
    }
    setAvailability(newAvailability);
    setAddAvailability(null);
    setPlacesAvailable(0);
    setStart("");
    setEnd("");
  }

  function handleDeleteAvailability(dayIndex, slotIndex) {
    const weekKey = getWeekKey(currentWeek[0].split("/").reverse().join("/"));
    const newAvailability = { ...availability };
    newAvailability[weekKey][dayIndex].splice(slotIndex, 1);
    setAvailability(newAvailability);
  }

  const weekKey = getWeekKey(currentWeek[0].split("/").reverse().join("/"));
  const currentWeekAvailability =
    availability[weekKey] ||
    Array(5)
      .fill()
      .map(() => []);

  return (
    <div className="calendar_section_dashboard">
      <div className="week_gestion_dashboard">
        <button type="button" onClick={handlePreviousWeek}>
          {" "}
          &lt;
        </button>
        <h3>
          Semaine du {currentWeek[0]} au {currentWeek[4]}
        </h3>
        <button type="button" onClick={handleNextWeek}>
          {" "}
          &gt;{" "}
        </button>
      </div>
      <div className="week_dashboard">
        {currentWeek.map((date, index) => (
          <div key={date} className="day_dashboard">
            <div>{daysInFrench[index]}</div>
            {date}
            <div className="half_day_dashboard">
              <button
                type="button"
                onClick={() => handleAvailabilityForm(index)}
              >
                {" "}
                +{" "}
              </button>
            </div>
            {currentWeekAvailability[index].map((slot, slotIndex) => (
              <div key={slot.start} className="available_slots_dashboard">
                {slot.start} - {slot.end}
                <button
                  type="button"
                  className="button_suppress"
                  onClick={() => handleDeleteAvailability(index, slotIndex)}
                >
                  X
                </button>
              </div>
            ))}
            {addAvailability === index && (
              <div className="form_calender_dashboard">
                <div className="title_form_calender">
                  Ajouter une disponibilité
                </div>
                <div className="date_form_dashboard">
                  {daysInFrench[index]} - {date}{" "}
                </div>
                <div className="form_definition">
                  Définissez un nombre de places et un créneau horaire
                </div>
                <form>
                  <input
                    type="number"
                    onChange={handlePlacesAvailable}
                    value={placesAvailable}
                  />
                  Début :{" "}
                  <input type="time" onChange={handleStart} value={start} />
                  Fin : <input type="time" onChange={handleEnd} value={end} />
                </form>
                <button
                  type="button"
                  onClick={() => handleConfirmAvailability(index)}
                >
                  Confirmer
                </button>
                <button
                  type="button"
                  onClick={() => handleAvailabilityForm(index)}
                >
                  Annuler
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
