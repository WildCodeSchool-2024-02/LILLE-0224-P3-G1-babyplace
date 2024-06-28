import { useLoaderData, useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import NurseriesCardCalender from "../NurseriesPlateform/NurseriesCardCalender";
import "./Nursery.css";

function Nursery() {
  const navigate = useNavigate();
  const data = useLoaderData();
  const miniMapCenter = [data.latitude, data.longitude];

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
            <div className="secondary_img_container">
              <img
                className="secondary_img_nursery"
                src={data.image2}
                alt="Crèche Lillomomes"
              />
              <img
                className="secondary_img_nursery"
                src={data.image3}
                alt="Crèche Lillomomes"
              />
            </div>
          </div>
          <h2 className="color_h2">Présentation</h2>
          <div className="desktop_container_presentation_nursery">
            <div className="presentation_container">
              <p className="presentation">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Voluptatem enim dicta ipsum corporis voluptas velit est deserunt
                recusandae mollitia perferendis soluta laboriosam molestiae,
                fugit quos! Iusto sapiente nostrum qui laboriosam!{" "}
              </p>
              <section className="contact">
                Horaires : Lundi - Samedi : 9h-16h <br />
                Téléphone : {data.nursery_phone} <br />
                Mail : {data.nursery_mail}
              </section>
            </div>
            <div className="container_nursery_map_container">
              <MapContainer
                className="nursery_map_container"
                center={miniMapCenter}
                zoom={20}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={miniMapCenter}>
                  <Popup>
                    <p>{data.nursery_name}</p>
                  </Popup>
                </Marker>
              </MapContainer>

              <div className="container_nursery_activities">
                <div className="experience_container">
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
                      <p className="info_text"> {data.certification2}</p>
                    </div>
                  </section>
                </div>
                <div className="activities_container">
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
                </div>
              </div>
            </div>
          </div>
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
          <div className="reservation_button_container">
            <button
              type="button"
              className="nursery_list_button"
              id="nursery_detail_button"
            >
              Réserver &gt;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Nursery;
