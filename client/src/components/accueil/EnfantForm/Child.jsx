import { useState } from "react";
import "leaflet/dist/leaflet.css";
import { useNavigate } from "react-router-dom";
import "./Child.css";

export default function ChildForm() {
  // gère ce qu'écrit l'utilisateur pour le nom de la rue, ce qui est tapé dans l'input

  const [selectedAllergies, setSelectedAllergies] = useState([]);
  const [selectedCertifications, setSelectedCertifications] = useState([]);
  const [childName, setChildName] = useState("");
  const [childLastName, setChildLastName] = useState("");
  const navigate = useNavigate();
  const [birthdate, setBirthdate] = useState("");

  // fonctions qui permettent de changer les states selon les données entrées par l'utilisateur
  const handleCheckboxChange = (e, setSelected, selected) => {
    const { value } = e.target;
    if (selected.includes(value)) {
      setSelected(selected.filter((item) => item !== value));
    } else {
      setSelected([...selected, value]);
    }
  };

  const handleChildNameChange = (e) => {
    setChildName(e.target.value);
  };

  const handleChildLastNameChange = (e) => {
    setChildLastName(e.target.value);
  };

  const handleBirthdateChange = (e) => {
    setBirthdate(e.target.value);
  };

  return (
    <div className="form_child_page">
      <section className="child_form_P1">
        <h2>Information enfant</h2>
        <form method="post">
          <label htmlFor="child_name_form" className="child_subtitles_form">
            Nom et Prénom
          </label>
          <div className="name_lastname">Nom</div>
          <input
            id="child_name_form"
            className="input_child_form"
            value={childLastName}
            onChange={handleChildLastNameChange}
          />
          <div className="name_lastname">Prénom</div>
          <input
            id="child_name_form"
            className="input_child_form"
            value={childName}
            onChange={handleChildNameChange}
          />

          <div className="name_lastname">Date de naissance</div>
          <input
            id="child_name_form"
            className="date_of_birth"
            type="date"
            value={birthdate}
            onChange={handleBirthdateChange}
            required
          />

          <h4>Informations supplémentaires</h4>

          <div>Votre enfant a-t-il des allergies ?</div>
          <div className="check_box_container_register2">
            {["Oui", "Non"].map((certification) => (
              <label key={certification}>
                <input
                  type="radio"
                  name="oui_non"
                  value={certification}
                  checked={selectedCertifications.includes(certification)}
                  onChange={(e) =>
                    handleCheckboxChange(
                      e,
                      setSelectedCertifications,
                      selectedCertifications
                    )
                  }
                />
                {certification}
              </label>
            ))}
          </div>

          <div className="yes_no">Si oui, lesquelles ?</div>
          <div className="check_box_container_register">
            {[
              "Gluten",
              "Fruits à coque",
              "Crustacés",
              "Célerie",
              "Oeufs",
              "Moutarde",
              "Poissons",
              "Soja",
              "Lait",
              "Sulfites",
              "Sésame",
              "Lupin",
              "Arachides",
              "Mollusques",
              "autres",
            ].map((allergies) => (
              <label key={allergies}>
                <input
                  type="checkbox"
                  value={allergies}
                  checked={selectedAllergies.includes(allergies)}
                  onChange={(e) =>
                    handleCheckboxChange(
                      e,
                      setSelectedAllergies,
                      selectedAllergies
                    )
                  }
                />
                {allergies}
              </label>
            ))}
          </div>
        </form>
        <section className="navigation_flex_child">
          <div className="return_btn_h1">
            <button
              type="button"
              className="back-arrow"
              onClick={() => navigate(-1)}
            >
              &lt;
            </button>
            <h1 className="child_name">Retour</h1>
          </div>

          <button
            id="submit_btn_child"
            className="next_btn_child"
            type="submit"
          >
            Suivant
          </button>
        </section>
      </section>
      <div className="img_child_flex">
        <img
          className="img_child_form"
          src="../../assets/images/parent.png"
          alt="child"
        />
      </div>
    </div>
  );
}
