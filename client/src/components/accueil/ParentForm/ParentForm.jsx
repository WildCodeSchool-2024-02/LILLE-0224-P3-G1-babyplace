import { useState } from "react";
import "leaflet/dist/leaflet.css";
import { useNavigate } from "react-router-dom";
import "./ParentForm.css";

export default function ParentForm() {
  // gère ce qu'écrit l'utilisateur dans les input
  const [streetNameInput, setStreetNameInput] = useState("");
  const [parentName, setParentName] = useState("");
  const [parentLastName, setParentLastName] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [parentCity, setParentCity] = useState("");
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [parentMail, setParentMail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const adressFull = [
    `${selectedNumber} + ${streetNameInput} + ${zipCode} + ${parentCity}`,
  ];

  // fonctions qui permettent de changer les states selon les données entrées par l'utilisateur
  const handleNumberClick = (number) => {
    setSelectedNumber(number);
  };

  const handleStreetNameChange = (e) => {
    setStreetNameInput(e.target.value);
  };

  const handleParentNameChange = (e) => {
    setParentName(e.target.value);
  };

  const handleParentLastNameChange = (e) => {
    setParentLastName(e.target.value);
  };

  const handleZipCodeChange = (e) => {
    setZipCode(e.target.value);
  };

  const handleParentCityChange = (e) => {
    setParentCity(e.target.value);
  };

  const handleParentMailChange = (e) => {
    setParentMail(e.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Appel à l'API pour créer une nouvelle crèche
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/parent`,
        {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            parent_fisrtname: parentName,
            parent_lastname: parentLastName,
            parent_adress: adressFull,

            parent_phone: phoneNumber,
            parent_mail: parentMail,

            parent_password: password,
          }),
        }
      );
      // Redirection vers la page de connexion si la création réussit
      if (response.status === 201) {
        navigate("/dashboard");
      } else {
        // Log des détails de la réponse en cas d'échec
        console.info(response);
      }
    } catch (err) {
      // Log des erreurs possibles
      console.error(err);
    }
  };
  return (
    <div className="form_parent_page">
      <section className="parent_form_P1">
        <h2>Inscription</h2>
        <form method="post">
          <label htmlFor="parent_name_form" className="parent_subtitles_form">
            Nom et Prénom
          </label>
          <div className="name_lastname">Nom</div>
          <input
            id="parent_name_form"
            className="input_parent_form"
            value={parentLastName}
            onChange={handleParentLastNameChange}
            required
          />
          <div className="name_lastname">Prénom</div>
          <input
            id="parent_name_form"
            className="input_parent_form"
            value={parentName}
            onChange={handleParentNameChange}
            required
          />

          <div className="form-container">
            <label htmlFor="parent_name_form" className="form_label">
              Nombre d’enfants
            </label>
            <div className="number-container">
              {[1, 2, 3, 4, 5, 6, 7].map((number) => (
                <button
                  type="button"
                  key={number}
                  className={`number-box ${selectedNumber === number ? "selected" : ""}`}
                  onClick={() => handleNumberClick(number)}
                >
                  {number}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4>Adresse</h4>
            <div>
              <label htmlFor="street_name_form">N° et nom de rue</label>
            </div>
            <input
              id="street_name_form"
              className="input_parent_form"
              value={streetNameInput}
              onChange={handleStreetNameChange}
              required
            />
            <section className="zip_code_city">
              <div className="city_parent_flex">
                <div className="city_parent">
                  <label htmlFor="street_name_form">Code postal</label>
                </div>
                <input
                  id="parent_name_form"
                  className="input_city_zipcode"
                  type="number"
                  value={zipCode}
                  onChange={handleZipCodeChange}
                  required
                />
              </div>
              <div className="city_parent_flex">
                <div className="city_parent">
                  <label htmlFor="street_name_form">Ville</label>
                </div>
                <input
                  id="parent_name_form"
                  className="input_city_zipcode"
                  value={parentCity}
                  onChange={handleParentCityChange}
                  required
                />
              </div>
            </section>
          </div>
          <h4>Coordonnées</h4>
          <label htmlFor="phone_number_parent">
            <div>Numéro de téléphone</div>
            <input
              id="phone_number_parent"
              className="input_parent_form"
              type="tel"
              pattern="[0-9]{10}"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              required
            />
          </label>
          <label htmlFor="parent_email_form">
            <div>Adresse e-mail</div>
            <input
              id="parent_email_form"
              className="input_parent_form"
              type="email"
              value={parentMail}
              onChange={handleParentMailChange}
              required
            />
          </label>
          <label htmlFor="parent_password_form">
            <div>Mot de passe *</div>
            <input
              id="parent_password_form"
              className="input_parent_form"
              type="password"
              required
              value={password}
              onChange={handlePasswordChange}
            />
          </label>
          <label htmlFor="parent_password_confirmation_form">
            <div>Confirmez votre mot de passe *</div>
            <input
              id="parent_password_confirmation_form"
              className="input_parent_form"
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
            />
          </label>
          <section className="navigation_flex">
            <div className="return_btn_parent_form">
              <button
                type="button"
                className="back-arrow"
                onClick={() => navigate(-1)}
              >
                &lt;
              </button>
              <h1 className="parent_name">Retour</h1>
            </div>

            <button
              className="next_btn_parent_form"
              type="submit"
              onClick={handleSubmit}
            >
              Suivant
            </button>
          </section>
        </form>
      </section>
      <div className="img_parent_flex">
        <img
          className="img_parent_form"
          src="../../assets/images/parent.png"
          alt="Parent"
        />
      </div>
    </div>
  );
}
// input_parent_form_street_name
