import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import NurseriesMini from "./NurseriesMini";
import NurseriesMapRennes from "./NurseriesMapRennes";
import "./nurseriesAll.css";

function NurseriesAllRennes() {
  // on reçoit les données triées par ville (depuis loader main)
  const allNurseries = useLoaderData();

  // gère le filtre par date
  const [datePicked, setDatePicked] = useState();

  const filterNurseries = allNurseries.filter((nursery) => {
    if (!datePicked) return true;

    return nursery.bookings.some((booking) => {
      // pour gérer le décalage horaire (base de données sur un fuseau horaire différent (UTC) de l'input qui est sur notre fuseau horaire)
      // convertie en format Date notre date de la bdd (de format YYYY-MM-DDThh-mm-ssZ à "Sat Aug 10 2024 00:00:00 GMT+0200 (heure d’été d’Europe centrale)"")
      const bookingDate = new Date(booking.booking_operation_date);
      // convertie en formart YYYY-MM-DD pour pouvoir comparer avec input sous ce format et conserver le jour sans décalage horaire
      // le Date.UTC (Temps Universel Coordonné), vient formater notre date de la bdd pour s'assurer qu'on reçoit un bon format de date, puis ajoute un jour pour combler le décalage horaire
      const bookingDateString = new Date(
        Date.UTC(
          bookingDate.getUTCFullYear(),
          bookingDate.getUTCMonth(),
          bookingDate.getUTCDate() + 1
        )
      )
        // re-convertie en format YYYY-MM-DD avec .toISOString sans les heures (split), pour avoir une valeur comparable à celle comme de l'input.
        .toISOString()
        .split("T")[0];
      // on souhaite récupérer les réservations qui ont la même date que l'input avec un créneau libre
      return bookingDateString === datePicked && booking.state === "Libre";
    });
  });

  const handleDatePicked = (event) => {
    const selectedDate = new Date(event.target.value);
    const utcDate = new Date(
      Date.UTC(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate()
      )
    );
    setDatePicked(utcDate.toISOString().split("T")[0]);
  };

  // gère l'affichage mobile (carte ou liste )
  const [viewList, setViewList] = useState(true);
  const handleViewList = () => {
    setViewList(true);
  };

  const handleViewMap = () => {
    setViewList(false);
  };

  return (
    <>
      <h2 className="nurseries_all_city_title">Rennes</h2>
      <div className="mobile_nurseries_all">
        <div className="nursery_filter_buttons_container">
          Trier par date{" "}
          <input
            className="input_date_filter"
            type="date"
            value={datePicked}
            onChange={handleDatePicked}
          />
        </div>
        <div className="nurseries_all_buttons_container">
          <button
            type="button"
            className="nurseries_all_button"
            onClick={handleViewList}
          >
            Liste
          </button>
          <button
            className="nurseries_all_button"
            type="button"
            onClick={handleViewMap}
          >
            Carte
          </button>
        </div>

        {viewList && allNurseries ? (
          <>
            {" "}
            <div className="line_list_section"> </div>
            <div className="nurseries_all_list_section">
              {filterNurseries.length > 0 ? (
                filterNurseries.map((nursery) => (
                  <NurseriesMini
                    key={nursery.nursery_id}
                    id={nursery.nursery_id}
                    name={nursery.nursery_name}
                    price={nursery.price}
                    image1={nursery.image1}
                    image2={nursery.image2}
                    image3={nursery.image3}
                    bookings={nursery.bookings}
                  />
                ))
              ) : (
                <p>Aucune crèche disponible pour la date sélectionnée.</p>
              )}
            </div>
          </>
        ) : (
          <NurseriesMapRennes
            allNurseries={filterNurseries}
            handleViewList={handleViewList}
          />
        )}
      </div>
      <div className="desktop_nurseries_all">
        <div className="nursery_filter_buttons_container">
          Trier par date{" "}
          <input
            type="date"
            className="input_date_filter"
            value={datePicked}
            onChange={handleDatePicked}
          />
        </div>
        <div className="nurseries_all_list_section">
          <div className="nurseries_all_list_desktop">
            {filterNurseries.length > 0 ? (
              filterNurseries.map((nursery) => (
                <NurseriesMini
                  key={nursery.nursery_id}
                  id={nursery.nursery_id}
                  name={nursery.nursery_name}
                  price={nursery.price}
                  image1={nursery.image1}
                  image2={nursery.image2}
                  image3={nursery.image3}
                  bookings={nursery.bookings}
                />
              ))
            ) : (
              <p>Aucune crèche disponible pour la date sélectionnée.</p>
            )}
          </div>
          <div className="nurseries_all_map_desktop">
            <NurseriesMapRennes
              allNurseries={filterNurseries}
              handleViewList={handleViewList}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default NurseriesAllRennes;
