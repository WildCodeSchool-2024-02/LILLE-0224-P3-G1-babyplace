import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useLoaderData } from "react-router-dom";

export default function NurseryForm() {
  // charge la database
  const data = useLoaderData();

  // dans le module, nécessité de donner deux coordonnées pour le centre de la map (ici centre de Lille)
  const lilleMapCenter = [50.633333, 3.066667];

  // gère ce qu'écrit l'utilisateur pour le nom de la rue
  const [streetNameInput, setStreetNameInput] = useState("");
  // rue sélectionnée par l'utilisateur
  const [streetName, setStreetName] = useState("");
  // numéro de la rue entrée par l'utilisateur
  const [streetNumber, setStreetNumber] = useState("");
  const [adressSelected, setAdressSelected] = useState(false);

  // nom de la crèche entrée par l'utilisateur
  const [nurseryName, setNurseryName] = useState("");
  const [nurseryPlacesLille, setNurseryPlacesLille] = useState([]);

  // Ne filtre les résultats que si le champ de saisie contient au moins 5 caractères
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

  return (
    <section className="info-carte" style={{ marginTop: "4em" }}>
      <form method="post">
        <label htmlFor="nurseryName">Nom de la crèche :</label>
        <input
          id="nurseryName"
          value={nurseryName}
          onChange={handleNurseryNameChange}
        />
        <div>
          <label htmlFor="streetName">Nom de la rue :</label>
          <input
            id="streetName"
            value={streetNameInput}
            onChange={handleStreetNameChange}
          />
        </div>
        <div>
          {uniqueResults.length > 0 && (
            <select onChange={handleSelectionChange}>
              <option value=""> --- </option>
              {uniqueResults.map((address) => (
                <option key={address.id} value={address.voie_nom}>
                  {address.voie_nom}
                </option>
              ))}
            </select>
          )}

          {adressSelected && (
            <>
              <label htmlFor="streetNumber">N°: </label>
              <input
                id="streetNumber"
                value={streetNumber}
                onChange={handleStreetNumberChange}
              />
            </>
          )}
        </div>
      </form>
      <button type="button" onClick={handleAddNursery}>
        Valider
      </button>
      <MapContainer
        center={lilleMapCenter}
        zoom={13}
        style={{ height: "500px", width: "50%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {nurseryPlacesLille.map((nursery) => (
          <Marker position={nursery.map} key={nursery.name}>
            <Popup>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "5px",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src="https://www.vandoeuvre.fr/wp-content/uploads/2021/03/Creche_les_Alizees-1200x630.jpg"
                  alt="img"
                  style={{ width: "10vw" }}
                />
                <p
                  style={{
                    fontSize: "1.5em",
                    color: "blue",
                    fontWeight: "bold",
                  }}
                >
                  {nursery.name}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </section>
  );
}
