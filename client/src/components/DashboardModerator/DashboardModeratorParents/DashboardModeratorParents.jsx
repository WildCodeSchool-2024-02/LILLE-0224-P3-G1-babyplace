import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import SearchByName from "../../SearchByName/SearchByName";
import "./DashboardModeratorParents.css";

function DashboardModeratorParents() {
  const { parents: allParents } = useLoaderData();
  const [visibleProfiles, setVisibleProfiles] = useState([]);
  const [filteredParents, setFilteredParents] = useState(allParents);

  const toggleProfileVisibility = (parentId) => {
    setVisibleProfiles((prevState) =>
      prevState.includes(parentId)
        ? prevState.filter((id) => id !== parentId)
        : [prevState, parentId]
    );
  };

  const handleSearch = (searchValue) => {
    const filteredParentsList = allParents.filter((parent) =>
      `${parent.parent_firstname} ${parent.parent_lastname}`
        .toLowerCase()
        .includes(searchValue.toLowerCase())
    );
    setFilteredParents(filteredParentsList);
  };

  return (
    <div>
      <div className="all_dashboard_moderator_parent">
        <div className="dashboard_moderator_parent_search">
          <SearchByName onSearch={handleSearch} />
        </div>
        <div className="dashboard_moderator_parent_h1">
          <h1>Parent</h1>
        </div>
        {filteredParents.map((parent) => (
          <div
            key={parent.parent_id}
            className="dashboard_moderator_parent_all"
          >
            <div className="dashboard_moderator_container_container">
              <div className="dashboard_moderator_parent_container">
                <div className="dashboard_moderator_parent_logo">
                  <img src={parent.image} alt="" />
                </div>
                <div className="dashboard_moderator_parent_info_first">
                  <div className="dashboard_moderator_parent_info">
                    <p className="dashboard_moderator_parent_info_weigh">
                      Parent :
                    </p>
                    <p className="admin_parent_info_name">
                      {parent.parent_firstname}
                    </p>
                    <p className="admin_parent_info_name">
                      {parent.parent_lastname}
                    </p>
                  </div>
                  <div className="dashboard_moderator_parent_info">
                    <p className="dashboard_moderator_parent_info_weigh">
                      Nombre d'enfants : {parent.children.length}
                    </p>
                  </div>
                </div>
                <div
                  className="dashboard_moderator_parent_details"
                  role="button"
                  tabIndex={0}
                  onClick={() => toggleProfileVisibility(parent.parent_id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      toggleProfileVisibility(parent.parent_id);
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
            {visibleProfiles.includes(parent.parent_id) && (
              <div
                id="dashboard_moderator_container_pop"
                className="dashboard_moderator_container_container"
              >
                <div className="dashboard_moderator_container_info">
                  <div className="dashboard_moderator_parent_info">
                    <p className="dashboard_moderator_parent_info_weigh">
                      Parent :
                    </p>
                    <p className="admin_parent_info_name">
                      {parent.parent_firstname}
                    </p>
                    <p className="admin_parent_info_name">
                      {parent.parent_lastname}
                    </p>
                  </div>
                  <div className="dashboard_moderator_parent_info">
                    <p className="dashboard_moderator_parent_info_weigh">
                      Mail :
                    </p>
                    <p>{parent.parent_mail}</p>
                  </div>
                  <div className="dashboard_moderator_parent_info">
                    <p className="dashboard_moderator_parent_info_weigh">
                      Téléphone :
                    </p>
                    <p>{parent.parent_phone}</p>
                  </div>
                  <div className="dashboard_moderator_parent_info">
                    <p className="dashboard_moderator_parent_info_weigh">
                      Adresse :
                    </p>
                    <p>{parent.parent_adress}</p>
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

export default DashboardModeratorParents;
