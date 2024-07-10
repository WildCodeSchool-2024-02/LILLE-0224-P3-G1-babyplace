import { useState } from "react";
import "leaflet/dist/leaflet.css";
import { useNavigate } from "react-router-dom";
import "./ParentForm.css";

export default function ParentForm() {
  const [streetNameInput, setStreetNameInput] = useState("");
  const [parentFirstName, setParentFirstName] = useState("");
  const [parentLastName, setParentLastName] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [parentCity, setParentCity] = useState("");
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [parentMail, setParentMail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [parentId, setParentId] = useState(null);
  const navigate = useNavigate();
  const adressFull = `${streetNameInput} ${zipCode} ${parentCity}`;

  const handleNumberClick = (number) => {
    setSelectedNumber(number);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/parent`,
        {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            parent_firstname: parentFirstName,
            parent_lastname: parentLastName,
            parent_adress: adressFull,
            role: "parent",
            parent_phone: phoneNumber,
            parent_mail: parentMail,
            parent_password: password,
            parent_confirmPassword: confirmPassword,
          }),
        }
      );

      if (response.status === 201) {
        const { insertId } = await response.json();
        if (insertId) {
          setParentId(insertId);
          navigate("/inscription/enfant", {
            state: { parentMail, parentId: insertId },
          });
        } else {
          console.error("Insert ID not found in response");
        }
      } else {
        console.info(response);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="form_parent_page">
      <section className="parent_form_P1">
        <h2>Inscription</h2>
        <form method="post" onSubmit={handleSubmit}>
          <label htmlFor="parent_name_form" className="parent_subtitles_form">
            Nom et Prénom
          </label>
          <div className="name_lastname">Nom</div>
          <input
            id="parent_name_form1"
            className="input_parent_form"
            value={parentLastName}
            onChange={(e) => setParentLastName(e.target.value)}
            required
          />
          <div className="name_lastname">Prénom</div>
          <input
            id="parent_name_form2"
            className="input_parent_form"
            value={parentFirstName}
            onChange={(e) => setParentFirstName(e.target.value)}
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
                  className={`number-box ${
                    selectedNumber === number ? "selected" : ""
                  }`}
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
              onChange={(e) => setStreetNameInput(e.target.value)}
              required
            />
            <section className="zip_code_city">
              <div className="city_parent_flex">
                <div className="city_parent">
                  <label htmlFor="parent_name_form3">Code postal</label>
                </div>
                <input
                  id="parent_name_form3"
                  className="input_city_zipcode"
                  type="number"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  required
                />
              </div>
              <div className="city_parent_flex">
                <div className="city_parent">
                  <label htmlFor="parent_name_form4">Ville</label>
                </div>
                <input
                  id="parent_name_form4"
                  className="input_city_zipcode"
                  value={parentCity}
                  onChange={(e) => setParentCity(e.target.value)}
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
              onChange={(e) => setPhoneNumber(e.target.value)}
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
              onChange={(e) => setParentMail(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <label htmlFor="parent_password_confirmation_form">
            <div>Confirmez votre mot de passe *</div>
            <input
              id="parent_password_confirmation_form"
              className="input_parent_form"
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
            <button className="next_btn_parent_form" type="submit">
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
      {parentId && (
        <div className="parent-id-display">Parent ID: {parentId}</div>
      )}
    </div>
  );
}
