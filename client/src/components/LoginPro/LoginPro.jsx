import LoginAdmin from "../LoginAdmin/LoginAdmin";
import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginPro.css";

function LoginPro() {
  const navigate = useNavigate();
  const [accountButton, setAccountButton] = useState(true);
  const [isLogin, setIsLogin] = useState(true);
  const [showLoginAdmin, setShowLoginAdmin] = useState(false);
  const emailWithRef = useRef();
  const emailWithRefNursery = useRef();
  const passwordWithRefNursery = useRef();
  const passwordWithRef = useRef();

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

  const handleSubmitParent = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/parent/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            role: "parent",
            parent_mail: emailWithRef.current.value,
            parent_password: passwordWithRef.current.value,
          }),
        }
      );

      const data = await response.json();

      if (response.status === 200) {
        navigate("/dashboard", { state: { user: data.user } });
      } else {
        console.error(data.message || "Une erreur s'est produite dans le 200");
      }
    } catch (err) {
      console.error("Une erreur s'est produite ailleurs :", err);
    }
  };
  const handleSubmitNursery = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/nursery/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            role: "nursery",
            nursery_mail: emailWithRefNursery.current.value,
            nursery_password: passwordWithRefNursery.current.value,
          }),
        }
      );

      const data = await response.json();

      if (response.status === 200) {
        navigate("/dashboard/pro", { state: { user: data.user } });
      } else {
        console.error(data.message || "Une erreur s'est produite dans le 200");
      }
    } catch (err) {
      console.error("Une erreur s'est produite ailleurs :", err);
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
        <p style={{ color: "var(--first-color)", fontWeight: "bold" }}>
          Un imprévu dans votre garde d'enfant ? Pas de panique, Babyplace est
          là !
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
              <input
                type="text"
                placeholder="adresse email"
                ref={emailWithRefNursery}
              />
              <input
                type="password"
                placeholder="mot de passe"
                ref={passwordWithRefNursery}
              />
            </div>

            <button type="button" onClick={handleSubmitNursery}>
              Connexion
            </button>

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
              <input
                type="text"
                placeholder="adresse email"
                ref={emailWithRef}
              />
              <input
                type="password"
                placeholder="mot de passe"
                ref={passwordWithRef}
              />
            </div>

            <button type="button" onClick={handleSubmitParent}>
              Connexion
            </button>

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
