import { Link } from "react-router-dom";
import { useState } from "react";
import "./Header.css";

function Header() {
  const [homeButton, setHomeButton] = useState(true);

  const handleHomeButton = () => {
    setHomeButton(true);
  };

  return (
    <div className="the_header">
      <div className="all_header">
      {homeButton && 
        <div className="icon_header">
          <Link to="/" onClick={handleHomeButton}>
            <img
              id="logo_header"
              src="../../../public/assets/images/logo.svg"
              alt="logo"
            />
          </Link>
        </div>
        }
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
                Profil
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
