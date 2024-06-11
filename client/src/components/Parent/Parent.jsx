import "./Parent.css";

function Parent() {
  return (
    <div className="all_parent">
      <div className="title">
        <h2>Vous êtes parent ?</h2>
      </div>
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
              Simplifiez vous la vie en choisissant un systeme de reservation
              moderne et efficace
            </p>
          </div>
          <div className="small_para">
            <p>
              Découvrez les structures disponibles dans les villes où nos
              services sont implantés
            </p>
          </div>
          <div className="all_city_parent">
            <div className="city_parent">
              <img
                className="image_parent"
                src="../../../public/assets/images/go.png"
                alt="logo"
              />
              <button id="Lille" type="button" className="input_parent">
                Lille{" "}
              </button>
            </div>
            <div className="city_parent">
              <img
                className="image_parent"
                src="../../../public/assets/images/go.png"
                alt="logo"
              />
              <button id="Montpellier" type="button" className="input_parent">
                Montpellier{" "}
              </button>
            </div>
            <div className="city_parent">
              <img
                className="image_parent"
                src="../../../public/assets/images/go.png"
                alt="logo"
              />
              <button id="Nantes" type="button" className="input_parent">
                Nantes{" "}
              </button>
            </div>
            <div className="city_parent">
              <img
                className="image_parent"
                src="../../../public/assets/images/go.png"
                alt="logo"
              />
              <button id="Rennes" type="button" className="input_parent">
                Rennes{" "}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Parent;
