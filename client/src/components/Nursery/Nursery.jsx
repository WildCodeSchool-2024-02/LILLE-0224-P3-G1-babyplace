import { useLoaderData, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCertificate, faChild } from "@fortawesome/free-solid-svg-icons";
import SimpleMap from "./NurseryMap";
import NurseryCalendarDetails from "./NurseryCalendarDetails";
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
            <div className="small_picture">
              <img
                className="img_detail"
                src={data.image2}
                alt="Crèche Lillomomes"
              />
              <img
                className="img_detail"
                src={data.image3}
                alt="Crèche Lillomomes"
              />
            </div>
          </div>
          <h2 className="color_h2">Présentation</h2>

          <p className="presentation">{data.about}</p>

          <section className="info_map_flex">
            <div className="map_contact_flex">
              <section className="contact">
                Horaires : Lundi - Samedi : 9h-16h <br />
                Téléphone : {data.nursery_phone} <br />
                Mail : {data.nursery_mail}
              </section>

              <div className="function_map">
                <SimpleMap data={data} />
              </div>
            </div>
            <section className="info_flex">
              <h2 className="color_h2">Expérience</h2>
              <section className="info_element">
                {data.certification1 && (
                  <div className="information">
                    <FontAwesomeIcon
                      icon={faCertificate}
                      className="info_icon"
                    />
                    <p className="info_text">{data.certification1}</p>
                  </div>
                )}
                {data.certification2 && (
                  <div className="information">
                    <FontAwesomeIcon
                      icon={faCertificate}
                      className="info_icon"
                    />
                    <p className="info_text">{data.certification2}</p>
                  </div>
                )}

                {data.certification3 && (
                  <div className="information">
                    <FontAwesomeIcon
                      icon={faCertificate}
                      className="info_icon"
                    />
                    <p className="info_text">{data.certification3}</p>
                  </div>
                )}
              </section>

              <h2 className="color_h2">Activités</h2>

              <section className="info_element">
                {data.activity1 && (
                  <div className="information">
                    <FontAwesomeIcon icon={faChild} className="info_icon" />
                    <p className="info_text">{data.activity1}</p>
                  </div>
                )}

                {data.activity2 && (
                  <div className="information">
                    <FontAwesomeIcon icon={faChild} className="info_icon" />
                    <p className="info_text">{data.activity2}</p>
                  </div>
                )}

                {data.activity3 && (
                  <div className="information">
                    <FontAwesomeIcon icon={faChild} className="info_icon" />
                    <p className="info_text">{data.activity3}</p>
                  </div>
                )}

                <h3 className="rate">{data.price} €/heure</h3>
              </section>
            </section>
          </section>

          <h2 className="color_h2">Disponibilités</h2>
          <NurseryCalendarDetails bookings={data.bookings} />
        </div>
      )}
    </div>
  );
}

export default Nursery;
