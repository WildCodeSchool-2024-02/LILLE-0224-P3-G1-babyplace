import { Link } from "react-router-dom";
import { useState } from "react";
import "./BottomNavbar.css";
import homeSVGActive from "../../../public/assets/images/home_bottom_active.svg";
import homeSVG from "../../../public/assets/images/home_bottom.svg";
import loopSVGActive from "../../../public/assets/images/loop_bottom_active.svg";
import loopSVG from "../../../public/assets/images/loop_bottom.svg";
import avatarSVGActive from "../../../public/assets/images/avatar_bottom_active.svg";
import avatarSVG from "../../../public/assets/images/avatar_bottom.svg";

function BottomNavbar() {
  const [homeButton, setHomeButton] = useState(true);
  const [searchButton, setSearchButton] = useState(false);
  const [dashboardButton, setDashboardButton] = useState(false);

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
          <Link to="/accueil" onClick={handleHomeButton}>
            {homeButton ? (
              <img alt="home_nav" src={homeSVGActive} />
            ) : (
              <img alt="home_nav" src={homeSVG} />
            )}
          </Link>
          <Link to="/creche/lille" onClick={handleSearchButton}>
            {searchButton ? (
              <img alt="loop_nav" src={loopSVGActive} />
            ) : (
              <img alt="loop_nav" src={loopSVG} />
            )}
          </Link>
          <Link to="/dashboard" onClick={handleDashboardButton}>
            {dashboardButton ? (
              <img alt="avatar_nav" src={avatarSVGActive} />
            ) : (
              <img alt="avatar_nav" src={avatarSVG} />
            )}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BottomNavbar;
