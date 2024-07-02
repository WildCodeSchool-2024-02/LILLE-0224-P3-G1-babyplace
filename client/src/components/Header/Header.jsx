import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <div className="the_header">
      <div className="icon_header">
        <Link to="/accueil">
          <img
            id="logo_header"
            src="../../../public/assets/images/logo.svg"
            alt="logo"
          />
        </Link>
      </div>

      <div className="header_search_and_nav">
        <Link to="/dashboard" className="button_header">
          Mon compte{" "}
          <img
            id="go_header"
            className="images_header"
            src="../../../public/assets/images/logo-arrow.svg"
            alt="logo"
          />
        </Link>
      </div>
    </div>
  );
}

export default Header;
