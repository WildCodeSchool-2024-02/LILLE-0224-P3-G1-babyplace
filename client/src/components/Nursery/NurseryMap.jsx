import "./NurseryMap.css";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import PropTypes from "prop-types";

function SimpleMap({ data }) {
  const { latitude } = data;
  const { longitude } = data;
  const nurseryLocation = [latitude, longitude];

  return (
    <MapContainer center={nurseryLocation} zoom={13} className="map_flex">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={nurseryLocation} />
    </MapContainer>
  );
}

SimpleMap.propTypes = {
  data: PropTypes.shape({
    nursery_name: PropTypes.string.isRequired,
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
  }).isRequired,
};

export default SimpleMap;
