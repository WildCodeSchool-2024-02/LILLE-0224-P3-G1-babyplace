import { useState } from "react";
import "leaflet/dist/leaflet.css";
import { useLoaderData } from "react-router-dom";
import "./nurseryRegister.css";

export default function NurseryRegisterForm() {
  // charge la database depuis main
  const data = useLoaderData();
  // gère ce qu'écrit l'utilisateur pour le nom de la rue, ce qui est tapé dans l'input
  const [streetNameInput, setStreetNameInput] = useState("");
  // rue sélectionnée par l'utilisateur
  const [streetName, setStreetName] = useState("");
  // numéro de la rue entré par l'utilisateur
  const [streetNumber, setStreetNumber] = useState("");

  // permet de passer à l'étape suivante une fois que la rue a été sélectionnée (afficher l'input pour le numéro)
  const [adressSelected, setAdressSelected] = useState(false);

  // nom de la crèche entrée par l'utilisateur
  const [nurseryName, setNurseryName] = useState("");
  const [nurseryPlacesLille, setNurseryPlacesLille] = useState([]);

  // compare ce qui a été saisi par l'utilisateur avec les noms de rues du json
  // ne filtre les résultats que si le champ de saisie contient au moins 5 caractères
  const filteredResults =
    streetNameInput.length >= 5
      ? data.filter((address) =>
          address.voie_nom.toLowerCase().includes(streetNameInput.toLowerCase())
        )
      : [];

  // évite les doublons dans les résultats des rues
  const uniqueResults = filteredResults.reduce((acc, current) => {
    const x = acc.find((item) => item.voie_nom === current.voie_nom);
    if (!x) {
      return acc.concat([current]);
    }
    return acc;
  }, []);

  //  recherche dans la base de données la tuple qui correspond exactement au nom de la rue/numéro sélectionnés par l'utilisateur
  const adresseDefinitive =
    streetName && streetNumber
      ? data.filter(
          (address) =>
            address.voie_nom.toLowerCase() === streetName.toLowerCase() &&
            parseInt(address.numero, 10) === parseInt(streetNumber, 10)
        )
      : [];

  // fonctions qui permettent de changer les states selon les données entrées par l'utilisateur
  const handleStreetNameChange = (e) => {
    setStreetNameInput(e.target.value);
  };

  const handleSelectionChange = (e) => {
    setAdressSelected(true);
    setStreetName(e.target.value);
  };

  const handleStreetNumberChange = (e) => {
    setStreetNumber(e.target.value);
  };

  const handleNurseryNameChange = (e) => {
    setNurseryName(e.target.value);
  };

  // ajoute une nouvelle crèche à la liste et pour l'afficher sur la carte
  const handleAddNursery = () => {
    if (adresseDefinitive.length > 0) {
      const newNursery = {
        name: nurseryName,
        map: [
          parseFloat(adresseDefinitive[0].lat),
          parseFloat(adresseDefinitive[0].longitude),
        ],
      };
      setNurseryPlacesLille([...nurseryPlacesLille, newNursery]);
    }
  };

  // gére la ville sélectionnée pour que ça parte chercher dans le bon json
  const [selectedCity, setSelectedCity] = useState("");

  // gère le nombre d'activités
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [selectedCertifications, setSelectedCertifications] = useState([]);

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  // limiter le nombre de cases à cocher pour les listes activités et certification
  const handleCheckboxChange = (e, setSelected, selected) => {
    const { value } = e.target;
    if (selected.includes(value)) {
      setSelected(selected.filter((item) => item !== value));
    } else if (selected.length < 3) {
      setSelected([...selected, value]);
    }
  };

  return (
    <div className="form_nursery_page">
      <section className="nursery_form_P1">
        <h2>Inscription</h2>
        <form method="post">
          <label htmlFor="nursery_name_form" className="nursery_subtitles_form">
            Quel est le nom de votre structure ?
          </label>
          <input
            id="nursery_name_form"
            className="input_nursery_form"
            value={nurseryName}
            onChange={handleNurseryNameChange}
          />
          <div>
            <span className="nursery_subtitles_form">
              Où se situe votre structure ?
            </span>
            <div className="box_choices_nursery_form">
              <label>
                Lille
                <input
                  type="radio"
                  value="Lille"
                  checked={selectedCity === "Lille"}
                  onChange={handleCityChange}
                />
              </label>
              <label>
                Rennes
                <input
                  type="radio"
                  value="Rennes"
                  checked={selectedCity === "Rennes"}
                  onChange={handleCityChange}
                />
              </label>
            </div>
            <h4>Adresse</h4>
            <div>
              <label htmlFor="street_name_form">
                Entrez le nom de votre rue :
              </label>
              <input
                id="street_name_form"
                className="input_nursery_form_street_name"
                value={streetNameInput}
                onChange={handleStreetNameChange}
              />
            </div>
            {uniqueResults.length > 0 && (
              <>
                <span className="street_name_designated">Rue :</span>
                <select
                  onChange={handleSelectionChange}
                  className="select_street_register"
                >
                  <option value=""> --- </option>
                  {uniqueResults.map((address) => (
                    <option key={address.id} value={address.voie_nom}>
                      {address.voie_nom}
                    </option>
                  ))}
                </select>
              </>
            )}
            {adressSelected && (
              <span className="street_number_container">
                <label htmlFor="street_number">N°:</label>
                <input
                  id="street_number"
                  className="input_nursery_form_street_number"
                  value={streetNumber}
                  onChange={handleStreetNumberChange}
                />
              </span>
            )}
          </div>
          <h4>Coordonnées</h4>
          <label htmlFor="phone_number_nursery">
            <div>Numéro de téléphone</div>
            <input
              id="phone_number_nursery"
              className="input_nursery_form"
              type="tel"
              pattern="[0-9]{10}"
              title="Veuillez entrer un numéro de téléphone valide"
            />
          </label>
          <label htmlFor="nursery_email_form">
            <div>Adresse e-mail</div>
            <input
              id="nursery_email_form"
              className="input_nursery_form"
              type="email"
            />
          </label>
          <label htmlFor="nursery_password_form">
            <div>Mot de passe</div>
            <input
              id="nursery_password_form"
              className="input_nursery_form"
              type="password"
            />
          </label>
          <h4>Informations</h4>
          <label htmlFor="nursery_capacity_form">
            <div>Quelle est votre capacité d'accueil ?</div>
            <input
              id="nursery_capacity_form"
              className="input_nursery_form"
              type="number"
              min="0"
            />
          </label>
          <label htmlFor="nursery_price_form">
            <div>Quel est le tarif pour une demie-journée ?</div>
            <input
              id="nursery_price_form"
              className="input_nursery_form"
              type="number"
              min="0"
            />
          </label>
          <div>Quelles activités proposez-vous ? (3 maximum)</div>
          <div className="check_box_container_register">
            {[
              "Bilingue anglais",
              "Bilingue espagnol",
              "Bilingue arabe",
              "Éveil musical",
              "Jardinage",
              "Éveil sensoriel",
              "Yoga",
              "Arts plastiques",
              "Puzzle et jeux de construction",
              "Cuisine",
            ].map((activity) => (
              <label key={activity}>
                <input
                  type="checkbox"
                  value={activity}
                  checked={selectedActivities.includes(activity)}
                  onChange={(e) =>
                    handleCheckboxChange(
                      e,
                      setSelectedActivities,
                      selectedActivities
                    )
                  }
                />
                {activity}
              </label>
            ))}
          </div>
          <div>Quelles certifications avez-vous ? (3 maximum)</div>
          <div className="check_box_container_register">
            {[
              "Repas Bio",
              "Montessori",
              "PMI",
              "Certi'crèche",
              "Label Ecolo Crèche",
              "Quali Crèche",
            ].map((certification) => (
              <label key={certification}>
                <input
                  type="checkbox"
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
        </form>
        <button
          type="submit"
          onClick={handleAddNursery}
          className="nursery_list_button"
        >
          Continuer
        </button>
      </section>
      <img src="../../assets/images/nursery-inscription.jpg" alt="Nursery" />
    </div>
  );
}
