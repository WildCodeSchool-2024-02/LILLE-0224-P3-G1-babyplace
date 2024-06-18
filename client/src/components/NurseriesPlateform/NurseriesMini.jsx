/* eslint-disable react/prop-types */
import "./nurseriesAll.css";
import { Link } from "react-router-dom";
import NurseriesCardCalender from "./NurseriesCardCalender";

function NurseriesMini({ name, image1, prices }) {
  return (
    <div className="nursery_list_card">
      <h3 className="nursery_list_title">{name}</h3>
      <img className="nursery_list_img" src={image1} alt="img nursery" />
      <div className="nursery_list_desc">
        <p className="nursery_list_price">Tarif : {prices} €</p>
        <NurseriesCardCalender />
        <Link to="/creche/details">
          {" "}
          <button type="button" className="nursery_list_button">
            Réserver &gt;
          </button>{" "}
        </Link>
      </div>
    </div>
  );
}

export default NurseriesMini;
