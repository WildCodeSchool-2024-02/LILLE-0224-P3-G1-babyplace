import { useState, useContext } from "react";
import "./DashboardPro.css";
import { AuthContext } from "../../context/AuthContext";

// Fonction pour obtenir les semaines du calendrier à partir de la date actuelle
function getWeekNumber(date) {
  const oneJan = new Date(date.getFullYear(), 0, 1);
  const numberOfDays = Math.floor((date - oneJan) / (24 * 60 * 60 * 1000));
  return Math.ceil((date.getDay() + 1 + numberOfDays) / 7);
}

// Fonction pour obtenir le lundi de la semaine actuelle
function getMonday(date) {
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1);
  // Ajuste si le jour actuel est dimanche
  return new Date(date.setDate(diff));
}

export default function CalendarDashboard() {
  const { user } = useContext(AuthContext);

  // Fonction pour formater la date
  function formatDate(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  // Fonction pour générer les dates de la semaine du lundi au vendredi
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
  const monday = getMonday(today);

  // Stocker les dates de la semaine et les disponibilités
  const [currentWeek, setCurrentWeek] = useState(generateWeekDates(monday));
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
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  function handleAvailabilityForm(index) {
    setAddAvailability(index === addAvailability ? null : index);
  }

  function handleStart(e) {
    setStart(e.target.value);
  }

  function handleEnd(e) {
    setEnd(e.target.value);
  }

  async function sendAvailabilityToAPI(date) {
    try {
      // Obtenir les composants de la date locale
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Mois de 0 à 11, donc on ajoute 1
      const day = String(date.getDate()).padStart(2, "0");
      // Créer une chaîne de date formatée localement
      const formattedDate = `${year}-${month}-${day}T12:00:00.000`;

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/booking-operation`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            booking_operation_date: formattedDate,
            slots: `${start} - ${end}`,
            state: "Libre",
            nursery_id: user.nursery_id,
          }),
        }
      );

      if (response.status === 201) {
        console.info("Availability successfully sent to the API.");
      } else {
        console.info(response);
      }
    } catch (err) {
      console.error(err);
    }
  }

  function handleConfirmAvailability(index) {
    const weekKey = getWeekKey(currentWeek[0].split("/").reverse().join("/"));
    const newAvailability = { ...availability };
    if (!newAvailability[weekKey]) {
      newAvailability[weekKey] = Array(5)
        .fill()
        .map(() => []);
    }
    newAvailability[weekKey][index].push({
      start,
      end,
    });
    setAvailability(newAvailability);
    setAddAvailability(null);
    setStart("");
    setEnd("");
    const selectedDate = new Date(
      currentWeek[index].split("/").reverse().join("/")
    );
    sendAvailabilityToAPI(selectedDate);
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
                  Définissez un créneau horaire
                </div>
                <form>
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
