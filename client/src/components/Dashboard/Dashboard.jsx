import "./Dashboard.css"

function Dashboard() {
    return (
        <div>

            <div className="head_dashboard">
                <h3 className="dashbard_title">Mon Profil</h3>
                <h4>mes réservations</h4>
            </div>
            <nav>
                <div >
                    <select className="custom-select">
                        <option value="1">À venir &ensp;</option>
                        <option value="2">En attente</option>
                        <option value="3">Passées</option>
                        <option value="4">Refusées</option>
                        <option value="5">Annulées</option>
                    </select>
                </div>
            </nav>
            <div className="creche_container">
                <div className="date">
                    <p>27/06/2024</p>
                </div>
                <div className="creche_all_info">
                    <img className="creche_image_dashboard" alt="yo" src="https://www.vandoeuvre.fr/wp-content/uploads/2021/03/Creche_les_Alizees.jpg" />
                    <div className="creche_info">
                        <ul>
                            <li> <h5>Crèche Picoti Picota</h5></li>
                            <li>15h-17h</li>
                            <li>Enfant 1 (Pomme)</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="creche_container">
                <div className="date">
                    <p>27/06/2024</p>
                </div>
                <div className="creche_all_info">
                    <img alt="yo" src="https://www.vandoeuvre.fr/wp-content/uploads/2021/03/Creche_les_Alizees.jpg" />
                    <div className="creche_info">
                        <ul>
                            <li> <h5>Crèche Picoti Picota</h5></li>
                            <li>15h-17h</li>
                            <li>Enfant 1 (Pomme)</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="parent">
                <h4 className="title">Parents</h4>
            </div>
            <div className="container_container">
                <div className="info_container" >
                    <p className="info">Mes Informations</p>
                </div>
            </div>
            <div className="general_parent">
                <ul className="parent_info">
                    <li>José Mars</li>
                    <li>18 rue Boudet</li>
                    <li>59000 LILLE</li>
                </ul>
                <ul className="modify_info">
                    <li>modifier mes informations</li>
                    <li>modifier mes coordonnées</li>
                </ul>
            </div>
            <div className="children" >
                <h4 className="title">Enfants</h4>
                <div className="child">
                    <div className="child_info">
                        <p>Enfant1</p>
                    </div>
                    <div className="child_info">
                        <p>Enfant1</p>
                    </div>
                    <div className="child_info">
                        <p>+</p>
                    </div>
                </div>
                <div className="child_presentation">
                    <p>Enfant 1</p>
                    <p>José Mars</p>
                    <p>33 mois</p>
                </div>
            </div>
        </div>


    )
}

export default Dashboard;