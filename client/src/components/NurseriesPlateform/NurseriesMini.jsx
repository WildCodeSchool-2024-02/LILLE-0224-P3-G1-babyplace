import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import NurseriesCardCalender from "./NurseriesCardCalender";
import "./nurseriesAll.css";

function NurseriesMini({ name, image1, price }) {
  return (
    <div className="nursery_list_card">
      <h3 className="nursery_list_title">{name}</h3>
      <img className="nursery_list_img" src={image1} alt="img nursery" />
      <div className="nursery_list_desc">
        <p className="nursery_list_price">Tarif : {price} €</p>
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

NurseriesMini.propTypes = {
  name: PropTypes.string.isRequired,
  image1: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

export default NurseriesMini;
