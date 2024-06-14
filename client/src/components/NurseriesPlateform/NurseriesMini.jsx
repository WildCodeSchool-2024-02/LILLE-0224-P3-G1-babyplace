/* eslint-disable react/prop-types */
import "./nurseriesAll.css";
import { Link } from "react-router-dom";
import NurseriesCardCalender from "./NurseriesCardCalender";

function NurseriesMini({ name, image1, prices }) {
  return (
    <div className="nursery-list-card">
      <h3 className="nursery-list-title">{name}</h3>
      <img className="nursery-list-img" src={image1} alt="img crèche" />
      <div className="nursery-list-desc">
        <p className="nursery-list-price">Tarif : {prices} €</p>
        <NurseriesCardCalender />
        <Link to="/creche/details">
          {" "}
          <button type="button" className="nursery-list-button">
            Réserver &gt;
          </button>{" "}
        </Link>
      </div>
    </div>
  );
}

export default NurseriesMini;