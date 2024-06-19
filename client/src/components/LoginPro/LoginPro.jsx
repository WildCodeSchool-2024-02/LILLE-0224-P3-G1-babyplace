import { useState } from "react";
import { Link } from "react-router-dom";
import "./LoginPro.css";

function LoginPro() {
  const [accountButton, setAccountButton] = useState(true);

  const handleaccountButton = () => {
    setAccountButton(true);
  };

  const [isLogin, setIsLogin] = useState(true);

  const handleLoginClick = () => {
    setIsLogin(true);
  };

  const handleRegisterClick = () => {
    setIsLogin(false);
  };

  return (
    <div className="login_register_pro">
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

      {isLogin ? (
        <div className="login_pro">
          <div className="login_pro_info">
            <h1>Babyplace</h1>
            <div className="login_pro_title">
              <h2>PRO</h2>
            </div>
            <h3>Se connecter</h3>
            <div className="input_login_pro">
              <input type="text" placeholder="adresse email" />
              <input type="password" placeholder="mot de passe" />
            </div>
            <button type="button">Connexion</button>
            {accountButton && (
              <Link to="/inscription/creche" onClick={handleaccountButton}>
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
            <h1>Babyplace</h1>
            <div className="login_pro_title">
              <h2>PARENT</h2>
            </div>
            <h3>Se connecter</h3>
            <div className="input_login_pro">
              <input type="text" placeholder="adresse email" />
              <input type="password" placeholder="mot de passe" />
            </div>
            <button type="button">Connexion</button>
            {accountButton && (
              <Link to="/inscription/parent" onClick={handleaccountButton}>
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
