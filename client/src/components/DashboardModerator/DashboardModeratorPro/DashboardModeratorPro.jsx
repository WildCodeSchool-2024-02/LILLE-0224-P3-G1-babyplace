import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import SearchByName from "../../SearchByName/SearchByName";
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

  const cancelNursery = async (nurseryId) => {
    try {
      if (!nurseryId) {
        console.error("Invalid nursery ID:", nurseryId);
        return;
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/nursery/${nurseryId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const updatedNurseries = filteredNurseries.filter(
          (nursery) => nursery.nursery_id !== nurseryId
        );
        setFilteredNurseries(updatedNurseries);
      } else {
        console.error("Failed to cancel nursery");
      }
    } catch (error) {
      console.error("Error cancelling nursery:", error);
    }
  };

  return (
    <div>
      <div className="dashboard_moderator_pro_select_search">
        <div className="dashboard_moderator_pro_search">
          <SearchByName onSearch={handleSearch} />
        </div>
      </div>
      <div>
        <div className="dashboard_moderator_pro_h1">
          <h1>Professionnels</h1>
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
                    <p>
                      {nursery.nursery_street_number} {nursery.nursery_street}{" "}
                      {nursery.city}
                    </p>
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
                  <button
                    type="button"
                    onClick={() => cancelNursery(nursery.nursery_id)}
                  >
                    Suspendre compte
                  </button>
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
