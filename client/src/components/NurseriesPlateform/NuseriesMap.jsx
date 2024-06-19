import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "leaflet/dist/leaflet.css";
import NurseriesCardCalender from "./NurseriesCardCalender";
import "./nurseriesAll.css";

function NurseriesMap({ lilleNurseries }) {
  const lilleMapCenter = [50.633333, 3.066667];

  return (
    <>
      <div className="line_map_section"> </div>
      <MapContainer center={lilleMapCenter} zoom={13} className="map_container">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {lilleNurseries.map((nursery) => (
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
                  src={nursery.image1}
                  alt="img"
                  style={{ width: "200px" }}
                />
                <p
                  style={{
                    fontSize: "1.3em",
                    color: "#9c69e2",
                    fontWeight: "bold",
                    marginBottom: "-0.1em",
                    marginTop: "0.4em",
                  }}
                >
                  {nursery.name}
                </p>
                <NurseriesCardCalender />
                <Link to="/creche/details">
                  <button type="button" className="button_link_map">
                    Voir
                  </button>
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </>
  );
}

NurseriesMap.propTypes = {
  lilleNurseries: PropTypes.arrayOf(
    PropTypes.shape({
      map: PropTypes.arrayOf(PropTypes.number).isRequired,
      name: PropTypes.string.isRequired,
      image1: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default NurseriesMap;
