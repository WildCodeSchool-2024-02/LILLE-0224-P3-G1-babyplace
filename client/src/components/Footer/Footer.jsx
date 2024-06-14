import "./Footer.css";

function Footer() {
  return (
    <div className="all_all_footer">
      <div className="all_footer">
        <div className="first_part_footer">
          <div className="icon_footer">
            <img src="../../../public/assets/images/logo.svg" alt="logo" />
            <p>Babyplace</p>
          </div>
          <div className="first_part_footer">
            <ul>
              <li>Warehouse Society, 234</li>
              <li>Bahagia Ave Street PRBW 29281</li>
              <li>info@warehouse.project</li>
              <li>1-232-3434 (main)</li>
            </ul>
          </div>
        </div>
        <div className="second_part_footer">
          <div>
            <ul>
              <li>About</li>
              <li>Profile</li>
              <li>Features</li>
            </ul>
          </div>
        </div>
        <div className="third_part_footer">
          <div>
            <ul>
              <li>Help</li>
              <li>Support</li>
            </ul>
          </div>
        </div>
        <div className="fourth_part_footer">
          <div className="social_media_footer">
            <p>Social Media</p>
          </div>
          <div className="image_footer">
            <img src="../../../public/assets/images/f.png" alt="f" />
            <img src="../../../public/assets/images/t.png" alt="t" />
            <img src="../../../public/assets/images/i.png" alt="i" />
          </div>
        </div>
      </div>
      <div className="credits_footer">
        <p>© Datawarehouse™, 2020. All rights reserved.</p>
        <p>Company Registration Number: 21479524.</p>
      </div>
    </div>
  );
}

export default Footer;
