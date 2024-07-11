import { Link } from "react-router-dom";
import "./LoginAdmin.css";

function LoginAdmin() {
  return (
    <div>
      <div className="register_Admin">
        <div className="input_login_Admin">
          <input type="text" placeholder="adresse email" />
          <input type="password" placeholder="mot de passe" />
        </div>
        <Link to="/dashboard/moderator">
          <button className="login_admin_button" type="button">
            Connexion
          </button>
        </Link>
      </div>
    </div>
  );
}

export default LoginAdmin;
