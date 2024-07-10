import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginPro.css";

function LoginPro() {
  const navigate = useNavigate();
  const [accountButton, setAccountButton] = useState(true);

  const handleAccountButton = () => {
    setAccountButton(true);
  };

  const [isLogin, setIsLogin] = useState(true);

  const handleLoginClick = () => {
    setIsLogin(true);
  };

  const handleRegisterClick = () => {
    setIsLogin(false);
  };

  const emailWithRef = useRef();
  const passwordWithRef = useRef();
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            uerMail: emailWithRef.current.value,
            parent_password: passwordWithRef.current.value,
          }),
        }
      );

      // redirection vers la page dashboard de la crèche
      if (response.status === 201) {
        navigate("/dashboard");
      } else {
        console.info(response);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="login_register_pro">
      <div className="presentation_login">
        <h1>Babyplace</h1>
        <p>
          Bienvenue sur Babyplace, votre plateforme de mise en relation entre
          parents et crèches.{" "}
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
            className={isLogin ? "active" : ""}
          >
            PRO
          </button>
          <button
            type="button"
            onClick={handleRegisterClick}
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
              <Link to="/inscription/creche" onClick={handleAccountButton}>
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

            <button type="button" onClick={handleSubmit}>
              Connexion
            </button>

            {accountButton && (
              <Link to="/inscription/parent" onClick={handleAccountButton}>
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
    </div>
  );
}

export default LoginPro;
