import "./Babyplace.css";

function Babyplace() {
  return (
    <div className="all_babyplace">
      <section className="babyplace_flex">
        <div className="babyplace_text">
          <h1>Babyplace</h1>
          <div className="para_babyplace">
            <p>
              Gagnez du temps en{" "}
              <span className="bold_text">optimisant votre agenda</span> au
              quotidien.
            </p>
            <p>
              Optez pour Babyplace maintenant pour saisir toutes les{" "}
              <span className="bold_text">opportunités de garde d’enfant</span>{" "}
              en bas âge autour de chez vous.{" "}
            </p>
            <p>
              L’inscription plateforme Babyplace est{" "}
              <span className="bold_text"> gratuite et sans engagement !</span>
            </p>
          </div>
        </div>
        <img
          className="babyplace_img"
          src="assets/images/image4_home.jpg"
          alt=""
        />
      </section>
    </div>
  );
}

export default Babyplace;
