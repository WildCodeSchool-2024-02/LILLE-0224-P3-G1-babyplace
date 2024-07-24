import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./ChildForm.css";
import { AuthContext } from "../../../context/AuthContext";

export default function ChildForm() {
  const { setRegisterMessage } = useContext(AuthContext);
  const [childFirstName, setChildFirstName] = useState("");
  const [childLastName, setChildLastName] = useState("");
  const [childBirth, setChildBirth] = useState("");
  const [walkStatus, setWalkStatus] = useState(false);
  const [cleanStatus, setCleanStatus] = useState(false);
  const [selectedAllergies, setSelectedAllergies] = useState([]);
  const [selectedCertifications, setSelectedCertifications] = useState([]);
  const [parentMail, setParentMail] = useState("");
  const [parentId, setParentId] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.parentMail) {
      setParentMail(location.state.parentMail);
    }
  }, [location.state]);

  useEffect(() => {
    const fetchParentId = async () => {
      if (parentMail) {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/api/parent/mail/${parentMail}`
          );
          if (response.ok) {
            const parent = await response.json();
            setParentId(parent.parent_id);
          } else {
            console.error("Failed to fetch parent ID:", response.statusText);
          }
        } catch (error) {
          console.error("Error fetching parent ID:", error);
        }
      }
    };

    fetchParentId();
  }, [parentMail]);

  const handleCheckboxChange = (e, setSelected, selected) => {
    const { value } = e.target;
    if (selected.includes(value)) {
      setSelected(selected.filter((item) => item !== value));
    } else {
      setSelected([...selected, value]);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!parentId) {
      console.error("Parent ID not found");
      return;
    }
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/child`,
        {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            child_firstname: childFirstName,
            child_lastname: childLastName,
            child_birth: childBirth,
            walk_status: walkStatus,
            clean_status: cleanStatus,
            parent_id: parentId,
            allergies: selectedAllergies,
          }),
        }
      );

      if (response.status === 201) {
        console.info("Child successfully added");
        setRegisterMessage(true);
        navigate("/");
      } else {
        const errorData = await response.text();
        console.error("Erreur lors de la soumission:", errorData);
      }
    } catch (err) {
      console.error("Erreur réseau ou autre:", err);
    }
  };

  return (
    <div className="form_child_page">
      <section className="child_form_P1">
        <h2>Inscription de l'enfant</h2>
        <form method="post" onSubmit={handleSubmit}>
          <p className="info_child">
            Veuillez renseigner les informations de l'enfant concerné, si vous
            avez plusieurs enfants vous pourrez les renseigner dans votre espace
            personnel.
          </p>
          <label
            htmlFor="child_firstname_form"
            className="child_subtitles_form"
          >
            Prénom
          </label>
          <input
            id="child_firstname_form"
            className="input_child_form"
            value={childFirstName}
            onChange={(e) => setChildFirstName(e.target.value)}
            required
          />
          <label htmlFor="child_lastname_form" className="child_subtitles_form">
            Nom
          </label>
          <input
            id="child_lastname_form"
            className="input_child_form"
            value={childLastName}
            onChange={(e) => setChildLastName(e.target.value)}
            required
          />
          <label htmlFor="child_birth_form" className="child_subtitles_form">
            Date de naissance
          </label>
          <input
            id="child_birth_form"
            className="date_of_birth"
            type="date"
            value={childBirth}
            onChange={(e) => setChildBirth(e.target.value)}
            required
          />
          <h4>Informations supplémentaires</h4>
          <div>Votre enfant sait-il marcher ?</div>
          <div className="check_box_yes_no">
            <label>
              <input
                type="radio"
                name="walk_status"
                value="true"
                checked={walkStatus === true}
                onChange={() => setWalkStatus(true)}
                required
              />
              Oui
            </label>
            <label>
              <input
                type="radio"
                name="walk_status"
                value="false"
                checked={walkStatus === false}
                onChange={() => setWalkStatus(false)}
                required
              />
              Non
            </label>
          </div>
          <div>Votre enfant est-il propre ?</div>
          <div className="check_box_yes_no">
            <label>
              <input
                type="radio"
                name="clean_status"
                value="true"
                checked={cleanStatus === true}
                onChange={() => setCleanStatus(true)}
                required
              />
              Oui
            </label>
            <label>
              <input
                type="radio"
                name="clean_status"
                value="false"
                checked={cleanStatus === false}
                onChange={() => setCleanStatus(false)}
                required
              />
              Non
            </label>
          </div>

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
                  required
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
        </form>
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
