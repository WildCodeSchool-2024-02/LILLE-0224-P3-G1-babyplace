import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <div className="the_header">
      <div className="icon_header">
        <Link to="/">
          <img
            id="logo_header"
            src="../../../public/assets/images/logo.svg"
            alt="logo"
          />
        </Link>
      </div>

      <div className="header_search_and_nav">
        <img
          id="loop_header"
          className="icons_header"
          src="../../../public/assets/images/loop.png"
          alt="logo"
        />
        <input
          className="input_reasearch"
          id="search_header"
          type="search"
          name="search-form"
          placeholder="Rechercher"
        />
        <Link to="/dashboard" className="button_header">
          Profil{" "}
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
