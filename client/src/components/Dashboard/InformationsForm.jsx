import { useContext, useRef } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../../context/AuthContext";
import "./Dashboard.css";

export default function InformationsForm({
  data,
  handleCancelModify,
  setResponseForm,
}) {
  const { user } = useContext(AuthContext);

  const firstNameRef = useRef("");
  const lastNameRef = useRef("");
  const adresseRef = useRef("");
  const phoneRef = useRef("");
  const passwordRef = useRef("");
  const mailRef = useRef("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const body = {
      parent_firstname: firstNameRef.current?.value || user.parent_firstname,
      parent_lastname: lastNameRef.current?.value || user.parent_lastname,
      parent_adress: adresseRef.current?.value || user.parent_adress,
      parent_phone: phoneRef.current?.value || user.parent_phone,
      parent_password: user.parent_password,
      parent_mail: mailRef.current?.value || user.parent_mail,
      parent_id: user.parent_id,
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/parent/${user.parent_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed response: ${response.status} - ${response.statusText}`
        );
      }

      setResponseForm(true);
      handleCancelModify();
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  };

  return (
    <div className="modify_informations_form">
      <h3>Entrez vos modifications</h3>
      <form>
        <p className="info_form">
          Veuillez remplir{" "}
          {data === "nom et prénom" ? "ces champs" : "ce champ"} pour modifier
          {data === "nom et prénom" ? " vos " : " votre "}
          <span style={{ fontWeight: "bolder" }}>{data}</span>
        </p>
        {data === "nom et prénom" && (
          <>
            <input
              type="text"
              id="firstname"
              placeholder="Prénom"
              ref={firstNameRef}
            />
            <input
              style={{ marginTop: "1em" }}
              type="text"
              id="lastname"
              placeholder="Nom"
              ref={lastNameRef}
            />
          </>
        )}
        {data === "adresse" && <input type="text" id="" ref={adresseRef} />}
        {data === "numéro de téléphone" && (
          <input type="text" ref={phoneRef} id="" />
        )}
        {data === "mot de passe" && (
          <input type="text" ref={passwordRef} id="" />
        )}
        {data === "e-mail" && <input type="text" ref={mailRef} id="" />}
        <button type="button" onClick={handleSubmit}>
          Valider
        </button>
      </form>
    </div>
  );
}

InformationsForm.propTypes = {
  data: PropTypes.string.isRequired,
  handleCancelModify: PropTypes.func.isRequired,
  setResponseForm: PropTypes.func.isRequired,
};
