import "./Babyplace.css";

function Babyplace() {
  return (
    <div className="all_babyplace">
      <section className="babyplace_flex">
        <div className="babyplace_text">
          <h1>Babyplace</h1>
          <div className="para_babyplace">
            <p>Gagnez du temps en omptimisant votre agenda au quotidien.</p>
            <p>
              Optez pour Babyplace maintenant pour saisir toutes les
              opportunités de garde d’enfant en bas âge autour de chez vous.{" "}
            </p>
            <p>
              L’inscription plateforme Babyplace est gratuite et sans engagement
            </p>
          </div>
        </div>
        <img className="babyplace_img" src="assets/images/image1.png" alt="" />
      </section>
      <div className="button_container">
        <button type="button" className="babyplace_button">
          En savoir plus
        </button>
      </div>
    </div>
  );
}

export default Babyplace;
