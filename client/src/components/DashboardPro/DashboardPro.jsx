import { useState, useContext, useCallback, useRef } from "react";
import CalendarDashboard from "./CalendarDashboard";
import PendingBookings from "./PendingBookings";
import { AuthContext } from "../../context/AuthContext";
import BookingsPro from "./BookingsPro";
import "./DashboardPro.css";

function DashboardPro() {
  const { user } = useContext(AuthContext);
  const [selectedButton, setSelectedButton] = useState(null);

  const handleViewList = (buttonName) => {
    setSelectedButton(buttonName);
  };

  const getFilteredBookings = () => {
    if (!user || !user.bookings)
      return [<div key="no-bookings">Pas de réservations !</div>];
    switch (selectedButton) {
      case "Libre":
        return user.bookings.filter((booking) => booking.state === "Libre");
      case "A venir":
        return user.bookings.filter((booking) => booking.state === "A venir");
      case "En attente":
        return user.bookings.filter(
          (booking) => booking.state === "En attente"
        );
      case "Passée":
        return user.bookings.filter((booking) => booking.state === "Passée");
      case "Refusée":
        return user.bookings.filter((booking) => booking.state === "Refusée");
      case "Annulée":
        return user.bookings.filter((booking) => booking.state === "Annulée");
      default:
        return [];
    }
  };

  function getPendingBookings() {
    if (!user || !user.bookings) {
      return [<div key="no-bookings">Pas de réservations !</div>];
    }
    return user.bookings.filter((booking) => booking.state === "En attente");
  }

  const [modifySelected, setModifySelected] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [optionSelected, setOptionSelected] = useState("");
  const [responseForm, setResponseForm] = useState(false);

  const emailRef = useRef();
  const phoneRef = useRef();
  const priceRef = useRef();
  const capacityRef = useRef();
  const handleCancelModify = useCallback(() => {
    setModifySelected(false);
    setShowForm(false);
  }, []);

  function handleOptions(value) {
    setOptionSelected(value);
    setShowForm(true);
  }
  function handleModify() {
    setModifySelected(true);
    setResponseForm(false);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const body = {
      capacity: capacityRef.current?.value || user.capactity,
      price: priceRef.current?.value || user.price,
      nursery_phone: phoneRef.current?.value || user.nursery_phone,
      nursery_mail: emailRef.current?.value || user.nursery_mail,
      nursery_id: user.nursery_id,
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/nursery/edit/${user.nursery_id}`,
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

      setResponseForm(true);
      handleCancelModify();
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  };

  return (
    <div>
      <div className="message_pro_container">
        <div className="message_pro_dashboard">
          <h3>Espace Pro</h3>
          <p>
            Bienvenue dans votre espace professionnel. Ici, nous vous proposons
            d’ajouter à votre fiche crèche vos créneaux disponibles dans les
            prochaines semaines et de gérer vos réservations en attente.{" "}
          </p>
        </div>
      </div>

      <div className="creche_info_container">
        <div className="info_container_pro">
          <p className="info_pro">Mon Profil</p>
        </div>
        <div className="profile_pictures_container">
          <img src={user.image1} className="profile_picture" alt="crèche" />
          <img
            src={user.image2}
            className="profile_picture"
            id="profile_picture_2"
            alt="crèche"
          />
          <img
            src={user.image3}
            className="profile_picture"
            id="profile_picture_3"
            alt="crèche"
          />
        </div>
        <h4 className="creche_name">{user.nursery_name}</h4>
        <div className="creche_info">
          <div className="creche_location">
            <div className="creche_adress">
              <p>
                {user.nursery_street_number} {user.nursery_street} {user.city}
              </p>
            </div>

            <div className="creche_contact">
              <div className="one_line_contact">
                <p className="creche_number">{user.nursery_phone}</p>
                <button
                  type="button"
                  className={modifySelected ? "change_info_pen" : "hide_pen"}
                  onClick={() => {
                    handleOptions("numéro de téléphone");
                  }}
                >
                  <img src="/assets/images/pen.svg" alt="pen" />
                </button>
              </div>
              <div className="one_line_contact">
                <p className="creche_mail">{user.nursery_mail}</p>{" "}
                <button
                  type="button"
                  className={modifySelected ? "change_info_pen" : "hide_pen"}
                  onClick={() => {
                    handleOptions("e-mail");
                  }}
                >
                  <img src="/assets/images/pen.svg" alt="pen" />
                </button>
              </div>
              <div className="one_line_contact">
                <p className="creche_mail">
                  <span style={{ fontWeight: "bold" }}>Capacité </span>:{" "}
                  {user.capacity}
                </p>
                <button
                  type="button"
                  className={modifySelected ? "change_info_pen" : "hide_pen"}
                  onClick={() => {
                    handleOptions("capacité d'accueil");
                  }}
                >
                  <img src="/assets/images/pen.svg" alt="pen" />
                </button>
              </div>
              <div className="one_line_contact">
                <p className="creche_mail">
                  {" "}
                  <span style={{ fontWeight: "bold" }}>Tarif</span> :{" "}
                  {user.price} € / heure
                </p>
                <button
                  type="button"
                  className={modifySelected ? "change_info_pen" : "hide_pen"}
                  onClick={() => {
                    handleOptions("prix par heure");
                  }}
                >
                  <img src="/assets/images/pen.svg" alt="pen" />
                </button>
              </div>
            </div>
          </div>
          <ul className="modify_info">
            {modifySelected ? (
              <button
                type="button"
                onClick={handleCancelModify}
                className="modify_info_parent"
                id="cancel_modify_parent"
              >
                Annuler{" "}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleModify}
                className="modify_info_parent"
              >
                Modifier mes informations
              </button>
            )}
          </ul>
        </div>
        {showForm && (
          <div className="modify_informations_form" id="pro_modify">
            <h3>Entrez vos modifications</h3>
            <form>
              <p className="info_form">
                Veuillez rentrer votre
                <span style={{ fontWeight: "bolder" }}> {optionSelected}</span>
              </p>

              {optionSelected === "numéro de téléphone" && (
                <input type="text" ref={phoneRef} id="" />
              )}

              {optionSelected === "e-mail" && (
                <input type="text" ref={emailRef} id="" />
              )}
              {optionSelected === "prix par heure" && (
                <input type="number" ref={priceRef} id="" />
              )}
              {optionSelected === "capacité d'accueil" && (
                <input type="text" ref={capacityRef} id="" />
              )}
              <button
                type="button"
                className="modify_info_parent"
                onClick={handleSubmit}
              >
                Valider
              </button>
              <button
                type="button"
                onClick={handleCancelModify}
                id="cancel_button_form_pro"
              >
                Annuler{" "}
              </button>
            </form>
          </div>
        )}{" "}
        {responseForm && (
          <div className="modif_submit" id="pro_submit">
            {" "}
            Modification enregistrée !{" "}
          </div>
        )}
      </div>

      <div className="container_dashboard_pro_section">
        <div className="info_container_pro" id="manage-bookings">
          <p className="info_pro">Gérer les créneaux</p>
        </div>
        <CalendarDashboard user={user} />
      </div>
      <div className="container_dashboard_pro_section">
        <div className="info_container_pro">
          <p className="info_pro">Gérer les réservations</p>
        </div>
      </div>
      <div className="section_pending_container_pro">
        <h5 className="type_booking">Réservations en attente</h5>
      </div>
      <PendingBookings bookings={getPendingBookings()} />
      <div>
        <h5 className="type_booking">Toutes vos réservations</h5>

        <select
          className="custom_select"
          onChange={(e) => handleViewList(e.target.value)}
        >
          <option value="Sélectionnez">Sélectionnez un état</option>
          <option value="Libre">Libre &ensp;</option>
          <option value="A venir">À venir &ensp;</option>
          <option value="En attente">En attente</option>
          <option value="Passée">Passées</option>
          <option value="Refusée">Refusées</option>
          <option value="Annulée">Annulées</option>
        </select>
      </div>
      <div className="select_desktop">
        <button
          type="button"
          className={selectedButton === "Libre" ? "active" : ""}
          onClick={() => handleViewList("Libre")}
        >
          Libre
        </button>
        <button
          type="button"
          className={selectedButton === "A venir" ? "active" : ""}
          onClick={() => handleViewList("A venir")}
        >
          À venir
        </button>
        <button
          type="button"
          className={selectedButton === "En attente" ? "active" : ""}
          onClick={() => handleViewList("En attente")}
        >
          En attente
        </button>
        <button
          type="button"
          className={selectedButton === "Passée" ? "active" : ""}
          onClick={() => handleViewList("Passée")}
        >
          Passées
        </button>
        <button
          type="button"
          className={selectedButton === "Refusée" ? "active" : ""}
          onClick={() => handleViewList("Refusée")}
        >
          Refusées
        </button>
        <button
          type="button"
          className={selectedButton === "Annulée" ? "active" : ""}
          onClick={() => handleViewList("Annulée")}
        >
          Annulées
        </button>
      </div>

      <BookingsPro bookings={getFilteredBookings()} nursery={user} />
    </div>
  );
}
export default DashboardPro;
