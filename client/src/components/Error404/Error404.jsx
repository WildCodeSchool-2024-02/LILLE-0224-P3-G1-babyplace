import { Link } from "react-router-dom";
import "./Error404.css";

function Error404() {
  return (
    <div className="all_error">
      <div className="error_h1">
        <h1>Babyplace</h1>
      </div>
      <div className="error_h2">
        <h2 id="error_h2">404 - PAGE NON TROUVÉE</h2>
      </div>
      <div className="error_p">
        <p>Désolé! Nous ne trouvons pas la page que vous recherchez.</p>
      </div>
      <div className="error_button">
        <Link to="/">
          <button type="button">Aller à la page d'accueil</button>
        </Link>
      </div>
    </div>
  );
}

export default Error404;
