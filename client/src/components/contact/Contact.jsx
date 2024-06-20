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
      <form>
        <label htmlFor="motif">Motif</label>
        <input type="text" />
        <label htmlFor="details">Demande</label>
        <input type="text" />
        <button type="submit">Envoyer</button>
      </form>
    </section>
  );
}
