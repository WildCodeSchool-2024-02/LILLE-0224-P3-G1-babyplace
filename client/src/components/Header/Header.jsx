import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import "./Header.css";
import { AuthContext } from "../../context/AuthContext";

function Header() {
  const { user } = useContext(AuthContext);

  // State et use effect pour afficher la bonne cloche de notification :
  // si parent connecté, notification des "réservations à venir" pour les crèches "réservations en attente"
  const [displayPendingBookings, setDisplayPendingBookings] = useState(false);

  useEffect(() => {
    if (user.role === "nursery") {
      setDisplayPendingBookings(true);
    }
  }, [user.role]);
  const pendingBookings = user.bookings
    ? user.bookings.filter((booking) => booking.state === "En attente")
    : [];

  const [displayValidatedBookings, setDisplayValidatedBookings] =
    useState(false);
  useEffect(() => {
    if (user.role === "parent") {
      setDisplayValidatedBookings(true);
    }
  }, [user.role]);

  const validatedBookings = user.bookings
    ? user.bookings.filter((booking) => booking.state === "A venir")
    : [];

  const formatDate = (date) => date.split("T")[0];

  const [showList, setShowList] = useState(false);

  function handleShowList() {
    setShowList(!showList);
  }
  return (
    <div className="the_header">
      <div className="icon_header">
        <Link to="/accueil">
          <img
            id="logo_header"
            src="../../../public/assets/images/logo.svg"
            alt="logo"
          />
        </Link>
      </div>

      <div className="header_search_and_nav">
        {displayPendingBookings && (
          <>
            {" "}
            <button
              className="button_notification"
              type="button"
              onClick={handleShowList}
            >
              <img
                className="notification_bell"
                src="../../../public/assets/images/bell.svg"
                alt="notifications"
              />
            </button>
            <div className="notification_count">{pendingBookings.length}</div>
            {showList && (
              <div className="notification_info_container">
                <h4>Vos réservations en attente</h4>
                {pendingBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="one_reservation_notification"
                  >
                    {" "}
                    <p className="date_notification">
                      Le {formatDate(booking.booking_operation_date)} à{" "}
                      {booking.slots}
                    </p>
                    <p>Enfant : {booking.child.child_firstname}</p>
                    Parent : {booking.parent.parent_firstname}{" "}
                    {booking.parent.parent_lastname}
                    <br />
                    <Link to="/dashboard#manage-bookings">
                      Gérer la réservation
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
        {displayValidatedBookings && (
          <>
            <button
              className="button_notification"
              type="button"
              onClick={handleShowList}
            >
              <img
                className="notification_bell"
                src="../../../public/assets/images/bell.svg"
                alt="notifications"
              />
            </button>
            <div className="notification_count">{validatedBookings.length}</div>
            {showList && (
              <div className="notification_info_container">
                <h4>Vos réservations à venir</h4>
                {validatedBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="one_reservation_notification"
                  >
                    {" "}
                    <p className="date_notification">
                      Le {formatDate(booking.booking_operation_date)} à{" "}
                      {booking.slots}
                    </p>
                    <p>Enfant : {booking.child_firstname}</p>
                    Crèche{" "}
                    <Link to={`/creche/${booking.nursery.nursery_id}`}>
                      :{booking.nursery.nursery_name}
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
        <Link to="/dashboard" className="button_header">
          Mon compte{" "}
          <img
            id="go_header"
            className="images_header"
            src="../../../public/assets/images/logo-arrow.svg"
            alt="logo"
          />
        </Link>
      </div>
    </div>
  );
}

export default Header;
