import "./Parent.css";
import { Link } from "react-router-dom";

function Parent() {
  return (
    <div className="all_parent">
      <h2>Découvrez les crèches proches de chez vous</h2>

      <div className="image_container">
        <img
          alt="parent"
          id="parent_parent"
          src="../../../public/assets/images/parent.png"
        />
      </div>
      <div className="all_info">
        <div className="city_container">
          <div className="para">
            <p>
              Simplifiez vous la vie en choisissant un systeme de réservation
              moderne et efficace.
            </p>
          </div>
          <div className="small_para">
            <p>
              Découvrez les structures disponibles dans les villes où nos
              services sont implantés.
            </p>
          </div>
          <div className="all_city_parent">
            <Link to="/creche/lille" className="input_parent">
              Lille
              <img
                className="image_parent"
                src="../../../public/assets/images/go.png"
                alt="logo"
              />
            </Link>{" "}
            <Link to="/creche/rennes" className="input_parent">
              Rennes
              <img
                className="image_parent"
                src="../../../public/assets/images/go.png"
                alt="logo"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Parent;
