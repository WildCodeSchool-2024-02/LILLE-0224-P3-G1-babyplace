import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "leaflet/dist/leaflet.css";
import "./nurseriesAll.css";

function NurseriesMapLille({ allNurseries }) {
  const lilleMapCenter = [50.633333, 3.066667];

  const updatedAllNurseries = allNurseries.map((nursery) => ({
    ...nursery,
    position: [nursery.latitude, nursery.longitude],
  }));

  return (
    <>
      <div className="line_map_section"> </div>
      <MapContainer center={lilleMapCenter} zoom={13} className="map_container">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {updatedAllNurseries.map((nursery) => (
          <Marker position={nursery.position} key={nursery.nursery_name}>
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
                  {nursery.nursery_name}
                </p>

                <Link to={`/creche/${nursery.nursery_id}`}>
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

NurseriesMapLille.propTypes = {
  allNurseries: PropTypes.arrayOf(
    PropTypes.shape({
      latitude: PropTypes.string.isRequired,
      longitude: PropTypes.string.isRequired,
      nursery_name: PropTypes.string.isRequired,
      image1: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default NurseriesMapLille;
