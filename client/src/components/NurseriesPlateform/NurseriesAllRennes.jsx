/* eslint-disable no-unused-vars */
import { useState } from "react";
import NurseriesMini from "./NurseriesMini";
import NurseriesMapRennes from "./NuseriesMapRennes";
import "./nurseriesAll.css";

function NurseriesAllRennes() {
  const [allNurseries, setAllNurseries] = useState([]);

  const getNurseriesRennes = async () => {
    const result = await fetch("http://localhost:3310/api/nursery?city=Rennes");
    const data = await result.json();
    setAllNurseries(data);
  };

  const [viewList, setViewList] = useState(true);
  const [viewMap, setViewMap] = useState(false);

  const handleViewList = () => {
    setViewList(true);
    setViewMap(false);
  };

  const handleViewMap = () => {
    setViewMap(true);
    setViewList(false);
  };

  return (
    <>
      <h2 className="nurseries_all_city_title">Rennes</h2>
      <button type="button" onClick={getNurseriesRennes}>
        Letsgo
      </button>
      <div className="mobile_nurseries_all">
        <div className="nurseries_all_buttons_container">
          <button
            type="button"
            className="nurseries_all_button"
            onClick={handleViewList}
          >
            Liste
          </button>
          <button
            className="nurseries_all_button"
            type="button"
            onClick={handleViewMap}
          >
            Carte
          </button>
        </div>
        {viewList ? (
          <>
            <div className="line_list_section"> </div>
            <div className="nurseries_all_list_section">
              {allNurseries.map((nursery) => (
                <NurseriesMini
                  key={nursery.id}
                  name={nursery.nursery_name}
                  price={nursery.price}
                  image1={nursery.image1}
                  image2={nursery.image2}
                  image3={nursery.image3}
                />
              ))}
            </div>
          </>
        ) : (
          <NurseriesMapRennes
            allNurseries={allNurseries}
            handleViewList={handleViewList}
          />
        )}
      </div>
      <div className="desktop_nurseries_all">
        <div className="nurseries_all_list_section">
          <div className="nurseries_all_list_desktop">
            {allNurseries.map((nursery) => (
              <NurseriesMini
                key={nursery.id}
                name={nursery.nursery_name}
                price={nursery.price}
                image1={nursery.image1}
                image2={nursery.image2}
                image3={nursery.image3}
              />
            ))}
          </div>
          <div className="nurseries_all_map_desktop">
            <NurseriesMapRennes
              allNurseries={allNurseries}
              handleViewList={handleViewList}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default NurseriesAllRennes;
