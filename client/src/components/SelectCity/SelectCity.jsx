import "./SelectCity.css";

function SelectCity() {
  return (
      <div className="dashboard_reservation_lille">
        <select className="reservation_select">
          <option value="0" disabled selected>
            Choisissez une ville
          </option>
          <option value="1">Lille &ensp;</option>
          <option value="2">Renne</option>
        </select>
      </div>
  );
}

export default SelectCity;
