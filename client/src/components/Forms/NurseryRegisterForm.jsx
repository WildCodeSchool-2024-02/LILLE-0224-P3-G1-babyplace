import { useState, useRef } from "react";
import "leaflet/dist/leaflet.css";
import { useLoaderData, useNavigate } from "react-router-dom";
import "./nurseryRegister.css";

export default function NurseryRegisterForm() {
  const navigate = useNavigate();

  // charge la database des adresses (lille et rennes)
  const data = useLoaderData();
  // gére la ville sélectionnée pour que ça parte chercher dans le bon json
  const [selectedCity, setSelectedCity] = useState("");
  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };
  // gère l'adresse entrée par l'utilisateur
  const [streetNameInput, setStreetNameInput] = useState("");
  const [streetName, setStreetName] = useState("");
  const [streetNumber, setStreetNumber] = useState("");
  // permet de passer à l'étape suivante une fois que la rue a été sélectionnée (afficher l'input pour le numéro)
  const [adressSelected, setAdressSelected] = useState(false);

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

  // États pour le mot de passe et la confirmation du mot de passe
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

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

  // gère le nombre d'activités
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [selectedCertifications, setSelectedCertifications] = useState([]);
  const handleCheckboxChange = (e, setSelected, selected) => {
    const { value } = e.target;
    if (selected.includes(value)) {
      setSelected(selected.filter((item) => item !== value));
    } else if (selected.length < 3) {
      setSelected([...selected, value]);
    }
  };

  const emailRef = useRef();
  const nurseryNameRef = useRef();
  const capacityRef = useRef();
  const phoneNumberRef = useRef();
  const priceRef = useRef();
  const image1Ref = useRef();
  const image2Ref = useRef();
  const image3Ref = useRef();
  const aboutRef = useRef();

  // Gestionnaire de soumission du formulaire
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Appel à l'API pour créer une nouvelle crèche
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/nursery`,
        {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nursery_name: nurseryNameRef.current.value,
            nursery_street: streetName,
            nursery_street_number: streetNumber,
            latitude: adresseDefinitive[0].lat,
            longitude: adresseDefinitive[0].longitude,
            city: selectedCity,
            capacity: capacityRef.current.value,
            price: priceRef.current.value,
            nursery_phone: phoneNumberRef.current.value,
            nursery_mail: emailRef.current.value,
            image1: image1Ref.current.value,
            image2: image2Ref.current.value,
            image3: image3Ref.current.value,
            nursery_password: password,
            acitivy1: selectedActivities[0],
            activity2: selectedActivities[1],
            activity3: selectedActivities[2],
            certification1: selectedCertifications[0],
            certification2: selectedCertifications[1],
            certification3: selectedCertifications[2],
            about: aboutRef.current.value,
          }),
        }
      );

      // Redirection vers la page de connexion si la création réussit
      if (response.status === 201) {
        navigate("/dashboard/pro");
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
    <>
      <h2 className="nursery_title_form ">Inscription</h2>
      <div className="form_nursery_page">
        <section className="nursery_form_P1">
          <form method="post" onSubmit={handleSubmit}>
            <label
              htmlFor="nursery_name_form"
              className="nursery_subtitles_form"
            >
              Quel est le nom de votre structure ? *
            </label>
            <input
              id="nursery_name_form"
              className="input_nursery_form"
              ref={nurseryNameRef}
              required
            />
            <div>
              <span className="nursery_subtitles_form">
                Où se situe votre structure ? *
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
                  Entrez le nom de votre rue *
                </label>
                <input
                  id="street_name_form"
                  className="input_nursery_form_street_name"
                  value={streetNameInput}
                  onChange={handleStreetNameChange}
                  required
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
              <div>Numéro de téléphone *</div>
              <input
                id="phone_number_nursery"
                className="input_nursery_form"
                type="tel"
                pattern="[0-9]{10}"
                title="Veuillez entrer un numéro de téléphone valide"
                ref={phoneNumberRef}
                required
              />
            </label>
            <label htmlFor="nursery_email_form">
              <div>Adresse e-mail * </div>
              <input
                ref={emailRef}
                id="nursery_email_form"
                className="input_nursery_form"
                type="email"
                required
              />
            </label>
            <label htmlFor="nursery_password_form">
              <div>Mot de passe *</div>
              <input
                id="nursery_password_form"
                className="input_nursery_form"
                type="password"
                required
                value={password}
                onChange={handlePasswordChange}
              />
            </label>
            <label htmlFor="nursery_password_confirmation_form">
              <div>Confirmez votre mot de passe *</div>
              <input
                id="nursery_password_confirmation_form"
                className="input_nursery_form"
                type="password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                required
              />
            </label>
            <h4>Informations</h4>
            <label htmlFor="nursery_capacity_form">
              <div>Quelle est votre capacité d'accueil ? *</div>
              <input
                id="nursery_capacity_form"
                className="input_nursery_form"
                type="number"
                min="0"
                ref={capacityRef}
                required
              />
            </label>
            <label htmlFor="nursery_price_form">
              <div>Quel est le tarif pour une demie-journée ? *</div>
              <input
                id="nursery_price_form"
                className="input_nursery_form"
                type="number"
                min="0"
                ref={priceRef}
                required
              />
              €
            </label>
            <label htmlFor="nursery_about_form">
              {" "}
              <div> Décrivez votre crèche en quelques lignes</div>
              <textarea
                id="nursery_about_form"
                className="input_nursery_form"
                ref={aboutRef}
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
            <label
              htmlFor="nursery_images_form"
              className="nursery_images_form"
            >
              {" "}
              <h4>
                Enregistrez trois images pour la présentation de votre crèche
              </h4>
              <div className="images_input_container">
                <div>
                  Image 1 * :{" "}
                  <input
                    ref={image1Ref}
                    type="file"
                    className="image_input_register"
                  />
                </div>
                <div>
                  Image 2 * :{" "}
                  <input
                    ref={image2Ref}
                    type="file"
                    className="image_input_register"
                  />
                </div>
                <div>
                  Image 3 * :{" "}
                  <input
                    ref={image3Ref}
                    type="file"
                    className="image_input_register"
                  />
                </div>
              </div>
            </label>
            <button
              type="submit"
              className="validate_button_nursery_form"
              onClick={handleSubmit}
            >
              S'inscrire
            </button>
          </form>
        </section>

        <img
          src="../../assets/images/nursery-inscription.jpg"
          alt="nursery decorative img"
          className="nursery_form_img"
        />
      </div>
    </>
  );
}
