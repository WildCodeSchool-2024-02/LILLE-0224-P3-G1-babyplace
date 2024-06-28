import "./SearchByName.css";
import PropTypes from "prop-types";

function SearchByName({ onSearch }) {
  const handleChange = (e) => {
    const { value } = e.target;
    onSearch(value);
  };

  return (
    <div className="dashboard_reservation_container_input">
      <input
        className="dashboard_reservation_input"
        id="search_dashboard_moderator"
        type="search"
        placeholder="Rechercher par nom:"
        onChange={handleChange}
      />
    </div>
  );
}


SearchByName.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchByName;
