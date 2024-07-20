import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import NurseriesCardCalender from "./NurseriesCardCalender";
import "./nurseriesAll.css";

function NurseriesMini({ id, name, image1, price, bookings }) {
  return (
    <div className="nursery_list_card">
      <h3 className="nursery_list_title">{name}</h3>
      <img className="nursery_list_img" src={image1} alt="img nursery" />
      <div className="nursery_list_desc">
        <p className="nursery_list_price">Tarif : {price} € /h</p>
        <NurseriesCardCalender bookings={bookings} />
        <Link to={`/creche/${id}`}>
          {" "}
          <button type="button" className="nursery_list_button">
            Découvrir &gt;
          </button>{" "}
        </Link>
      </div>
    </div>
  );
}

NurseriesMini.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  image1: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  bookings: PropTypes.arrayOf(
    PropTypes.shape({
      booking_id: PropTypes.number.isRequired,
      booking_operation_date: PropTypes.string.isRequired,
      slots: PropTypes.string.isRequired,
      state: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default NurseriesMini;
