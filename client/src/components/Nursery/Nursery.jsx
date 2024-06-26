import { useLoaderData, useNavigate } from "react-router-dom";
import NurseriesCardCalender from "../NurseriesPlateform/NurseriesCardCalender";
import "./Nursery.css";

function Nursery() {
  const navigate = useNavigate();
  const data = useLoaderData();

  return (
    <div>
      {data && (
        <div className="nursery_details_page">
          <div className="return_btn_h1">
            <button
              type="button"
              className="back_arrow"
              onClick={() => navigate(-1)}
            >
              &lt;
            </button>
            <h1 className="nursery_name">{data.nursery_name}</h1>
          </div>

          <div className="img_container">
            <img
              className="img_nursery"
              src={data.image1}
              alt="Crèche Lillomomes"
            />
          </div>
          <h2 className="color_h2">Présentation</h2>

          <p className="presentation">{data.about}</p>
          <section className="contact">
            Horaires : Lundi - Samedi : 9h-16h <br />
            Téléphone : {data.nursery_phone} <br />
            Mail : {data.nursery_mail}
          </section>

          <h2 className="color_h2">Expérience</h2>
          <section className="info_element">
            <div className="information">
              <img
                className="info_img"
                src="/assets/images/Pricing.png"
                alt=""
              />
              <p className="info_text"> {data.certification1}</p>
            </div>

            <div className="information">
              <img
                className="info_img"
                src="/assets/images/Pricing2.png"
                alt=""
              />
              <p className="info_text"> {data.certification2}</p>
            </div>

            <div className="information">
              <img
                className="info_img"
                src="/assets/images/Pricing3.png"
                alt=""
              />
              <p className="info_text"> {data.certification3}</p>
            </div>
          </section>

          <h2 className="color_h2">Activités</h2>

          <section className="info_element">
            <div className="information">
              <img
                className="info_img"
                src="/assets/images/Pricing.png"
                alt=""
              />
              <p className="info_text">{data.activity1}</p>
            </div>

            <div className="information">
              <img
                className="info_img"
                src="/assets/images/Pricing2.png"
                alt=""
              />
              <p className="info_text">{data.activity2}</p>
            </div>

            <div className="information">
              <img
                className="info_img"
                src="/assets/images/Pricing3.png"
                alt=""
              />
              <p className="info_text">{data.activity3}</p>
            </div>
          </section>

          <p className="rate">
            <h3>{data.price} €/demie-journée</h3>
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
            className="nursery_list_button"
            id="nursery_detail_button"
          >
            Réserver &gt;
          </button>
        </div>
      )}
    </div>
  );
}

export default Nursery;
