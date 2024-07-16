import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <div className="all_all_footer">
      <div className="all_footer">
        <div className="first_container_footer">
          <div className="first_part_footer">
            <div className="icon_footer">
              <img
                src="../../../public/assets/images/logo.svg"
                alt="logo_footer"
              />
              <p>Babyplace</p>
            </div>
            <div />
          </div>

          <div className="second_part_footer">
            <div className="image_footer">
              <img src="/assets/images/logo_socials/social_fb.svg" alt="f" />
              <img src="/assets/images/logo_socials/social_insta.svg" alt="t" />
              <img
                src="/assets/images/logo_socials/social_twitter.svg"
                alt="i"
              />
            </div>
          </div>
        </div>
        <div className="second_container_footer">
          <div className="third_part_footer">
            <div>
              <ul>
                <li>
                  {" "}
                  <Link to="/contact">Contact</Link>
                </li>
                <li>
                  {" "}
                  <Link to="/accueil">A propos</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="fourth_part_footer">
            <ul>
              <li>
                <span className="bold_text pink_text">Site réalisé par </span>
              </li>
              <li>Elias Ben Brahim | Emilie Lingat </li>
              <li> Benoit Mezaguer | Morgan Pouilly </li>
              <li>Vincent Van Volsem</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="credits_footer">
        <p>© Wild Code School 2024</p>
      </div>
    </div>
  );
}

export default Footer;
