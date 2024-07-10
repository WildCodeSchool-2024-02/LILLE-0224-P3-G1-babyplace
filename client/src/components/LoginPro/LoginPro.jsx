import { useState } from "react";
import { Link } from "react-router-dom";
import LoginAdmin from "../LoginAdmin/LoginAdmin";
import "./LoginPro.css";

function LoginPro() {
  const [accountButton, setAccountButton] = useState(true);
  const [isLogin, setIsLogin] = useState(true);
  const [showLoginAdmin, setShowLoginAdmin] = useState(false);

  const handleAccountButton = () => {
    setAccountButton(true);
  };

  const handleLoginClick = () => {
    setIsLogin(true);
  };

  const handleRegisterClick = () => {
    setIsLogin(false);
  };

  const handleLoginAdminClick = () => {
    setShowLoginAdmin(true);
  };

  const handleClosePopup = () => {
    setShowLoginAdmin(false);
  };

  const handleOutsideClick = (e) => {
    if (e.target.className === "popup_admin") {
      handleClosePopup();
    }
  };

  return (
    <div className="login_register_pro">
      <div
        className="login_admin"
        onClick={handleLoginAdminClick}
        onKeyPress={(e) => {
          if (e.key === "Enter") handleLoginAdminClick();
        }}
        role="button"
        tabIndex={0}
      >
        <img src="/assets/images/lock.svg" alt="Lock" />
      </div>
      <div className="presentation_login">
        <h1>Babyplace</h1>
        <p>
          Bienvenue sur Babyplace, votre plateforme de mise en relation entre
          parents et crèches.{" "}
          <span style={{ color: "var(--first-color)", fontWeight: "bold" }}>
            Un imprévu dans votre garde d'enfant ? Pas de panique, Babyplace est
            là !
          </span>
        </p>
        <img src="/assets/images/image3_homebgremoved.png" alt="home" />
        <p style={{ marginTop: "5em" }}>
          Inscrivez-vous sur notre site pour accéder à nos services, disponibles
          (pour le moment) à Lille et Rennes{" "}
        </p>
        <div className="buttons_register_login">
          <button
            type="button"
            onClick={handleLoginClick}
            onKeyPress={(e) => {
              if (e.key === "Enter") handleLoginClick();
            }}
            className={isLogin ? "active" : ""}
          >
            PRO
          </button>
          <button
            type="button"
            onClick={handleRegisterClick}
            onKeyPress={(e) => {
              if (e.key === "Enter") handleRegisterClick();
            }}
            className={!isLogin ? "active" : ""}
          >
            PARENT
          </button>
        </div>
      </div>

      {isLogin ? (
        <div className="login_pro">
          <div className="login_pro_info">
            <div className="login_pro_title">
              <h2>PRO</h2>
            </div>
            <h3>Se connecter</h3>
            <div className="input_login_pro">
              <input type="text" placeholder="adresse email" />
              <input type="password" placeholder="mot de passe" />
            </div>
            <Link to="/accueil">
              <button type="button">Connexion</button>
            </Link>
            {accountButton && (
              <Link
                to="/inscription/creche"
                onClick={handleAccountButton}
                onKeyPress={(e) => {
                  if (e.key === "Enter") handleAccountButton();
                }}
                role="button"
                tabIndex={0}
              >
                <p>Vous n'avez pas encore de compte ?</p>
              </Link>
            )}
          </div>
          <div className="login_pro_image">
            <img
              alt="parent"
              className="login_register_image"
              src="/public/assets/images/pro.png"
            />
          </div>
        </div>
      ) : (
        <div className="register_pro">
          <div className="login_pro_info">
            <div className="login_pro_title">
              <h2>PARENT</h2>
            </div>
            <h3>Se connecter</h3>
            <div className="input_login_pro">
              <input type="text" placeholder="adresse email" />
              <input type="password" placeholder="mot de passe" />
            </div>
            <Link to="/accueil">
              <button type="button">Connexion</button>
            </Link>
            {accountButton && (
              <Link
                to="/inscription/parent"
                onClick={handleAccountButton}
                onKeyPress={(e) => {
                  if (e.key === "Enter") handleAccountButton();
                }}
                role="button"
                tabIndex={0}
              >
                <p>Vous n'avez pas encore de compte ?</p>
              </Link>
            )}
          </div>
          <div className="login_pro_image">
            <img
              alt="parent"
              className="login_register_image"
              src="/public/assets/images/parent_account.png"
            />
          </div>
        </div>
      )}

      {showLoginAdmin && (
        <div
          className="popup_admin"
          onClick={handleOutsideClick}
          onKeyPress={(e) => {
            if (e.key === "Enter") handleOutsideClick(e);
          }}
          role="button"
          tabIndex={0}
        >
          <div
            className="popup_inner_admin"
            onClick={(e) => e.stopPropagation()}
            onKeyPress={(e) => {
              if (e.key === "Enter") e.stopPropagation();
            }}
            role="button"
            tabIndex={0}
          >
            <button
              onClick={handleClosePopup}
              onKeyPress={(e) => {
                if (e.key === "Enter") handleClosePopup(e);
              }}
              className="close_button_admin"
              type="button"
            >
              &times;
            </button>
            <LoginAdmin />
          </div>
        </div>
      )}
    </div>
  );
}

export default LoginPro;
