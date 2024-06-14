import "./Header.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="the_header">
      <nav>
        <Link to="/">Home</Link>
        <Link to="/page1">Crèches</Link>
      </nav>
      <div className="all_header">
        <div className="icon_header">
          <img
            id="logo_header"
            src="../../../public/assets/images/logo.svg"
            alt="logo"
          />
        </div>
        <div className="search">
          <div>
            <img
              id="loop_header"
              className="image_header"
              src="../../../public/assets/images/loop.png"
              alt="logo"
            />
          </div>
          <div className="search_register">
            <input
              className="input_header"
              id="search_header"
              type="search"
              name="search-form"
              placeholder="Rechercher"
              value=""
            />
            <div className="register">
              <img
                id="go_header"
                className="image_header"
                src="../../../public/assets/images/go.png"
                alt="logo"
              />
              <button id="input_header" type="button" className="input_header">
                Se connecter | S’inscrire{" "}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
