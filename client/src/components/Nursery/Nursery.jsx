import { useNavigate } from "react-router-dom";
import NurseriesCardCalender from "../NurseriesPlateform/NurseriesCardCalender";
import "./Nursery.css";

function Nursery() {
  const navigate = useNavigate();

  return (
    <div className="nursery-details-page">
      <div className="return_btn_h1">
        <button
          type="button"
          className="back-arrow"
          onClick={() => navigate(-1)}
        >
          &lt;
        </button>
        <h1 className="nursery_name">Crèche Lillomomes</h1>
      </div>

      <div className="img_container">
        <img
          className="img_nursery"
          src="https://sp-ao.shortpixel.ai/client/to_auto,q_glossy,ret_img,w_4032,h_3024/https://www.lillomomes.fr/wp-content/uploads/2021/09/A6240589-7B2D-43C7-B98C-E9E76F3DCAFB.png"
          alt="Crèche Lillomomes"
        />
      </div>
      <h2 className="color_h2">Présentation</h2>

      <p className="presentation">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatem
        enim dicta ipsum corporis voluptas velit est deserunt recusandae
        mollitia perferendis soluta laboriosam molestiae, fugit quos! Iusto
        sapiente nostrum qui laboriosam!{" "}
      </p>
      <section className="contact">
        Horaires : Lundi - Samedi : 9h-16h <br />
        Téléphone : 05 56 56 56 56 <br />
        Mail : contact@contact.fr
      </section>

      <h2 className="color_h2">Expérience</h2>
      <section className="info_element">
        <div className="information">
          <img className="info_img" src="/assets/images/Pricing.png" alt="" />
          <p className="info_text">Formation 1er secours</p>
        </div>

        <div className="information">
          <img className="info_img" src="/assets/images/Pricing2.png" alt="" />
          <p className="info_text">Formation Nesting</p>
        </div>

        <div className="information">
          <img className="info_img" src="/assets/images/Pricing3.png" alt="" />
          <p className="info_text">Pédagogie Montessori</p>
        </div>
      </section>

      <h2 className="color_h2">Accueil</h2>

      <section className="info_element">
        <div className="information">
          <img className="info_img" src="/assets/images/Pricing.png" alt="" />
          <p className="info_text">Sorties extérieure </p>
        </div>

        <div className="information">
          <img className="info_img" src="/assets/images/Pricing2.png" alt="" />
          <p className="info_text">Repas maison</p>
        </div>

        <div className="information">
          <img className="info_img" src="/assets/images/Pricing3.png" alt="" />
          <p className="info_text">Foyer Non-Fumeur</p>
        </div>
      </section>

      <h2 className="color_h2">Activité</h2>

      <section className="info_element">
        <div className="information">
          <img className="info_img" src="/assets/images/Pricing.png" alt="" />
          <p className="info_text">Promenade</p>
        </div>

        <div className="information">
          <img className="info_img" src="/assets/images/Pricing2.png" alt="" />
          <p className="info_text">Activité d’éveil</p>
        </div>

        <div className="information">
          <img className="info_img" src="/assets/images/Pricing3.png" alt="" />
          <p className="info_text">Atelier musique</p>
        </div>
      </section>

      <p className="rate">
        <h3>3,5€ /demie-journée</h3>
      </p>

      <h2 className="color_h2">Disponibilités</h2>
      <NurseriesCardCalender />
      <div className="time_slot" />
      <div className="time_slot" />
      <div className="time_slot" />
      <div className="time_slot" />
      <div className="time_slot" />
      <div className="time_slot" />

      <button
        type="button"
        className="nursery-list-button"
        id="nursery-detail-button"
      >
        Réserver &gt;
      </button>
    </div>
  );
}

export default Nursery;
