import { useState, useContext } from "react";
import "leaflet/dist/leaflet.css";
import { useLoaderData, useNavigate } from "react-router-dom";
import "./nurseryRegister.css";
import { AuthContext } from "../../context/AuthContext";

export default function NurseryRegisterForm() {
  const { setRegisterMessage } = useContext(AuthContext);
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

  // Gérer les messages d'erreur si le numéro de rue n'est pas valable
  const [addressError, setAddressError] = useState(null);

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

  // États pour le mot de passe et la confirmation du mot de passe
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
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

  const [email, setEmail] = useState(null);
  const [nurseryName, setNurseryName] = useState(null);
  const [capacityInput, setCapacityInput] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [priceInput, setPrice] = useState(null);
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [aboutInput, setAboutInput] = useState(null);

  const [missingEmail, setMissingEmail] = useState(false);
  const [missingNurseryName, setMissingNurseryName] = useState(false);
  const [missingCapacityInput, setMissingCapacityInput] = useState(false);
  const [missingPhoneNumber, setMissingPhoneNumber] = useState(false);
  const [missingPriceInput, setMissingPriceInput] = useState(false);
  const [missingImage1, setMissingImage1] = useState(false);
  const [missingImage2, setMissingImage2] = useState(false);
  const [missingImage3, setMissingImage3] = useState(false);
  const [missingAboutInput, setMissingAboutInput] = useState(false);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleNurseryNameChange = (e) => setNurseryName(e.target.value);
  const handleCapacityChange = (e) => setCapacityInput(e.target.value);
  const handlePhoneNumberChange = (e) => setPhoneNumber(e.target.value);
  const handlePriceChange = (e) => setPrice(e.target.value);
  const handleImage1Change = (e) => setImage1(e.target.value);
  const handleImage2Change = (e) => setImage2(e.target.value);
  const handleImage3Change = (e) => setImage3(e.target.value);
  const handleAboutChange = (e) => setAboutInput(e.target.value);

  const [missingFields, setMissingFields] = useState(false);

  // fonction pour upload les images et les envoyer en back
  const handleUpload = async (image) => {
    const formData = new FormData();
    formData.append("file", image);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const imageData = await response.json();
      return `/assets/images${imageData.filePath}`;
    } catch (error) {
      console.error("Error uploading file:", error);
      return null;
    }
  };

  // fonction pour envoyer les données du formulaire crèche vers le back, créer une nouvelle crèche dans notre db (après avoir récupéré les images)
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (email.length < 1) {
      setMissingEmail(true);
    } else {
      setMissingEmail(false);
    }

    if (nurseryName === null) {
      setMissingNurseryName(true);
    } else {
      setMissingNurseryName(false);
    }

    if (capacityInput === null) {
      setMissingCapacityInput(true);
    } else {
      setMissingCapacityInput(false);
    }

    if (phoneNumber === null) {
      setMissingPhoneNumber(true);
    } else {
      setMissingPhoneNumber(false);
    }

    if (priceInput === null) {
      setMissingPriceInput(true);
    } else {
      setMissingPriceInput(false);
    }

    if (image1 === null) {
      setMissingImage1(true);
    } else {
      setMissingImage1(false);
    }

    if (image2 === null) {
      setMissingImage2(true);
    } else {
      setMissingImage2(false);
    }

    if (image3 === null) {
      setMissingImage3(true);
    } else {
      setMissingImage3(false);
    }

    if (aboutInput === null) {
      setMissingAboutInput(true);
    } else {
      setMissingAboutInput(false);
    }
    if (
      email === null ||
      nurseryName === null ||
      capacityInput === null ||
      phoneNumber === null ||
      priceInput === null ||
      image1 === null ||
      image2 === null ||
      image3 === null ||
      aboutInput === null
    ) {
      setMissingFields(true);
    }
    const image1File = image1;
    const image2File = image2;
    const image3File = image3;

    const addressExists = data.some(
      (address) =>
        address.voie_nom.toLowerCase() === streetName.toLowerCase() &&
        parseInt(address.numero, 10) === parseInt(streetNumber, 10)
    );

    if (!addressExists) {
      setAddressError("Le numéro de rue entré n'est pas valide.");
      return;
    }

    // Réinitialise l'erreur d'adresse si tout est correct
    setAddressError(null);

    try {
      const image1Path = await handleUpload(image1File);
      const image2Path = await handleUpload(image2File);
      const image3Path = await handleUpload(image3File);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/nursery`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nursery_name: nurseryName,
            nursery_street: streetName,
            role: "nursery",
            nursery_street_number: streetNumber,
            latitude: adresseDefinitive[0].lat,
            longitude: adresseDefinitive[0].longitude,
            city: selectedCity,
            capacity: capacityInput,
            price: priceInput,
            nursery_phone: phoneNumber,
            nursery_mail: email,
            image1: image1Path,
            image2: image2Path,
            image3: image3Path,
            nursery_password: password,
            acitivy1: selectedActivities[0],
            activity2:
              selectedActivities.length > 1 ? selectedActivities[1] : "",
            activity3:
              selectedActivities.length > 2 ? selectedActivities[2] : "",
            certification1: selectedActivities[0],
            certification2:
              selectedActivities.length > 1 ? selectedActivities[1] : "",
            certification3:
              selectedActivities.length > 2 ? selectedActivities[2] : "",
            about: aboutInput,
          }),
        }
      );

      // redirection vers la page dashboard de la crèche
      if (response.status === 201) {
        setRegisterMessage(true);
        navigate("/");
      } else {
        console.info(response.data);
      }
    } catch (err) {
      console.error(err);
      setAddressError("Une erreur s'est produite lors de l'inscription.");
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
              className={
                missingNurseryName ? "input_not_filled" : "input_nursery_form"
              }
              value={nurseryName}
              onChange={handleNurseryNameChange}
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
                <span
                  className={
                    addressError ? "red_text" : "street_number_container"
                  }
                >
                  <label htmlFor="street_number">N°:</label>
                  <input
                    id="street_number"
                    className={
                      addressError
                        ? "input_nursery_form_street_number_red"
                        : "input_nursery_form_street_number"
                    }
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
                className={
                  missingPhoneNumber ? "input_not_filled" : "input_nursery_form"
                }
                type="tel"
                pattern="[0-9]{10}"
                title="Veuillez entrer un numéro de téléphone valide"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                required
              />
            </label>
            <label htmlFor="nursery_email_form">
              <div>Adresse e-mail * </div>
              <input
                value={email}
                onChange={handleEmailChange}
                className={
                  missingEmail ? "input_not_filled" : "input_nursery_form"
                }
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
                className={
                  missingCapacityInput
                    ? "input_not_filled"
                    : "input_nursery_form"
                }
                type="number"
                min="0"
                value={capacityInput}
                onChange={handleCapacityChange}
                required
              />
            </label>
            <label htmlFor="nursery_price_form">
              <div>Quel est le tarif pour une heure? *</div>
              <input
                id="nursery_price_form"
                className={
                  missingPriceInput ? "input_not_filled" : "input_nursery_form"
                }
                type="number"
                min="0"
                value={priceInput}
                onChange={handlePriceChange}
                required
              />
              €
            </label>
            <label htmlFor="nursery_about_form">
              {" "}
              <div> Décrivez votre crèche en quelques lignes</div>
              <textarea
                id="nursery_about_form"
                className={
                  missingAboutInput ? "input_not_filled" : "input_nursery_form"
                }
                value={aboutInput}
                onChange={handleAboutChange}
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
                  <span className={missingImage1 ? "red_text" : "normal_text"}>
                    Image 1 * :
                  </span>{" "}
                  <input
                    value={image1}
                    onChange={handleImage1Change}
                    type="file"
                    className="image_input_register"
                  />
                </div>
                <div>
                  <span className={missingImage2 ? "red_text" : "normal_text"}>
                    Image 2 * :{" "}
                  </span>
                  <input
                    value={image2}
                    onChange={handleImage2Change}
                    type="file"
                    className="image_input_register"
                  />
                </div>
                <div>
                  <span className={missingImage3 ? "red_text" : "normal_text"}>
                    Image 3 * :{" "}
                  </span>
                  <input
                    value={image3}
                    onChange={handleImage3Change}
                    type="file"
                    className="image_input_register"
                  />
                </div>
              </div>
            </label>
            {missingFields && (
              <div className="red_text" id="error_msg">
                Veuillez remplir tous les champs
              </div>
            )}
            {addressError && (
              <div className="red_text" id="error_msg">
                {addressError}
              </div>
            )}
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
