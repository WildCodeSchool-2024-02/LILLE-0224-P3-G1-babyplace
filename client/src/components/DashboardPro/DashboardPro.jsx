import "./DashboardPro.css";

function DashboardPro() {
    return (
        <div>
            <div className="message_pro_container">
                <div className="message_pro_dashboard">
                    <h3>Espace Pro</h3>
                    <p>Bienvenue dans votre espace profesionnel. Ici, nous vous proposons d’ajouter à votre fiche crèche vos créneaux disponibles dans les 15 prochains jours.Si un parent inscrit son enfant, vous recevrez une alerte sur notre site pour pouvoir confirmer ou non sa réservation. </p>
                </div>
            </div>
            <div className="creche_info">
                <div className="info_container_pro">
                    <p className="info_pro">Mon Profil</p>
                </div>
                <h4 className="creche_name">Crèche Picotti Picotta</h4>
                <div className="creche_adress">
                    <p>18 rue de Boudet</p>
                    <p>59000, Lille</p>
                </div>
                <p className="creche_contact">+33.7.83.98.04.52</p>
                <p className="creche_contact">contact@picotti.fr</p>
                <ul className="modify_info">
                    <li>modifier mes informations</li>
                    <li>modifier mes coordonnées</li>
                </ul>
            </div>
            <div className="info_container_pro">
                <p className="info_pro">Gérer Les Créneaux</p>
            </div>
            <div className="info_container_pro">
                <p className="info_pro">Gérer Les Réservations</p>
            </div>
            <div>
                <select className="custom-select">
                    <option value="1">À venir &ensp;</option>
                    <option value="2">En attente</option>
                    <option value="3">Passées</option>
                    <option value="4">Refusées</option>
                    <option value="5">Annulées</option>
                </select>
            </div>
            <p className="reservation_date">31/06/2024</p>
            <div className="reservation">
                <div className="reservation_card">
                    <div className="reservation_info">
                        <p>Parent: Benoit Mezaguer</p>
                        <p>Enfant 1 (Pomme)</p>
                        <p>Matin</p>
                    </div>

                </div>
                <div className="reservation_card">
                    <div className="reservation_info">
                        <p>Parent: Benoit Mezaguer</p>
                        <p>Enfant 1 (Pomme)</p>
                        <p>Matin</p>
                    </div>

                </div>
            </div>

        </div>

    );
}
export default DashboardPro;