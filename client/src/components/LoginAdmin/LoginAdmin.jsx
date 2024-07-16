import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./LoginAdmin.css";

export default function LoginAdmin() {
  const navigate = useNavigate();
  const emailWithRefAdmin = useRef();
  const passwordWithRefAdmin = useRef();

  const handleSubmitModerator = async (event, setUser) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/moderator/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            role: "moderator",
            moderator_mail: emailWithRefAdmin.current.value,
            moderator_password: passwordWithRefAdmin.current.value,
          }),
        }
      );

      const data = await response.json();

      if (response.status === 200) {
        data.user.token = data.token;
        setUser(data.user);
        sessionStorage.setItem("user", JSON.stringify(data.user));
        navigate("/dashboard", { state: { user: data.user } });
      } else {
        console.error(data.message || "Une erreur s'est produite");
      }
    } catch (err) {
      console.error("Une erreur s'est produite :", err);
    }
  };

  return (
    <div>
      <div className="register_Admin">
        <div className="input_login_Admin">
          <input
            type="text"
            placeholder="adresse email"
            ref={emailWithRefAdmin}
          />
          <input
            type="password"
            placeholder="mot de passe"
            ref={passwordWithRefAdmin}
          />
        </div>
        <AuthContext.Consumer>
          {({ setUser }) => (
            <button
              className="login_admin_button"
              type="button"
              onClick={(event) => handleSubmitModerator(event, setUser)}
            >
              Connexion
            </button>
          )}
        </AuthContext.Consumer>
      </div>
    </div>
  );
}
