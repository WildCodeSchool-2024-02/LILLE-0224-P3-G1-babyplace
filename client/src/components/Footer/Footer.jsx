import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <div className="all_all_footer">
      <div className="all_footer">
        <div className="first_part_footer">
          <div className="icon_footer">
            <img
              src="../../../public/assets/images/logo.svg"
              alt="logo_footer"
            />
            <p>Babyplace</p>
          </div>
          <div className="first_part_footer" />
        </div>
        <div className="second_part_footer">
          <div className="social_media_footer">
            <p>Social Media</p>
          </div>
          <div className="image_footer">
            <img src="../../../public/assets/images/f.png" alt="f" />
            <img src="../../../public/assets/images/t.png" alt="t" />
            <img src="../../../public/assets/images/i.png" alt="i" />
          </div>
        </div>
        <div className="third_part_footer">
          <div>
            <ul>
              <li>
                {" "}
                <Link to="/contact">Contact</Link>
              </li>
              <li>
                {" "}
                <Link to="/">A propos</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="fourth_part_footer">
          <ul>
            <li>
              <span className="bold_text">Site réalisé par </span>
            </li>
            <li>Elias Ben Brahim | Emilie Lingat </li>
            <li> Benoit Mezaguer | Morgan Pouilly </li>
            <li>Vincent Van Volsem</li>
          </ul>
        </div>
      </div>
      <div className="credits_footer">
        <p>© Wild Code School 2024</p>
      </div>
    </div>
  );
}

export default Footer;
