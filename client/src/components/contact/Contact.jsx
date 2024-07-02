import "./contact.css";

export default function Contact() {
  return (
    <section className="contact_content">
      <h2>Contact</h2>
      <p>Vous rencontrez un problème sur notre plateforme ?</p>
      <p>
        Vous souhaitez obtenir d'autres informations ? Vous souhaitez signaler
        un compte ?{" "}
      </p>
      <br />
      <p>
        Merci de contacter notre équipe, nous vous répondrons dans les plus
        brefs délais.
      </p>
      <form className="form_contact">
        <label htmlFor="motif">Motif</label>
        <select className="select_contact">
          <option value="--">--</option>
          <option value="--">Signalement de compte</option>
          <option value="--">Problème site</option>
          <option value="--">Informations</option>
        </select>
        <label htmlFor="details">Demande</label>
        <textarea
          id="details"
          className="textarea_contact"
          rows="5"
          cols="33"
        />
        <button
          type="submit"
          className="nursery_list_button"
          id="button_contact"
        >
          Envoyer
        </button>
      </form>
    </section>
  );
}
