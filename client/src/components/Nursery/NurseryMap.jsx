import "./NurseryMap.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function SimpleMap() {
  const lilleMapCenter = [50.633333, 3.066667];
  const nurseryLocation = [50.619581, 3.06647];

  return (
    <MapContainer center={lilleMapCenter} zoom={13} className="map_flex">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={nurseryLocation}>
        <Popup>
          Lillomomes
          <br />
          27 rue Courmont
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default SimpleMap;
