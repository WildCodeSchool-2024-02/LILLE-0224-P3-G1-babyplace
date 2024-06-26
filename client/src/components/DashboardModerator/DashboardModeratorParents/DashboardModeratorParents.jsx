import { useState } from "react";
import SearchByName from "../../SearchByName/SearchByName";
import "./DashboardModeratorParents.css";

function DashboardModeratorParents() {
  const [visibleProfiles, setVisibleProfiles] = useState([]);

  const toggleProfileVisibility = (parentId) => {
    setVisibleProfiles((prevState) =>
      prevState.includes(parentId)
        ? prevState.filter((id) => id !== parentId)
        : [...prevState, parentId]
    );
  };

  const parents = [
    {
      id: 1,
      name: "Elias Brandon",
      mail: "elias.brandon@homtail.fr",
      phone: "06 06 06 06 06",
      children: ["Brian", "Jean-Eudes"],
      image: "/public/assets/images/avatar_bottom_active.svg",
    },
    {
      id: 2,
      name: "Benoît Mezaguer",
      mail: "benoit.mezaguer@hotmail.fr",
      phone: "07 07 07 07 07",
      children: ["Pomme", "Poire", "Cerise"],
      image: "/public/assets/images/avatar_bottom_active.svg",
    },
  ];

  return (
    <div>
      <div className="all_dashboard_moderator_parent">
        <div className="dashboard_moderator_parent_search">
          <SearchByName />
        </div>
        <div className="dashboard_moderator_parent_h1">
          <h1>Parent</h1>
        </div>
        {parents.map((parent) => (
          <div key={parent.id} className="dashboard_moderator_parent_all">
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
                    <p>{parent.name}</p>
                  </div>
                  <div className="dashboard_moderator_parent_info">
                    <p className="dashboard_moderator_parent_info_weigh">
                      Nombre d'enfants :
                    </p>
                    <p>{parent.children.length}</p>
                  </div>
                </div>
                <div
                  className="dashboard_moderator_parent_details"
                  role="button"
                  tabIndex={0}
                  onClick={() => toggleProfileVisibility(parent.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      toggleProfileVisibility(parent.id);
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
            {visibleProfiles.includes(parent.id) && (
              <div
                id="dashboard_moderator_container_pop"
                className="dashboard_moderator_container_container"
              >
                <div className="dashboard_moderator_container_info">
                  <div className="dashboard_moderator_parent_info">
                    <p className="dashboard_moderator_parent_info_weigh">
                      Parent :
                    </p>
                    <p>{parent.name}</p>
                  </div>
                  <div className="dashboard_moderator_parent_info">
                    <p className="dashboard_moderator_parent_info_weigh">Mail :</p>
                    <p>{parent.mail}</p>
                  </div>
                  <div className="dashboard_moderator_parent_info">
                    <p className="dashboard_moderator_parent_info_weigh">
                      Téléphone :
                    </p>
                    <p>{parent.phone}</p>
                  </div>

                  <div className="dashboard_moderator_container_child">
                    {parent.children.map((child, index) => (
                      <div key={`${parent.id}-${child}`}>
                        <p className="dashboard_moderator_parent_info_weigh">
                          Enfant {index + 1} :{" "}
                        </p>
                        <p className="dashboard_moderator_parent_info">{child}</p>
                      </div>
                    ))}
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
