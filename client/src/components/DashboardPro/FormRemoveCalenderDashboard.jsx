import "./DashboardPro.css";

export default function FormRemoveCalenderDashboard() {
  return (
    <div className="form_calender_dashboard">
      <div className="title_form_calender">Supprimer une disponibilité</div>
      <div>Combien de places souhaitez-vous supprimer ? </div>
      <form>
        <input type="number" />
        <button type="button">Confirmer</button>
      </form>
    </div>
  );
}
