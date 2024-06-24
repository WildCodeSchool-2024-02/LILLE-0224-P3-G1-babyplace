import "./SearchByName.css";

function SearchByName() {
  return (
    <div>
      <div className="dashboard_reservation_container_input">
        <input
          className="dashboard_reservation_input"
          id="search_dashboard_admin"
          type="search"
          placeholder="Rechercher par nom:"
        />
      </div>
    </div>
  );
}

export default SearchByName;
