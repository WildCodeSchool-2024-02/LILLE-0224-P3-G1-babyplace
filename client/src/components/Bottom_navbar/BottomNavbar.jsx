import { Link } from "react-router-dom";
import { useState } from "react";
import "./BottomNavbar.css";

function BottomNavbar() {
  const [homeButton, setHomeButton] = useState(true);
  const [searchButton, setSearchButton] = useState(false);
  const [dashboardeButton, setDashboardButton] = useState(false);

  const handleHomeButton = () => {
    setHomeButton(true);
    setSearchButton(false);
    setDashboardButton(false);
  };

  const handleSearchButton = () => {
    setHomeButton(false);
    setSearchButton(true);
    setDashboardButton(false);
  };

  const handleDashboardButton = () => {
    setHomeButton(false);
    setSearchButton(false);
    setDashboardButton(true);
  };

  return (
    <div className="all_bottom_navbar">
      <div className="bottom_navbar">
        <div className="all_image_bottom">
          <Link to="/" onClick={handleHomeButton}>
            {homeButton ? (
              <img alt="home" src="assets/images/home_bottom_active.svg" />
            ) : (
              <img alt="home" src="assets/images/home_bottom.svg" />
            )}
          </Link>
          <Link to="/creche" onClick={handleSearchButton}>
            {searchButton ? (
              <img alt="loop" src="assets/images/loop_bottom_active.svg" />
            ) : (
              <img alt="loop" src="assets/images/loop_bottom.svg" />
            )}
          </Link>
          <Link to="/dashboard" onClick={handleDashboardButton}>
            {dashboardeButton ? (
              <img alt="avatar" src="assets/images/avatar_bottom_active.svg" />
            ) : (
              <img alt="avatar" src="assets/images/avatar_bottom.svg" />
            )}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BottomNavbar;
