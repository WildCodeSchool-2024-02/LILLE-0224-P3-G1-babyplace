import { useState } from "react";
import SearchByName from "../../SearchByName/SearchByName";
import SelectCity from "../../SelectCity/SelectCity";

import "./DashboardModeratorPro.css";

function DashboardModeratorPro() {
  const [visibleProfiles, setVisibleProfiles] = useState([]);

  const toggleProfileVisibility = (nurseryId) => {
    setVisibleProfiles((prevState) =>
      prevState.includes(nurseryId)
        ? prevState.filter((id) => id !== nurseryId)
        : [...prevState, nurseryId]
    );
  };

  const nurseries = [
    {
      id: 1,
      name: "Crèche Abricot",
      adresse: "3 rue de lille",
      mail: "abricot.creche@homtail.fr",
      phone: "06 01 01 01 01",
      image: "/public/assets/images/parent.png",
    },
    {
      id: 2,
      name: "Crèche Picoti Picota",
      adresse: "15 rue de lille",
      mail: "creche.picoti-picota@hotmail.fr",
      phone: "07 01 01 01 01",
      image: "/public/assets/images/parent.png",
    },
    {
      id: 3,
      name: "Les petits pédestres",
      adresse: "22 rue à côté de lille",
      mail: "lespetitpedestre@hotmail.fr",
      phone: "07 09 09 09 09",
      image: "/public/assets/images/parent.png",
    },
  ];
  return (
    <div>
      <div className="dashboard_moderator_pro_select_search">
        <div className="dashboard_moderator_pro_select">
          <SelectCity />
        </div>
        <div className="dashboard_moderator_pro_search">
          <SearchByName />
        </div>
      </div>
      <div>
        <div className="dashboard_moderator_pro_h1">
          <h1>Lille</h1>
        </div>
        {nurseries.map((nursery) => (
          <div key={nursery.id} className="dashboard_moderator_parent_all">
            <div className="dashboard_moderator_container_container">
              <div className="dashboard_moderator_parent_container">
                <div className="dashboard_moderator_parent_logo">
                  <img src={nursery.image} alt="" />
                </div>
                <div className="dashboard_moderator_parent_info_first">
                  <div className="dashboard_moderator_parent_info">
                    <p className="dashboard_moderator_parent_info_weigh">
                      Crèche :
                    </p>
                    <p>{nursery.name}</p>
                  </div>
                  <div className="dashboard_moderator_parent_info">
                    <p className="dashboard_moderator_parent_info_weigh">
                      Adresse :
                    </p>
                    <p>{nursery.adresse}</p>
                  </div>
                  <div className="dashboard_moderator_parent_info" />
                </div>
                <div
                  className="dashboard_moderator_parent_details"
                  role="button"
                  tabIndex={0}
                  onClick={() => toggleProfileVisibility(nursery.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      toggleProfileVisibility(nursery.id);
                    }
                  }}
                >
                  <p>Voir le profil</p>
                </div>
                <div className="dashboard_moderator_paretn_delete">
                  <button type="button">Suspendre compte</button>
                </div>
              </div>
            </div>
            {visibleProfiles.includes(nursery.id) && (
              <div
                id="dashboard_moderator_container_pop"
                className="dashboard_moderator_container_container"
              >
                <div className="dashboard_moderator_container_info">
                  <div className="dashboard_moderator_parent_info">
                    <p className="dashboard_moderator_parent_info_weigh">
                      Crèche :
                    </p>
                    <p>{nursery.name}</p>
                  </div>
                  <div className="dashboard_moderator_parent_info">
                    <p className="dashboard_moderator_parent_info_weigh">Mail :</p>
                    <p>{nursery.mail}</p>
                  </div>
                  <div className="dashboard_moderator_parent_info">
                    <p className="dashboard_moderator_parent_info_weigh">
                      Téléphone :
                    </p>
                    <p>{nursery.phone}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashboardModeratorPro;
