import { Link } from "react-router-dom";
import "./BottomNavbar.css";

function BottomNavbar() {
  return (
    <div className="all_bottom_navbar">
      <div className="bottom_navbar">
        <div className="all_image_bottom">
          <Link to="/">
            <img alt="home" src="assets/images/home_bottom.svg" />
          </Link>
          <Link to="/creche">
            <img alt="loop" src="assets/images/loop_bottom.svg" />
          </Link>
          <img alt="avatar" src="assets/images/avatar_bottom.svg" />
        </div>
      </div>
    </div>
  );
}

export default BottomNavbar;
