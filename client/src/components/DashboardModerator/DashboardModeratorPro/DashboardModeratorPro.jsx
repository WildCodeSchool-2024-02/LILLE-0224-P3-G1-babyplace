import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import SearchByName from "../../SearchByName/SearchByName";
import SelectCity from "../../SelectCity/SelectCity";
import "./DashboardModeratorPro.css";

function DashboardModeratorPro() {
  const { nurseries: allNurseries } = useLoaderData();
  const [visibleProfiles, setVisibleProfiles] = useState([]);
  const [filteredNurseries, setFilteredNurseries] = useState(allNurseries);

  const toggleProfileVisibility = (nurseryId) => {
    setVisibleProfiles((prevState) =>
      prevState.includes(nurseryId)
        ? prevState.filter((id) => id !== nurseryId)
        : [...prevState, nurseryId]
    );
  };

  const handleSearch = (searchValue) => {
    const filteredNurseriesList = allNurseries.filter((nursery) =>
      nursery.nursery_name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredNurseries(filteredNurseriesList);
  };

  return (
    <div>
      <div className="dashboard_moderator_pro_select_search">
        <div className="dashboard_moderator_pro_select">
          <SelectCity />
        </div>
        <div className="dashboard_moderator_pro_search">
          <SearchByName onSearch={handleSearch} />
        </div>
      </div>
      <div>
        <div className="dashboard_moderator_pro_h1">
          <h1>Lille</h1>
        </div>
        {filteredNurseries.map((nursery) => (
          <div
            key={nursery.nursery_id}
            className="dashboard_moderator_parent_all"
          >
            <div className="dashboard_moderator_container_container">
              <div className="dashboard_moderator_parent_container">
                <div className="dashboard_moderator_parent_info_first">
                  <div className="dashboard_moderator_parent_info">
                    <p className="dashboard_moderator_parent_info_weigh">
                      Crèche :
                    </p>
                    <p>{nursery.nursery_name}</p>
                  </div>
                  <div className="dashboard_moderator_parent_info">
                    <p className="dashboard_moderator_parent_info_weigh">
                      Adresse :
                    </p>
                    <p>{nursery.adresse}</p>
                  </div>
                </div>
                <div
                  className="dashboard_moderator_parent_details"
                  role="button"
                  tabIndex={0}
                  onClick={() => toggleProfileVisibility(nursery.nursery_id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      toggleProfileVisibility(nursery.nursery_id);
                    }
                  }}
                >
                  <p>Voir le profil</p>
                </div>
                <div className="dashboard_moderator_parent_delete">
                  <button type="button">Suspendre compte</button>
                </div>
              </div>
            </div>
            {visibleProfiles.includes(nursery.nursery_id) && (
              <div
                id="dashboard_moderator_container_pop"
                className="dashboard_moderator_container_container"
              >
                <div className="dashboard_moderator_container_info">
                  <div className="dashboard_moderator_parent_info">
                    <p className="dashboard_moderator_parent_info_weigh">
                      Crèche :
                    </p>
                    <p>{nursery.nursery_name}</p>
                  </div>
                  <div className="dashboard_moderator_parent_info">
                    <p className="dashboard_moderator_parent_info_weigh">
                      Mail :
                    </p>
                    <p>{nursery.nursery_mail}</p>
                  </div>
                  <div className="dashboard_moderator_parent_info">
                    <p className="dashboard_moderator_parent_info_weigh">
                      Téléphone :
                    </p>
                    <p>{nursery.nursery_phone}</p>
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
